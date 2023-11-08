/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { FormHelperText, Grid, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnalyzeResult, catalogImportApiRef } from '../../api';
import { NextButton } from '../Buttons';
import { asInputRef } from '../helpers';
import { ImportFlows, PrepareResult } from '../useImportState';
import { makeStyles } from '@material-ui/core/styles';
import { vars } from '../../../../../packages/app/src/themes/variables';
import clsx from 'clsx';


const useStyles = makeStyles(
  theme => ({
    nextButton: {
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.white
        : vars.light.fontColor.black
        }`,
      background: `${theme.palette.type === 'dark'
        ? vars.dark.background.highlight
        : vars.light.background.card
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '20px',
      padding: '10px 20px',

    },
    input: {
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.black
        : vars.light.fontColor.black
        }`,
    },
    MuiInputBase: {
      '& input': {
        background: `${theme.palette.type === 'dark'
          ? vars.dark.background.white + ' !important'
          : vars.light.background.white + ' !important'
          }`,
          border: `${theme.palette.type === 'dark'
          ? 'none !important' 
          : '1px solid #000 !important' 
          }`,
        borderRadius: '12px',
        color: `${theme.palette.type === 'dark'
          ? vars.light.fontColor.black + ' !important'
          : vars.light.fontColor.black + ' !important'
          }`,

        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '16px',
      },

    },
    OutlinedInput: {
      '& input': {
        '&:-webkit-autofill': {
          caretColor: 'black !important',
          borderRadius: '12px',
          '-webkitBoxShadow': `${theme.palette.type === 'dark'
            ? '0 0 0 100px #fff inset'
            : '0 0 0 100px #EFEFEF inset'
            }`,
          '-webkitTextFillColor': 'black !important',
        },
      }

    },
  }))

type FormData = {
  url: string;
};

/**
 * Props for {@link StepInitAnalyzeUrl}.
 *
 * @public
 */
export interface StepInitAnalyzeUrlProps {
  onAnalysis: (
    flow: ImportFlows,
    url: string,
    result: AnalyzeResult,
    opts?: { prepareResult?: PrepareResult },
  ) => void;
  disablePullRequest?: boolean;
  analysisUrl?: string;
  exampleLocationUrl?: string;
}

/**
 * A form that lets the user input a url and analyze it for existing locations or potential entities.
 *
 * @param onAnalysis - is called when the analysis was successful
 * @param analysisUrl - a url that can be used as a default value
 * @param disablePullRequest - if true, repositories without entities will abort the wizard
 * @public
 */
export const StepInitAnalyzeUrl = (props: StepInitAnalyzeUrlProps) => {
  const classes = useStyles();
  const {
    onAnalysis,
    analysisUrl = '',
    disablePullRequest = false,
    exampleLocationUrl = 'https://github.com/backstage/backstage/blob/master/catalog-info.yaml',
  } = props;

  const errorApi = useApi(errorApiRef);
  const catalogImportApi = useApi(catalogImportApiRef);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      url: analysisUrl,
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleResult = useCallback(
    async ({ url }: FormData) => {
      setSubmitted(true);

      try {
        const analysisResult = await catalogImportApi.analyzeUrl(url);

        switch (analysisResult.type) {
          case 'repository':
            if (
              !disablePullRequest &&
              analysisResult.generatedEntities.length > 0
            ) {
              onAnalysis('no-location', url, analysisResult);
            } else {
              setError("Couldn't generate entities for your repository");
              setSubmitted(false);
            }
            break;

          case 'locations': {
            if (analysisResult.locations.length === 1) {
              onAnalysis('single-location', url, analysisResult, {
                prepareResult: analysisResult,
              });
            } else if (analysisResult.locations.length > 1) {
              onAnalysis('multiple-locations', url, analysisResult);
            } else {
              setError('There are no entities at this location');
              setSubmitted(false);
            }
            break;
          }

          default: {
            const err = `Received unknown analysis result of type ${(analysisResult as any).type
              }. Please contact the support team.`;
            setError(err);
            setSubmitted(false);

            errorApi.post(new Error(err));
            break;
          }
        }
      } catch (e: any) {
        setError(e?.data?.error?.message ?? e.message);
        setSubmitted(false);
      }
    },
    [catalogImportApi, disablePullRequest, errorApi, onAnalysis],
  );

  return (
    <form onSubmit={handleSubmit(handleResult)} style={{ marginLeft: '20px' }}>
      <TextField className={clsx(classes.MuiInputBase, classes.OutlinedInput)}
        {...asInputRef(
          register('url', {
            required: true,
            validate: {
              httpsValidator: (value: any) =>
                (typeof value === 'string' &&
                  value.match(/^http[s]?:\/\//) !== null) ||
                'Must start with http:// or https://.',
            },
          }),
        )}
        fullWidth
        id="url"
        label="URL"
        placeholder={exampleLocationUrl}
        //helperText="Enter the full path to your entity file to start tracking your component"
        margin="normal"
        variant="outlined"
        error={Boolean(errors.url)}
        required
      />

      {errors.url && (
        <FormHelperText error>{errors.url.message}</FormHelperText>
      )}

      {error && <FormHelperText error>{error}</FormHelperText>}

      <Grid container spacing={0}>
        <NextButton className={classes.nextButton}
          disabled={Boolean(errors.url) || !watch('url')}
          loading={submitted}
          type="submit"
        >
          Analyze
        </NextButton>
      </Grid>
    </form>
  );
};





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

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  StepLabel,
  TextField,
  Typography,
} from '@internal/material-ui-core';
import React from 'react';
import { BackButton } from '../Buttons';
import { asInputRef } from '../helpers';
import { StepFinishImportLocation } from '../StepFinishImportLocation';
import { StepInitAnalyzeUrl } from '../StepInitAnalyzeUrl';
import {
  AutocompleteTextField,
  StepPrepareCreatePullRequest,
} from '../StepPrepareCreatePullRequest';
import { StepPrepareSelectLocations } from '../StepPrepareSelectLocations';
import { StepReviewLocation } from '../StepReviewLocation';
import { StepperApis } from '../types';
import { ImportFlows, ImportState } from '../useImportState';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';

export type StepConfiguration = {
  stepLabel: React.ReactElement;
  content: React.ReactElement;
};

/**
 * Defines the details of the stepper.
 *
 * @public
 */
export interface StepperProvider {
  analyze: (
    s: Extract<ImportState, { activeState: 'analyze' }>,
    opts: { apis: StepperApis },
  ) => StepConfiguration;
  prepare: (
    s: Extract<ImportState, { activeState: 'prepare' }>,
    opts: { apis: StepperApis },
  ) => StepConfiguration;
  review: (
    s: Extract<ImportState, { activeState: 'review' }>,
    opts: { apis: StepperApis },
  ) => StepConfiguration;
  finish: (
    s: Extract<ImportState, { activeState: 'finish' }>,
    opts: { apis: StepperApis },
  ) => StepConfiguration;
}

/**
 * The default stepper generation function.
 *
 * Override this function to customize the import flow. Each flow should at
 * least override the prepare operation.
 *
 * @param flow - the name of the active flow
 * @param defaults - the default steps
 * @public
 */
export function defaultGenerateStepper(
  flow: ImportFlows,
  defaults: StepperProvider,
): StepperProvider {

  switch (flow) {
    // the prepare step is skipped but the label of the step is updated
    case 'single-location':
      return {
        ...defaults,
        prepare: () => ({
          stepLabel: (
            <StepLabel
              optional={
                <Typography
                  variant="caption"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    marginLeft: '20px',
                  }}
                >
                  Discovered Locations: 1
                </Typography>
              }
            >


              <div style={{
                padding: '0',
                color: '#FFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 700,
                marginLeft: '20px',

              }}>Select Locations</div>
            </StepLabel>
          ),
          content: <></>,
        }),
      };

    // let the user select one or more of the discovered locations in the prepare step
    case 'multiple-locations':
      return {
        ...defaults,
        prepare: (state, opts) => {
          if (state.analyzeResult.type !== 'locations') {
            return defaults.prepare(state, opts);
          }

          return {
            stepLabel: (
              <StepLabel
                optional={
                  <Typography variant="caption">
                    Discovered Locations: {state.analyzeResult.locations.length}
                  </Typography>
                }
              >
                Select Locations
              </StepLabel>
            ),
            content: (
              <StepPrepareSelectLocations
                analyzeResult={state.analyzeResult}
                prepareResult={state.prepareResult}
                onPrepare={state.onPrepare}
                onGoBack={state.onGoBack}
              />
            ),
          };
        },
      };

    case 'no-location':
      return {
        ...defaults,
        prepare: (state, opts) => {
          if (state.analyzeResult.type !== 'repository') {
            return defaults.prepare(state, opts);
          }

          return {
            stepLabel: <StepLabel>Create Pull Request</StepLabel>,
            content: (
              <StepPrepareCreatePullRequest
                analyzeResult={state.analyzeResult}
                onPrepare={state.onPrepare}
                onGoBack={state.onGoBack}
                renderFormFields={({
                  values,
                  setValue,
                  formState,
                  groupsLoading,
                  groups,
                  register,
                }) => (
                  <>
                    <Box marginTop={2}>
                      <Typography variant="h6">Pull Request Details</Typography>
                    </Box>

                    <TextField
                      {...asInputRef(
                        register('title', {
                          required: true,
                        }),
                      )}
                      label="Pull Request Title"
                      placeholder="Add Backstage catalog entity descriptor files"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      error={Boolean(formState.errors.title)}
                      required
                    />

                    <TextField
                      {...asInputRef(
                        register('body', {
                          required: true,
                        }),
                      )}
                      label="Pull Request Body"
                      placeholder="A describing text with Markdown support"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      error={Boolean(formState.errors.body)}
                      multiline
                      required
                    />

                    <Box marginTop={2}>
                      <Typography variant="h6">Entity Configuration</Typography>
                    </Box>

                    <TextField
                      {...asInputRef(
                        register('componentName', { required: true }),
                      )}
                      label="Name of the created component"
                      placeholder="my-component"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      error={Boolean(formState.errors.componentName)}
                      required
                    />

                    {!values.useCodeowners && (
                      <AutocompleteTextField
                        name="owner"
                        errors={formState.errors}
                        options={groups || []}
                        loading={groupsLoading}
                        loadingText="Loading groups…"
                        helperText="Select an owner from the list or enter a reference to a Group or a User"
                        errorHelperText="required value"
                        textFieldProps={{
                          label: 'Entity Owner',
                          placeholder: 'my-group',
                        }}
                        rules={{ required: true }}
                        required
                      />
                    )}

                    <FormControlLabel
                      control={
                        <Checkbox
                          {...asInputRef(register('useCodeowners'))}
                          onChange={(_, value) => {
                            if (value) {
                              setValue('owner', '');
                            }
                          }}
                        />
                      }
                      label={
                        <>
                          Use <em>CODEOWNERS</em> file as Entity Owner
                        </>
                      }
                    />
                    <FormHelperText>
                      WARNING: This may fail if no CODEOWNERS file is found at
                      the target location.
                    </FormHelperText>
                  </>
                )}
              />
            ),
          };
        },
      };

    default:
      return defaults;
  }
}

export const defaultStepper: StepperProvider = {
  //const classes = useStyles();



  analyze: (state, { apis }) => ({
    stepLabel: <StepLabel>

      <div style={{
        padding: '0',
        color: '#FFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 700,
        marginLeft: '20px',

      }}>Select URL</div>

    </StepLabel>,
    content: (
      <StepInitAnalyzeUrl

        key="analyze"
        analysisUrl={state.analysisUrl}
        onAnalysis={state.onAnalysis}
        disablePullRequest={!apis.catalogImportApi.preparePullRequest}
      />
    ),
  }),

  prepare: state => ({
    stepLabel: (
      <StepLabel optional={
        <Typography variant="caption"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 400,
            marginLeft: '20px',



          }}>Optional</Typography>}>
        <div style={{
          padding: '0',
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 700,
          marginLeft: '20px',
        }}>Import Actions</div>

      </StepLabel>
    ),
    content: <BackButton onClick={state.onGoBack}
      // style={{
      //   color: 'red',
      //   background: '#0065FF',
      //   fontFamily: 'Helvetica Neue',
      //   fontSize: '20px',
      //   fontStyle: 'normal',
      //   fontWeight: 700,
      //   lineHeight: '20px',
      //   padding: '10px 20px',
      // }}
    />,
  }),

  review: state => ({
    stepLabel: <StepLabel>
      <div style={{
        padding: '0',
        color: '#FFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 700,
        marginLeft: '20px',
      }}>Review</div>


    </StepLabel>,
    content: (
      <StepReviewLocation
        prepareResult={state.prepareResult}
        onReview={state.onReview}
        onGoBack={state.onGoBack}
      />
    ),
  }),

  finish: state => ({
    stepLabel: <StepLabel>
      <div style={{
        padding: '0',
        color: '#FFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 700,
        marginLeft: '20px',
      }}>Finish</div></StepLabel>,
    content: (
      <StepFinishImportLocation
        prepareResult={state.prepareResult}
        onReset={state.onReset}
      />
    ),
  }),
};

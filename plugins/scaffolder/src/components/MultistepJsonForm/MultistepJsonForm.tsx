/*
 * Copyright 2020 The Backstage Authors
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
  Button,
  Step as StepUI,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@internal/material-ui-core';
import { JsonObject } from '@backstage/types';
import {
  errorApiRef,
  featureFlagsApiRef,
  useAnalytics,
  useRouteRefParams,
  useApi,
  ErrorApiError,
} from '@backstage/core-plugin-api';
import { FormProps, IChangeEvent, withTheme } from '@rjsf/core';
import { Theme as MuiTheme } from '@rjsf/material-ui';
import React, { ComponentType, useState } from 'react';
import { transformSchemaToProps } from './schema';
import cloneDeep from 'lodash/cloneDeep';
import * as fieldOverrides from './FieldOverrides';
import { ReviewStepProps } from '../types';
import { ReviewStep } from './ReviewStep';
import { extractSchemaFromStep } from '@internal/plugin-scaffolder-react-antiguo/alpha';
import { selectedTemplateRouteRef } from '../../routes';
import { LayoutOptions } from '@backstage/plugin-scaffolder-react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { neorisDarkTheme } from '../../../../../packages/app/src/themes/NeorisDark';
import { vars } from '../../../../../packages/app/src/themes/variables';
import { useTheme } from '@material-ui/core/styles';

const Form = withTheme(MuiTheme);

type Step = {
  schema: JsonObject;
  title: string;
} & Partial<Omit<FormProps<any>, 'schema'>>;

/**
 * The props for a dynamic form of a scaffolder template.
 */
export type MultistepJsonFormProps = {
  /**
   * Steps for the form, each contains title and form schema
   */
  steps: Step[];
  formData: Record<string, any>;
  onChange: (e: IChangeEvent) => void;
  onReset: () => void;
  onFinish?: () => Promise<void>;
  widgets?: FormProps<any>['widgets'];
  fields?: FormProps<any>['fields'];
  finishButtonLabel?: string;
  layouts: LayoutOptions[];
  ReviewStepComponent?: ComponentType<ReviewStepProps>;
};

export function getSchemasFromSteps(steps: Step[]) {
  return steps.map(({ schema }) => ({
    mergedSchema: schema,
    ...extractSchemaFromStep(schema),
  }));
}

/**
 * Creates the dynamic form for a scaffolder template.
 */
export const MultistepJsonForm = (props: MultistepJsonFormProps) => {
  const {
    formData,
    onChange,
    onReset,
    onFinish,
    fields,
    widgets,
    layouts,
    ReviewStepComponent,
  } = props;
  const { templateName } = useRouteRefParams(selectedTemplateRouteRef);
  const analytics = useAnalytics();
  const [activeStep, setActiveStep] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const errorApi = useApi(errorApiRef);
  const featureFlagApi = useApi(featureFlagsApiRef);
  const featureFlagKey = 'backstage:featureFlag';
  const filterOutProperties = (step: Step): Step => {
    const filteredStep = cloneDeep(step);
    const removedPropertyKeys: Array<string> = [];
    if (filteredStep.schema.properties) {
      filteredStep.schema.properties = Object.fromEntries(
        Object.entries(filteredStep.schema.properties).filter(
          ([key, value]) => {
            if (value[featureFlagKey]) {
              if (featureFlagApi.isActive(value[featureFlagKey])) {
                return true;
              }
              removedPropertyKeys.push(key);
              return false;
            }
            return true;
          },
        ),
      );

      // remove the feature flag property key from required if they are not active
      filteredStep.schema.required = Array.isArray(filteredStep.schema.required)
        ? filteredStep.schema.required?.filter(
            r => !removedPropertyKeys.includes(r as string),
          )
        : filteredStep.schema.required;
    }
    return filteredStep;
  };

  const steps = props.steps
    .filter(step => {
      const featureFlag = step.schema[featureFlagKey];
      return (
        typeof featureFlag !== 'string' || featureFlagApi.isActive(featureFlag)
      );
    })
    .map(filterOutProperties);

  const handleReset = () => {
    setActiveStep(0);
    onReset();
  };
  const handleNext = () => {
    const stepNum = Math.min(activeStep + 1, steps.length);
    setActiveStep(stepNum);
    analytics.captureEvent('click', `Next Step (${stepNum})`);
  };
  const handleBack = () => setActiveStep(Math.max(activeStep - 1, 0));
  const handleCreate = async () => {
    if (!onFinish) {
      return;
    }

    setDisableButtons(true);
    try {
      await onFinish();
      analytics.captureEvent('create', formData.name || `new ${templateName}`);
    } catch (err) {
      const errorToPost = err as ErrorApiError;
      errorApi.post(errorToPost);
    } finally {
      setDisableButtons(false);
    }
  };

  const ReviewStepElement = ReviewStepComponent ?? ReviewStep;

  const theme = useTheme();

  const customTheme = createMuiTheme({
    ...neorisDarkTheme,
    overrides: {
      ...neorisDarkTheme.overrides,

      MuiInputBase: {
        root: {
          ...neorisDarkTheme.overrides,
          backgroundColor: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.white
              : vars.light.background.white
          }`,
          color: 'black',
          padding: '10px',
          borderRadius: '12px',
        },
      },
      MuiStepper: {
        vertical: {
          background: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.generic
              : vars.light.background.card
          }`,
        },
      },
      // ? Fuentes blancas
      MuiTypography: {
        h6: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
          marginLeft: '10px',
        },
        colorTextSecondary: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
        },
        body2: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
        },
      },
      MuiInputLabel: {
        animated: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.black
              : vars.light.fontColor.black
          }`,
          zIndex: 1,
        },
        outlined: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
          transform: 'translate(0px, -15px) scale(0.75) !important',
        },
      },
      MuiFormHelperText: {
        root: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
        },
      },
      MuiAutocomplete: {
        inputRoot: {
          padding: '10px !important',
        },
      },
      MuiFormLabel: {
        root: {
          marginLeft: '10px',
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.black
              : vars.light.fontColor.black
          }`,
          fontStyle: 'normal',
          fontWeight: 700,
          transition:
            'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          '&$focused': {
            color: `${
              theme.palette.type === 'dark'
                ? vars.dark.fontColor.black
                : vars.light.fontColor.black
            }`,
          },
        },
      },
      MuiPaper: {
        elevation0: {
          background: 'transparent',
          fontFamily: vars.fontFamily + '!important',
        },
      },
      MuiButton: {
        containedPrimary: {
          //botones
          backgroundColor: vars.dark.background.highlight,
          '&:hover': {
            backgroundColor: vars.dark.background.highlight + '!important',
            opacity: 0.8,
          },
          '& $label': {
            color: `${
              theme.palette.type === 'dark'
                ? vars.dark.fontColor.white
                : vars.light.fontColor.white
            }`,
          },
        },
        label: {
          // botones sin fondo
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
        },
      },
      MuiTableCell: {
        // Paso Review and Create (titles)
        body: {
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.fontColor.white
              : vars.light.fontColor.black
          }`,
        },
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(({ title, schema, ...formProps }, index) => {
            return (
              <StepUI key={title}>
                <StepLabel
                  aria-label={`Step ${index + 1} ${title}`}
                  aria-disabled="false"
                  tabIndex={0}
                >
                  <Typography variant="h6" component="h2">
                    {title}
                  </Typography>
                </StepLabel>
                <StepContent key={title}>
                  <Form
                    showErrorList={false}
                    fields={{ ...fieldOverrides, ...fields }}
                    widgets={widgets}
                    noHtml5Validate
                    formData={formData}
                    formContext={{ formData }}
                    onChange={onChange}
                    onSubmit={e => {
                      if (e.errors.length === 0) handleNext();
                    }}
                    {...formProps}
                    {...transformSchemaToProps(schema, layouts)}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Next step
                    </Button>
                  </Form>
                </StepContent>
              </StepUI>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <ReviewStepElement
            disableButtons={disableButtons}
            handleBack={handleBack}
            handleCreate={handleCreate}
            handleReset={handleReset}
            formData={formData}
            steps={getSchemasFromSteps(steps)}
          />
        )}
      </>
    </ThemeProvider>
  );
};

import * as React from 'react';
import { StandardProps } from '..';

export interface StepIconPropsMod
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepIconClasskeyMod, 'children'> {
  /**
   * Whether this step is active.
   */
  active?: boolean;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as failed.
   */
  error?: boolean;
  /**
   * The label displayed in the step icon.
   */
  icon: React.ReactNode;
}

export type StepIconClasskeyMod = 'root' | 'text' | 'active' | 'completed' | 'error';

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/components/steppers/)
 *
 * API:
 *
 * - [StepIcon API](https://mui.com/api/step-icon/)
 */
export default function StepIconMod(props: StepIconPropsMod): JSX.Element;

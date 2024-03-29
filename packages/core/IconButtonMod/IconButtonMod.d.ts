import { PropTypes } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type IconButtonTypeMapMod<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    color?: PropTypes.Color;
    disableFocusRipple?: boolean;
    /**
     * If given, uses a negative margin to counteract the padding on one
     * side (this is often helpful for aligning the left or right
     * side of the icon with content above or below, without ruining the border
     * size and shape).
     */
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium';
  };
  defaultComponent: D;
  classKey: IconButtonClassKeyMod;
}>;

/**
 * Refer to the [Icons](https://mui.com/components/icons/) section of the documentation
 * regarding the available icon options.
 * Demos:
 *
 * - [Buttons](https://mui.com/components/buttons/)
 *
 * API:
 *
 * - [IconButton API](https://mui.com/api/icon-button/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
declare const IconButtonMod: ExtendButtonBase<IconButtonTypeMapMod>;

export type IconButtonClassKeyMod =
  | 'root'
  | 'edgeStart'
  | 'edgeEnd'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'disabled'
  | 'sizeSmall'
  | 'label';

export type IconButtonPropsMod<
  D extends React.ElementType = IconButtonTypeMapMod['defaultComponent'],
  P = {}
> = OverrideProps<IconButtonTypeMapMod<P, D>, D>;

export default IconButtonMod;

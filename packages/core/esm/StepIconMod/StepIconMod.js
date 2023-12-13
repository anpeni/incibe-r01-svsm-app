import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';
import { vars } from '../../../app/src/themes/variables';
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'block',
      color: `${theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
        }`,
      transform: 'scale(1.5)', 
      '&$completed': {
        color: vars.dark.background.highlight,   
        transform: 'scale(1.5)'   
      },
      '&$active': {
      color: `${theme.palette.type === 'dark'
          ? vars.dark.background.white
          : vars.dark.background.highlight
        }`,
        
      },
      '&$error': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the SVG text element. */
    text: {
      position: 'absolute',
      marginTop: '1em',
      fill: `${theme.palette.type === 'dark'
      ? vars.light.background.white 
      : vars.dark.background.highlight
    }`,
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Inter, sans-serif',
      '&$active': {
        fill: `${theme.palette.type === 'dark'
        ? vars.dark.background.highlight
        : vars.light.background.white
      }`,
      },
    },

    /* Pseudo-class applied to the root element if `active={true}`. */
    active: {
      
    },

    /* Pseudo-class applied to the root element if `completed={true}`. */
    completed: {},

    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {}
  };
};

var _ref = /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "12"
});

var StepIconMod = /*#__PURE__*/React.forwardRef(function StepIconMod(props, ref) {
  var _props$completed = props.completed,
      completed = _props$completed === void 0 ? false : _props$completed,
      icon = props.icon,
      _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active,
      _props$error = props.error,
      error = _props$error === void 0 ? false : _props$error,
      classes = props.classes;

  if (typeof icon === 'number' || typeof icon === 'string') {
    var className = clsx(classes.root, active && classes.active, error && classes.error, completed && classes.completed);
    var classNameText = clsx(classes.text, active && classes.active);
    if (error) {
      return /*#__PURE__*/React.createElement(Warning, {
        className: className,
        ref: ref
      });
    }


    if (completed) {
      return (
        <div style={{background:'white',borderRadius:'12px'}}>         
          <CheckCircle className={className} ref={ref} />
        </div>
      );
    }


    return (
      <SvgIcon className={className} ref={ref}>
        <circle cx="12" cy="12" r="12" />
        <text className={classNameText} x="12" y="18" textAnchor="middle">
          {icon}
        </text>
      </SvgIcon>
    );
    
  }

  return icon;
});
process.env.NODE_ENV !== "production" ? StepIconMod.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,

  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,

  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepIconMod'
})(StepIconMod);
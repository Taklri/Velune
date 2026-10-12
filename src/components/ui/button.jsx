import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const buttonVariants = cva('ui-button', {
  variants: {
    variant: {
      primary: 'ui-button-primary',
      secondary: 'ui-button-secondary',
      outline: 'ui-button-outline',
      ghost: 'ui-button-ghost',
      text: 'ui-button-text',
    },
    size: {
      default: 'ui-button-default',
      small: 'ui-button-small',
      large: 'ui-button-large',
      icon: 'ui-button-icon',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

const Button = React.forwardRef(function Button(
  { className, variant, size, type = 'button', to, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (to) return <Link ref={ref} to={to} className={classes} {...props} />;

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      {...props}
    />
  );
});

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['default', 'small', 'large', 'icon']),
  to: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'text']),
};

export { Button };

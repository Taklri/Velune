import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return <input ref={ref} type={type} className={cn('ui-input', className)} {...props} />;
});

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export { Input };

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Select = React.forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn('ui-input ui-select', className)} {...props}>
      {children}
    </select>
  );
});

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Select };

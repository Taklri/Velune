import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn('ui-input ui-textarea', className)} {...props} />;
});

Textarea.propTypes = {
  className: PropTypes.string,
};

export { Textarea };

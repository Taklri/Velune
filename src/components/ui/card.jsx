import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cn('ui-card', className)} {...props} />;
});

const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn('ui-card-header', className)} {...props} />;
});

const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn('ui-card-content', className)} {...props} />;
});

const CardFooter = React.forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn('ui-card-footer', className)} {...props} />;
});

[Card, CardHeader, CardContent, CardFooter].forEach((Component) => {
  Component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
});

export { Card, CardHeader, CardContent, CardFooter };

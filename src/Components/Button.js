"use strict"

import React from 'react';
import Proptypes from 'prop-types';

const Button = (props) => (
 <div 
  className = {props.className}
  onClick = {props.onClick}
 >
   <span>{props.value}</span>
 </div> 
);

Button.proptypes = {
  className: Proptypes.string,
  onClick: Proptypes.func,
  value: Proptypes.string,
};

export default Button;
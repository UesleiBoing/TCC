import React from 'react';

import { Typography, TypographyProps } from '@mui/material';

interface ITitleProps extends TypographyProps {

}

const Title: React.FC<ITitleProps> = ({ 
  children, 
  variant = 'h1',
  ...rest 
}) => (
  <Typography 
    variant={variant}
    {...rest}
  >
    { children }
  </Typography>
)


export default Title;

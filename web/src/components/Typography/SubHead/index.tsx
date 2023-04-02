import React from 'react';

import { Typography, TypographyProps } from '@mui/material';

interface ISubHeadProps extends TypographyProps {

}

const SubHead: React.FC<ISubHeadProps> = ({ 
  children, 
  color="text.secondary",
  variant = 'body2',
  ...rest 
}) => (
  <Typography
    color={color}
    variant={variant}
    {...rest}
  >
    { children }
  </Typography>
)


export default SubHead;

import React from 'react';

import { Checkbox, Grid } from '@mui/material';


import Input          from 'components/Form/Input';
import Select         from 'components/Form/Select';

import ICheckboxProps from '../Checkbox/ICheckboxProps';
import Dropzone       from '../Dropzone';
import IDropzoneProps from '../Dropzone/IDropzoneProps';
import IInputProps    from '../Input/IInputProps';
import ISelectProps   from '../Select/ISelectProps';

import { lgSize, mdSize, smSize, xlSize, xsSize } from './hooks/gridSize';
import IGridField from './interfaces/IGridField';
import IProps from './interfaces/IProps';

/**
 * Form builder component
 * Receive a list of fields and render them
 */
const FormBuilder: React.FC<IProps> = ({
  fields,
  spacing = { xs: 2, md: 3 },
  columns = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
  ...rest
}) => {

  /**
   * Check field type and render the correct component 
   */
  function renderComponent({ gridSize, ...field }: IGridField) {
    if (field.type === 'select') {
      return <Select {...field as ISelectProps} />;
    }

    if (field.type === 'dropzone') {
      return <Dropzone {...field as IDropzoneProps} />;
    }

    if (field.type === 'checkbox') {
      return <Checkbox {...field as ICheckboxProps} />;
    }
    
    return <Input {...field as IInputProps} />;
  }

  return (
    <Grid container spacing={spacing} columns={columns} {...rest}>
      {fields?.map((field, index) => (
          <Grid item 
            xs={xsSize(field) ?? 12} 
            sm={smSize(field) ?? 12} 
            md={mdSize(field) ?? 12}
            lg={lgSize(field) ?? 12}
            xl={xlSize(field) ?? 12}
            key={index}
          >
            {renderComponent(field)}
          </Grid>
      ))}
    </Grid>
  );
};

export default FormBuilder;

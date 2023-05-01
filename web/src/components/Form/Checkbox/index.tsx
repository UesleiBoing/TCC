import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Error } from '../../../styles/styled-components/Error';
import { errorColor } from '../../../styles/variables';

import ICheckboxProps from './ICheckboxProps';

/**
 * Checkbox component
 */
const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  label,
  checked = false,
  mb, mt, ml, mr,
  icon: Icon,
  iconByDefault = false,
  readOnly = false,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isChecked, setIsChecked] = useState<boolean>(!!checked);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue(ref: any) {    
        return ref.checked ? ref.value : null;
      },
      setValue(ref: any, value: string) {
        ref.value = value;
        setIsChecked(!!value)
      }
    });    
  }, [fieldName, registerField]);

  /**
   * OnChange events
   * Change the isChecked
   * and execute the param onChange
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(e, true);
    }
  } 

  return (
    <FormControlLabel key={rest.key} control={
        <>
          {error && 
            <Error title={error}>
              <FiAlertCircle size={20} color={errorColor} />
            </Error>
          }
          <MUICheckbox
            inputRef={inputRef}
            onChange={handleChange}
            checked={!!isChecked}
            sx={{ 
              color: error ? errorColor : undefined
             }}
            
            {...rest}
          />
        </>
      } 
      
      label={label}

      sx={{ 
        mb: Number(mb), 
        mt: Number(mt), 
        ml: Number(ml), 
        mr: Number(mr) 
      }}
    />
  );
};

export default Checkbox;

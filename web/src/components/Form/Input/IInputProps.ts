import { ComponentType } from 'react';

import { TextFieldProps } from '@mui/material';
import { IconBaseProps } from 'react-icons';

import IFieldsSharedProps from '../IFieldsSharedProps';

type IInputProps = {
    mask?: string;
    icon?: ComponentType<IconBaseProps>;
    iconByDefault?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    prefix?: string;
} & TextFieldProps & IFieldsSharedProps;

export default IInputProps;
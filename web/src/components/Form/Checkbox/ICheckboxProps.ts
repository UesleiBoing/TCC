import { ComponentType } from 'react';

import { CheckboxProps } from '@mui/material';
import { IconBaseProps } from 'react-icons';

import IFieldsSharedProps from '../IFieldsSharedProps';

type ICheckboxProps = {
    mask?: string;
    icon?: ComponentType<IconBaseProps>;
    iconByDefault?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    label:string;
    type?: 'checkbox';
} & CheckboxProps  & IFieldsSharedProps;

export default ICheckboxProps;
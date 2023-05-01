import ICheckboxProps from 'components/Form/Checkbox/ICheckboxProps';

import IDropzoneProps from '../../Dropzone/IDropzoneProps';
import IInputProps from '../../Input/IInputProps';
import ISelectProps from '../../Select/ISelectProps';

import IGridSizes from './IGridSizes';
  
/**
 * Grid Field
 * It have a Grid Size
 * It can be a Select, Input or Dropzone
 * @see ISelectProps
 * @see IInputProps
 * @see IDropzoneProps
 * @see IGridSizes
 */
type IGridField = IGridSizes & (
    ISelectProps | IInputProps | IDropzoneProps | ICheckboxProps
);

export default IGridField;
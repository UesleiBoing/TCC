import IInputProps from '../../Input/IInputProps';
import ISelectProps from '../../Select/ISelectProps';

import IGridSizes from './IGridSizes';
  
/**
 * Grid Field
 * It have a Grid Size
 * It can be a Select or Input
 * @see ISelectProps
 * @see IInputProps
 * @see IGridSizes
 */
type IGridField = IGridSizes & (
    ISelectProps | IInputProps
);

export default IGridField;
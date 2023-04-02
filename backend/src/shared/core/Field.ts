import ModelCore from './ModelCore';

/**
 * @class Field - This class is the base for all field's classes.
 */
export default class Field {

  /**
   * Data types to set.
   */
  public static TYPE_STRING = 0;

  public static TYPE_NUMBER = 1;

  public static TYPE_DATE = 2;

  /**
   * Without masks.
   */
  public static MASK_ONLY_NUMBERS = 0;

  public static MASK_ONLY_LETTERS = 1;

  /**
   *
   * @param entity - Entity to get fields.
   * @returns Array of fields which has mask property.
   */
  public static getMaskeds(entity:ModelCore) {
    const { fields } = entity as typeof ModelCore;

    return Object.keys(fields).filter((key) => typeof (fields)[key].mask !== 'undefined');
  }

}

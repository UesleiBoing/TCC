import IFields from '@shared/interfaces/fields/IFields';

/**
 * @class Model Core - This class is the base class for all model classes.
 */
export default abstract class ModelCore {

  /**
   * The model's fields.
   * */
  public static fields:IFields = {};

}

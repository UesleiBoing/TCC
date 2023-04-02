/**
 * @class Error Messages.
 */
export default class ErrorMessages {

  public static JSON_INVALID = 'The json sent is in incorrect format!';
  public static INVALID_LOGIN_ATTEMPT = 'Email or password incorrect!';
  public static TOKEN_NOT_PROVIDED = 'Token not provided!';
  public static INVALID_TOKEN = 'Invalid Token!';

  public static ID_NOT_NUMBER = 'ID must be a number!';

  public static TEACHER_UNIQUE_EMAIL = "The teacher's Email informed already exist.";
  public static TEACHER_DOESNT_EXIST = "The teacher informed doesn't exist.";

  public static STUDENT_UNIQUE_EMAIL = "The student's Email informed already exist.";
  public static STUDENT_DOESNT_EXIST = "The student informed doesn't exist.";

  public static CLASS_DOESNT_EXIST = "The class informed doesn't exist.";

  public static TOPIC_DOESNT_EXIST = "The topic informed doesn't exist.";

  public static DATABASE_UNIQUE = 'Values have already been informed and must be unique';
  public static DATABASE_EXIST = "The data provided doesn't exist.";

  public static FILE_DOESNT_EXIST = 'No file was sent.';

  public static PASSWORD_DIGITS = 'The password must have at least 8 digits.';
  public static PASSWORD_NUMBER = 'The password must have at least one number.';
  public static PASSWORD_LOWERCASE = 'The password must have at least one lowercase letter.';
  public static PASSWORD_UPPERCASE = 'The password must have at least one uppercase letter.';
  public static PASSWORD_SPECIAL_CHARACTER = 'The password must have at least one special character.';

  public static INVALID_OPERATOR_QUERY_PARAM = (o:string) => `${o} specified has a invalid operator.`;
  public static INVALID_QUERY_PARAM = (f:string) => `${f} is a invalid query param.`;

}

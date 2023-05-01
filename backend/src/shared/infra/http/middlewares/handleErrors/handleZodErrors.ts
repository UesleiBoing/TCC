import { Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

export default function handleZodError(error: ZodError, response: Response) {
  let message = 'An unexpected error occurred while processing the request.';

  const issue = error.issues[0] as ZodIssue;
  const field = issue.path.join(', ');
  let expected;
  let unexpected;

  switch (issue.code) {
    case 'invalid_type':
      expected = issue.expected.toString();
      message = `The field '${field}' should be of type ${expected}.`;
      break;
    case 'invalid_enum_value':
      expected = issue.received;
      message = `The field '${field}' should be one of the following values: ${expected}.`;
      break;
    case 'too_small':
      message = `The field '${field}' should be greater than or equal to ${issue.minimum}.`;
      break;
    case 'too_big':
      expected = issue.path.join(', ');
      message = `The field '${field}' should be less than or equal to ${issue.maximum}.`;
      break;
    case 'invalid_string':
      message = `The value for the field '${field}' is invalid.`;
      break;
    case 'invalid_union':
      expected = issue.unionErrors.map((e) => e.name).join(', ');
      message = `The field '${field}' should be one of the following types: ${expected}.`;
      break;
    // case 'nonempty_array':
    //   message  = `The field '${field}' should not be an empty array.`;
    //   break;
    case 'unrecognized_keys':
      expected = issue.path.join(', ');
      message = `The field '${field}' contains unrecognized keys: ${expected}.`;
      break;
    default:
      unexpected = issue;
      break;
  }

  return response.status(422).json({
    success: false,
    message,
    error: unexpected,
  });
}

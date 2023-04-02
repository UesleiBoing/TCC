import Student from '@modules/users/infra/typeorm/entities/Student';

import Form from '../infra/typeorm/entities/Form';

export default interface ITestDTO {
  id?: number;
  grade: number;

  student_id: number;
  student?: Student;

  form_id: number;
  form?: Form;
}

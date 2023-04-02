import Student from '@modules/users/infra/typeorm/entities/Student';
import Teacher from '@modules/users/infra/typeorm/entities/Teacher';

import Subject from '../infra/typeorm/entities/Subject';

export default interface IClassDTO {
  id?: number;
  title: string;
  content: string;
  year: number;
  semester: number;

  teacher_id: number;
  subject_id: number;

  teacher?: Teacher;
  subject?: Subject;
  students?: Student[];
}

import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),
  content: Yup.string().required('O conteúdo relacionado é obrigatório!'),
  year: Yup.string().required('O ano é obrigatório'),
  semester: Yup.string().required('O semestre é obrigatório'),
  teacher_id: Yup.string().required('O professor é obrigatório'),
  subject_id: Yup.string().required('A matéria é obrigatória'),
});
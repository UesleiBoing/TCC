import * as Yup from 'yup';

export const schema = Yup.object().shape({
  description: Yup.string().required('A descrição é obrigatória!'),
  class_id: Yup.string().required('A classe é obrigatória'),
});
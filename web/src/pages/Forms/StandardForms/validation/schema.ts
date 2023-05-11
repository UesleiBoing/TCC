import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),
  description: Yup.string().required('A descrição é obrigatório!'),
});
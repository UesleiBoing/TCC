import * as Yup from 'yup';

export const schema = Yup.object().shape({
  description: Yup.string().required('A descrição é obrigatória!'),
});
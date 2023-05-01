import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),
  content: Yup.string().required('O conteúdo relacionado é obrigatório!'),
});
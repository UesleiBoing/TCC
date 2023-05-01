import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),
  description: Yup.string().required('A descrição é obrigatório!'),
  quantity: Yup.number(),
  keywords: Yup.array().of(Yup.number())
    .required('Informar alguma palavra-chave é obrigatório!')
    .min(1, 'Informar alguma palavra-chave é obrigatório!')
    .max(3, 'Somente são permitidas 3 palavras chaves!'),
});
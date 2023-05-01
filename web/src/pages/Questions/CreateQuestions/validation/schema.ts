import * as Yup from 'yup';

export const schema = Yup.object().shape({
  description: Yup.string().required('A descrição é obrigatório!'),
  weight: Yup.number().required('O peso da questão é obrigatório!'),
  order: Yup.number().optional(),
  correct_answer: Yup.number().required('Informar alguma resposta correta é obrigatório!'),
  keywords: Yup.array().of(Yup.string())
    .required('Informar alguma palavra-chave é obrigatório!')
    .min(1, 'Informar alguma palavra-chave é obrigatório!')
    .max(3, 'Somente são permitidas 3 palavras chaves!'),
  answers: Yup.array().of(Yup.object().shape({
    description: Yup.string().required('A descrição da resposta é obrigatório!'),
    value: Yup.number().required('O valor da resposta é obrigatório!')
  }))
    .min(1, 'É necessário informar ao menos uma resposta!')
    .max(10, 'Mais do que 10 respostas não amigo!'),
});
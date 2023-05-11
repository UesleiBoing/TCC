import * as Yup from 'yup';

export const schema = Yup.object().shape({
  description: Yup.string()
  .required('A descrição é obrigatório!')
  .max(1000, 'A questão deve ter no máximo 1000 caracteres!'),
  weight: Yup.number().required('O peso da questão é obrigatório!')
    .min(0.1, 'A questão deve vale no mínimo 0.1!')
    .max(99, 'O peso máximo da questão deve ser 99!'),
  order: Yup.number().optional(),
  correct_answer: Yup.number().required('Informar alguma resposta correta é obrigatório!'),
  keywords: Yup.array().of(Yup.string())
    .required('Informar alguma palavra-chave é obrigatório!')
    .min(1, 'Informar alguma palavra-chave é obrigatório!')
    .max(3, 'Somente são permitidas 3 palavras chaves!'),
  answers: Yup.array().of(Yup.object().shape({
    description: Yup.string()
      .required('A descrição da resposta é obrigatório!')
      .max(1000, 'A resposta deve ter no máximo 1000 caracteres!'),
    value: Yup.number().required('O valor da resposta é obrigatório!')
  }))
    .min(1, 'É necessário informar ao menos uma resposta!')
    .max(10, 'Mais do que 10 respostas não amigo!'),
});
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  form_id: Yup.number().required('O formulário não existe, tu fez mágica muleke!'),
  answers: Yup.array().of(Yup.object().shape({
    description: Yup.number().optional(),
    question_id: Yup.number().required('Questão não informada é obrigatório!')
  }))
});
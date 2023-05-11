import * as Yup from 'yup';

export const withoutPassword = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório!'),
  email: Yup.string()
    .required('E-mail obrigatório!')
    .email('Digite um e-mail válido!'),
  actual_password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});
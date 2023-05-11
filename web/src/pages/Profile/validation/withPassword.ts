import * as Yup from 'yup';

export const withPassword = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório!'),
  email: Yup.string()
    .required('E-mail obrigatório!')
    .email('Digite um e-mail válido!'),
  actual_password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem!')
});
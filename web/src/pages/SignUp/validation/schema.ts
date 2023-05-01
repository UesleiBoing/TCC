import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório!'),
  email: Yup.string()
    .required('E-mail obrigatório!')
    .email('Digite um e-mail válido!'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem!')
});
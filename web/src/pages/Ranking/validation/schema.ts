import * as Yup from 'yup';

import validationCNPJ from './validationCNPJ';

export const schema = Yup.object().shape({
    email: Yup.string()
        .required('O Email é obrigatório!')
        .email('Digite um e-mail válido!'),
    password: Yup.string()
        .min(8, 'A senha deve conter no mínimo 8 dígitos!')
        .matches(/(?=.*[a-z])/, 'A senha deve conter uma letra minúscula!')
        .matches(/(?=.*[A-Z])/, 'A senha deve conter uma letra maiúscula!')
        .matches(/(?=.*[0-9])/, 'A senha deve conter um número!')
        .matches(/(?=.*[!@#$%^&*])/, 'A senha deve conter um caracter especial!'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas informadas devem ser iguais!'),
    name: Yup.string().required('O nome é obrigatório!'),
    cnpj: Yup.string().required('O CNPJ é obrigatório!')
        .test('validaCNPJ', 'O CNPJ é inválido!', validationCNPJ)
        .min(18, 'O CNPJ deve ter 14 dígitos!')
        .max(18, 'O CNPJ deve ter 14 dígitos!'),
    cep: Yup
        .string()
        .required('O cep é obrigatório!')
        .min(9, 'O CEP deve ter 8 dígitos!')
        .max(9, 'O CEP deve ter 8 dígitos!'),
    telephone: Yup
        .string()
        .required('O telefone é obrigatório!')
        .min(15, 'O telefone deve ter 11 dígitos!')
        .max(15, 'O telefone deve ter 11 dígitos!'),
    description: Yup
        .string()
        .required('A descrição é obrigatório!'),
    neighborhood: Yup
        .string()
        .required('O bairro é obrigatório!'),
    complement: Yup
        .string(),
    numberHouse: Yup
        .string()
        .required('O número é obrigatório!'),
    avatar: Yup.array().ensure().length(1, 'Informar a foto é obrigatório!')
});
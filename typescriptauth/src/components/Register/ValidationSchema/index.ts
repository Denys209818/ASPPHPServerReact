import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string()
    .required('Поле обовязкове для заповнення!').email('Не коректно вказана пошта!'),
    name: Yup.string().required('Поле обовязкове для заповнення!'),
    password:   Yup.string().required('Поле обовязкове для заповнення!').min(6, 'Мінімальна кількість символів - 6'),
    password_confirmation:   Yup.string().required('Поле обовязкове для заповнення!')
    .oneOf([Yup.ref("password")], 'Поля не співпадають!')
});
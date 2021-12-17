import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().required('Поле обов\'язкове для заповнення!')
    .email('Поле електронної введено не вірно!'),
    password: Yup.string().required('Поле обов\'язкове для заповнення!')
    .min(6, 'Мінімальна кількість значень - 6')
});
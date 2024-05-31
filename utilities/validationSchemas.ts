import * as Yup from 'yup';

const phoneRegExp = /^09\d{9}$/g;

export const loginSchema = Yup.object().shape({
  PhoneNumber: Yup.string()
    .matches(phoneRegExp, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .min(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .max(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .required('شماره تماس وارد شده صحیح نمی‌باشد!'),
});

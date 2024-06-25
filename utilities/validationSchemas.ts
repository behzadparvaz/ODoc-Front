import * as Yup from 'yup';

const phoneRegExp = /^09\d{9}$/g;

export const loginSchema = Yup.object().shape({
  PhoneNumber: Yup.string()
    .matches(phoneRegExp, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .min(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .max(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .required('شماره تماس وارد شده صحیح نمی‌باشد!'),
});
export const addFamilyMemberSchema = Yup.object().shape({
  FirstName: Yup.string().required('نام الزامی می باشد!'),
  LastName: Yup.string().required('نام خانوادگی الزامی می باشد!'),
  NationlaCode: Yup.string().required('شماره ملی الزامی می باشد!')
    .min(10, 'شماره ملی وارد شده صحیح نمی‌باشد!')
    .max(10, 'شماره ملی وارد شده صحیح نمی‌باشد!'),
  PhoneNumber: Yup.string()
    .matches(phoneRegExp, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .min(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .max(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .required('شماره تماس وارد شده صحیح نمی‌باشد!'),
});
export const loginWithPassword = Yup.object().shape({
  password: Yup.string().required('این فیلد الزامی است'),
});

export const addNewAddressSchema = Yup.object().shape({
  plaque: Yup.string().required('این فیلد الزامی است'),
  unit: Yup.string().required('این فیلد الزامی است'),
  postalCode: Yup.string().required('این فیلد الزامی است')
    .min(10, 'کد پستی 10 رقم می باشد')
    .max(10, 'کد پستی 10 رقم می باشد')
});

export const userInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('این فیلد الزامی است'),
  lastName: Yup.string().required('این فیلد الزامی است'),
  nationalCode: Yup.string().required('این فیلد الزامی است')
    .min(10, 'شماره ملی 10 رقم می باشد')
    .max(10, 'شماره ملی 10 رقم می باشد')
});
export const userPasswordSchema = Yup.object().shape({
  Password: Yup.string().required('این فیلد الزامی است'),
  ConfrimPassword: Yup.string().required('این فیلد الزامی است'),
});
export const OrderRegistrationSchema = Yup.object().shape({
  referenceNumber: Yup.string().required('این فیلد الزامی است'),
});
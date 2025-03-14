import * as Yup from 'yup';
import isValidIranianNationalCode from './isValidIranianNationalCode';

const phoneRegExp = /^09\d{9}$/g;
// export const nationalIdRegex = new RegExp(/^(?!(\d)\1{9})\d{10}$/);

export const loginSchema = Yup.object().shape({
  PhoneNumber: Yup.string()
    .matches(phoneRegExp, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .min(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .max(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .required('شماره تماس وارد شده صحیح نمی‌باشد!'),
});
export const addFamilyMemberSchema = Yup.object().shape({
  firstName: Yup.string().required('نام الزامی می باشد!'),
  lastName: Yup.string().required('نام خانوادگی الزامی می باشد!'),
  nationalCode: Yup.string()
    .required('شماره ملی الزامی می باشد!')
    .min(10, 'شماره ملی وارد شده صحیح نمی‌باشد!')
    .max(10, 'شماره ملی وارد شده صحیح نمی‌باشد!')
    .test(
      'is-valid-national-code',
      'شماره ملی وارد شده صحیح نمی‌باشد!',
      (value) => isValidIranianNationalCode(value),
    ),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .min(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .max(11, 'شماره تماس وارد شده صحیح نمی‌باشد!')
    .required('شماره تماس وارد شده صحیح نمی‌باشد!'),
  dateOfBirth: Yup.string()
    .required('تاریخ تولد الزامی می باشد!')
    .typeError('تاریخ تولد الزامی می باشد!'),
});
export const loginWithPassword = Yup.object().shape({
  password: Yup.string().required('این فیلد الزامی است'),
});

export const addNewAddressSchema = Yup.object().shape({
  name: Yup.string().required('این فیلد الزامی است'),
  plaque: Yup.string().required('این فیلد الزامی است'),
  unit: Yup.string().required('این فیلد الزامی است'),
});

export const userInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('این فیلد الزامی است'),
  lastName: Yup.string().required('این فیلد الزامی است'),
  nationalCode: Yup.string()
    .required('این فیلد الزامی است')
    .min(10, 'شماره ملی 10 رقم می باشد')
    .max(10, 'شماره ملی 10 رقم می باشد')
    .test(
      'is-valid-national-code',
      'شماره ملی وارد شده صحیح نمی‌باشد!',
      (value) => isValidIranianNationalCode(value),
    ),
});
export const userPasswordSchema = Yup.object().shape({
  Password: Yup.string().required('این فیلد الزامی است'),
  ConfrimPassword: Yup.string().required('این فیلد الزامی است'),
});
export const OrderRegistrationSchema = Yup.object().shape({
  refrenceNumber: Yup.string()
    .required('این فیلد الزامی است')
    .min(5, ' کد رهگیری حداقل باید 5 کاراکتر باشد')
    .max(6, ' کد رهگیری حداکثر باید 6 کاراکتر باشد'),
  nationalCode: Yup.string()
    .required('این فیلد الزامی است')
    .min(10, 'شماره ملی 10 رقم می باشد')
    .max(10, 'شماره ملی 10 رقم می باشد')
    .test(
      'is-valid-national-code',
      'شماره ملی وارد شده صحیح نمی‌باشد!',
      (value) => isValidIranianNationalCode(value),
    ),
});
export const VoucherCodeSchema = Yup.object().shape({
  voucherCode: Yup.string().required('این فیلد الزامی است'),
});
export const CancelOrderSchema = Yup.object().shape({
  cancelReasonValue: Yup.string().when('cancelReasonId', {
    is: (value) => value === 17,
    then: Yup.string().required('لطفا دلیل لفو سفارش خود را وارد نمایید'),
    otherwise: Yup.string().optional(),
  }),
  cancelReasonId: Yup.string().optional(),
});

export const RequestDrugSchema = Yup.object().shape({
  drugs: Yup.array()
    .of(
      Yup.object().shape({
        drugName: Yup.string().required('نام دارو الزامی است'),
        quantity: Yup.number()
          .required('تعداد دارو الزامی است')
          .max(10)
          .nullable(),
        drugShape: Yup.object().required('نوع دارو الزامی است'),
      }),
    )
    .required('حداقل یک دارو باید اضافه شود')
    .min(1, 'حداقل یک دارو باید اضافه شود'),
});

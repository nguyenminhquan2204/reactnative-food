import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
   password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Password không được để trống!'),
   email: Yup.string()
      .email('Định dạng email không hợp lệ!')
      .required('Required'),
});
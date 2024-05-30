import Button from "@com/_atoms/Button"
import { useFormik } from "formik";
import { useODocSendVerifyCode } from "@api/auth/oDocAuth.rq";
import { loginSchema } from "@lib/validationSchemas";
import { loginTexts } from "@com/texts/loginTexts";
import SectionTitle from "./SectionTitle.nd";
import TextInput from "@com/_atoms/TextInput";
import { useState } from "react";
import { CloseEyeIconFill, OpenEyeIconFill } from "@com/icons";
import { colors } from "@configs/Theme";


interface Props {
    handleChangeForm: (formStatus: 'otp') => void;
}

const AuthPassword = ({ handleChangeForm }: Props) => {
    const [hidePassword, setHidePassword] = useState(true);
    const { mutate: mutateODocSendVerifyCode, isLoading: oDocSendVerifyCodeLoading } = useODocSendVerifyCode();

    const formik = useFormik({
        initialValues: {
            PhoneNumber: "09129151055",
            password: ''
        },
        enableReinitialize: true,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);

            // mutateODocSendVerifyCode(
            //     values,
            //     {
            //         onSuccess: (responseData: any) => {
            //             if (responseData?.success) {
            //                 alert('good')
            //             }
            //         },
            //     }
            // );
        },
    });

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            formik.submitForm();
        }
    };
    return (

        <>
            <SectionTitle actionButton={<Button handleClick={() => handleChangeForm('otp')} className="text-teal-700 text-xs !p-0">{loginTexts?.loginByOTP}</Button>} descriptionClassName="text-md" description={loginTexts?.enterPassword} titleClassName="text-sm text-grey-600" title={loginTexts.loginByPassword} />
            <form onSubmit={formik.handleSubmit}>
                <TextInput
                    type={hidePassword ? 'password' : 'text'}
                    id="password"
                    className="mt-3"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={
                        (formik.touched.password && formik.errors.password) ||
                        (JSON.stringify(formik.errors) !== '{}' ? formik.errors.toString() : null)
                    }
                    onKeyPress={onKeyPress}
                    maxLength={32}
                    autoComplete="off"
                    leftIcon={
                        formik.values.password?.length >= 1 && (
                            <div onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? (
                                    <OpenEyeIconFill width={16} height={16} fill={colors.grey[400]} />
                                ) : (
                                    <CloseEyeIconFill width={16} height={16} fill={colors.grey[400]} />
                                )}
                            </div>
                        )
                    }
                />
                <Button
                    buttonType="contained"
                    variant="primary"
                    className="w-full mt-3"
                    size="large"
                    disabled={oDocSendVerifyCodeLoading}
                    type="submit"
                    isLoading={oDocSendVerifyCodeLoading}
                >
                    <p>{loginTexts.login}</p>
                </Button>
            </form>
        </>
    )
}
export default AuthPassword
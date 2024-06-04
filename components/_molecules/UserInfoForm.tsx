import { useAddProfileInfo, useUpdateProfileInfo } from "@api/user/user.rq";
import Button from "@com/_atoms/Button";
import Input from "@com/_atoms/Input.nd";
import { profileText } from "@com/texts/profileText";
import { userInfoSchema } from "@utilities/validationSchemas";
import { useFormik } from "formik";
import { useState } from "react";

const UserInfoForm = ({ data }) => {

    const { mutate: mutateAddProfileInfo } = useAddProfileInfo()
    const { mutate: mutateUpdateProfileInfo } = useUpdateProfileInfo()
    const [initialValues] = useState({
        firstName: data ? data?.firstName : "",
        lastName: data ? data?.lastName : "",
        nationalCode: data ? data?.nationalCode : ""
    })
    const formik = useFormik({
        initialValues,
        validationSchema: userInfoSchema,
        onSubmit: (values) => {
            if (data) {
                mutateUpdateProfileInfo(values);
            }
            else {
                mutateAddProfileInfo(values);
            }
        },
    });

    return (

        <form onSubmit={formik.handleSubmit} className="flex gap-y-7 flex-col mb-[86px]">
            <Input
                placeholder={profileText?.firstName}
                label={profileText?.firstName}
                className="flex-auto"
                labelClassName="font-normal text-sm"
                inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                isTouched={formik.touched.firstName && Boolean(formik.errors.firstName)}
                errorMessage={formik.errors.firstName}
            />
            <Input
                placeholder={profileText?.lastName}
                label={profileText?.lastName}
                className="flex-auto"
                labelClassName="font-normal text-sm"
                inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                isTouched={formik.touched.lastName && Boolean(formik.errors.lastName)}
                errorMessage={formik.errors.lastName}
            />
            <Input
                placeholder={profileText?.nationalCode}
                label={profileText?.nationalCode}
                className="flex-auto"
                labelClassName="font-normal text-sm"
                inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
                id="nationalCode"
                name="nationalCode"
                value={formik.values.nationalCode}
                onChange={formik.handleChange}
                isTouched={formik.touched.nationalCode && Boolean(formik.errors.nationalCode)}
                errorMessage={formik.errors.nationalCode}
            />
            <Button type="submit" className='w-full mt-3' size='large' buttonType='contained' variant={'primary'}>{data ? 'ویرایش اطلاعات کاربری' : 'ثبت اطلاعات کاربری'}</Button>

        </form>
    )
}
export default UserInfoForm
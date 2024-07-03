import NextImage from "@com/_core/NextImage";
import AuthPassword from "@com/_molecules/AuthPassword";
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from "@configs/ControlMobileView";
import useStorage from "@hooks/useStorage";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthMobileNumber = dynamic(() => import("@com/_molecules/AuthMobileNumber"))
const AuthOTP = dynamic(() => import("@com/_molecules/AuthOTP"))

const ODocAuth = () => {

    const [activeForm, setActiveForm] = useState<'enterMobileNumber' | 'otp' | 'password'>('enterMobileNumber')
    const [registerData, setRegisterData] = useState<any>(null)
    const { getItem } = useStorage();
    const token = getItem('token', 'local');
    const { replace } = useRouter()

    useEffect(() => {
        if ((token)) {
            replace('/');
        }
    })

    return (
        <div className={`bg-teal-50 gap-y-11 min-h-screen justify-end flex flex-col ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}>
            <div className="flex flex-col items-center">
                <div className='text-[#ff5722] text-2xl font-bold'>TAPSI <span className='text-teal-600'>Doctor</span></div>
                <NextImage
                    width={220}
                    height={220}
                    src={'/static/images/staticImages/doctor.svg'}
                />
            </div>
            <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
                {activeForm === 'enterMobileNumber' && <AuthMobileNumber handleChangeForm={(registerData, formStatus) => { setRegisterData(registerData,), setActiveForm(formStatus) }} />}
                {activeForm === 'otp' && <AuthOTP data={registerData} handleChangeForm={(formStatus) => setActiveForm(formStatus)} />}
                {activeForm === 'password' && <AuthPassword data={registerData} handleChangeForm={(formStatus) => setActiveForm(formStatus)} />}
            </div>
        </div>
    )
}
export default ODocAuth
import NextImage from "@com/_core/NextImage";
import AuthPassword from "@com/_molecules/AuthPassword";
import dynamic from "next/dynamic";
import { useState } from "react";

const AuthMobileNumber = dynamic(() => import("@com/_molecules/AuthMobileNumber"))
const AuthOTP = dynamic(() => import("@com/_molecules/AuthOTP"))

const ODocAuth = () => {
    const [activeForm, setActiveForm] = useState<'enterMobileNumber' | 'otp' | 'password'>('enterMobileNumber')
    const [registerData, setRegisterData] = useState<any>(null)
    return (
        <div className="bg-teal-50 gap-y-20 min-h-screen justify-end flex flex-col">
            <div className="flex justify-center">
                <NextImage
                    width={220}
                    height={220}
                    src={'/static/images/staticImages/doctor.svg'}
                />
            </div>
            <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
                {activeForm === 'enterMobileNumber' && <AuthMobileNumber handleChangeForm={(registerData,formStatus) => {setRegisterData(registerData,),setActiveForm(formStatus)}} />}
                {activeForm === 'otp' && <AuthOTP data={registerData} handleChangeForm={(formStatus) => setActiveForm(formStatus)} />}
                {activeForm === 'password' && <AuthPassword handleChangeForm={(formStatus) => setActiveForm(formStatus)} />}
            </div>
        </div>
    )
}
export default ODocAuth
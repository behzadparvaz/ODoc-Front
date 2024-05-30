import NextImage from "@com/_core/NextImage";
import dynamic from "next/dynamic";



const AuthMobileNumber=dynamic(()=>import("@com/_molecules/AuthMobileNumber"))
const AuthOTP=dynamic(()=>import("@com/_molecules/AuthOTP"))

const ODocAuth = () => {
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
                {/* <AuthMobileNumber /> */}
                <AuthOTP />
            </div>
        </div>
    )
}
export default ODocAuth
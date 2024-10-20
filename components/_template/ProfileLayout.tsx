import BottomNavigation from "@com/_molecules/BottomNavigation"
import { ArrowRightIconOutline } from "@com/icons"
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from "@configs/ControlMobileView"
import { colors } from "@configs/Theme"
import { useRouter } from "next/router"

interface Props {
    children: React.ReactNode,
    hasBackBtn?: React.ReactNode,
    title?: string
    className?: string
}

const ProfileLayout = ({ children, hasBackBtn = false, title, className = '' }: Props) => {
    const { back } = useRouter()
    return (
        <>
            <div className={`w-full bg-teal-600 pt-11 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}>
                <div className="w-full rounded-t-xl bg-white min-h-[calc(100vh-44px)] pb-24">
                    <div className={` px-6 py-6 ${className}`}>
                        {(title || hasBackBtn) && <div className="flex items-center gap-x-2 pb-6">
                            {hasBackBtn && <span onClick={back} className="border-2 rounded-md border-teal-600 cursor-pointer"><ArrowRightIconOutline height={24} width={24} fill={colors?.teal[600]} /></span>}
                            {title && <h1 className="text-teal-700 font-semibold">{title}</h1>}
                        </div>}
                        {children}
                    </div>
                </div>
                <BottomNavigation />
            </div >
        </>
    )
}
export default ProfileLayout
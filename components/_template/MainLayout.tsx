import BottomNavigation from "@com/_molecules/BottomNavigation"
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from "@configs/ControlMobileView"

interface Props {
    children: React.ReactNode,
    className?: string
}

const MainLayout = ({ children, className = '' }: Props) => {
    return (
        <>
            <div className={`w-full bg-white ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}>
                <div className={className}>
                    {children}
                </div>
            </div>
            <BottomNavigation />
        </>
    )
}
export default MainLayout
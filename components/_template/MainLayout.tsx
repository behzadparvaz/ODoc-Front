import BottomNavigation from "@com/_molecules/BottomNavigation"
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from "@configs/ControlMobileView"

interface Props {
    children: React.ReactNode,
    className?: string
    title?: string
}

const MainLayout = ({ children, className = '', title }: Props) => {
    return (
        <div className={`w-full h-screen ${title ? 'pt-[78px]' : ''} overflow-auto pb-[95px] bg-white ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}>
            {title && <div className="fixed px-4 bg-white z-10 text-grey-500 text-xl inset-x-0 py-6 top-0 border-b border-grey-100">
                <h1>
                    {title}
                </h1>
            </div>}
            <div className={className}>
                {children}
            </div>
            <BottomNavigation />
        </div>
    )
}
export default MainLayout
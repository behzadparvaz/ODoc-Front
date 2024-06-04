import { mobileModeMaxWidthClassName, shouldShowMobileMode } from "@configs/ControlMobileView"
import { BottomNavigationMenuItems } from "@utilities/staticNavigationItem"
import Link from "next/link"
import { useRouter } from "next/router"

const BottomNavigation = () => {
    const navigationMenuItems = BottomNavigationMenuItems()
    const { asPath } = useRouter()
    return <div className={`w-full py-5 border-t flex bg-white border-grey-100 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} fixed inset-x-0 bottom-0`}>
        {navigationMenuItems?.map((item) => {
            const activeItem = asPath === item?.link
            return (
                <Link href={item?.link}>
                    <a className="flex-col text-sm flex-auto">
                        <div className="flex justify-center">
                            <span className={`pb-1 px-3 border-b-2 ${activeItem ? ' border-teal-600' : 'border-transparent'}`}>
                                <span className={`${activeItem ? '' : 'brightness-0 opacity-40'}`}>
                                    {item?.icon}
                                </span>
                            </span>
                        </div>
                        <div className={`flex justify-center pt-1 ${activeItem ? 'text-teal-700 font-semibold ' : 'text-grey-700 '}`}>
                            {item?.text}
                        </div>

                    </a>
                </Link>
            )
        })}
    </div>
}
export default BottomNavigation
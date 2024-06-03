
interface Props {
    children: React.ReactNode,
    header?: React.ReactNode,
    title?: string
    className?: string
}

const ProfileLayout = ({ children, header, title, className = '' }: Props) => {
    return (
        <>
            <div className={'w-full bg-teal-600 pt-11'}>
                <div className="w-full rounded-t-xl bg-white min-h-[calc(100vh-44px)]">
                    {header && <div className='w-full flex justify-between items-center mb-4'>
                        {header && <div className="flex-auto flex relative">
                            {header}
                        </div>}
                    </div>}
                    <div className={className}>
                        {title && <h1 className="text-teal-700 pb-6 font-semibold">{title}</h1>}
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileLayout
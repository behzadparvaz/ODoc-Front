interface Props {
    items: any
    activeItem: number,
    className?: string,
    handleChangeStep: Function,
    currentStep: number
}
const StepProgressBar = ({ items, activeItem, className = '', handleChangeStep, currentStep }: Props) => {
    const progressPercentage = activeItem === items?.length ? 100 : activeItem > 1 ? 100 / activeItem : 0
    return (
        <div className={`w-full py-5 relative ${className}`}>
            <span className="absolute inset-x-0 h-[2px] bg-grey-200 top-[calc(50%-1px)] w-full z-[1]"><span style={{ width: progressPercentage + '%' }} className="absolute inset-x-0 h-[2px] bg-teal-600 top-[calc(50%-1px)] w-full z-[2]"></span></span>
            <div className="w-full flex justify-between">
                {items?.map((item,) => {
                    return (
                        <div key={item?.step} className="flex justify-center relative z-[3] first:justify-start last:justify-end">
                            <span onClick={(e) => currentStep >= item?.step ? handleChangeStep(item?.step) : e?.preventDefault()} className={`${activeItem >= item?.step ? 'text-teal-700 font-semibold' : 'text-grey-300'} text-sm bg-white px-1`}>
                                {item?.title}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default StepProgressBar
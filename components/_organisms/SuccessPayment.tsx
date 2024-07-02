import { TickSquareIcon } from "@com/icons"
import { orderText } from "@com/texts/orderText"
import { colors } from "@configs/Theme"

const SuccessPayment = ({ className = '' }) => {
    return (
        <div className={className}>
            <TickSquareIcon
                width={150}
                height={150}
                fill={colors?.green[400]}
            />
            <h1 className="text-lg text-green-400 font-semibold mt-4 mb-7">{orderText?.successPaymentText}</h1>
        </div>
    )
}
export default SuccessPayment
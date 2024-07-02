import { CloseSquareIconOutline } from "@com/icons"
import { orderText } from "@com/texts/orderText"
import { colors } from "@configs/Theme"

const FailurePayment = ({ className = '' }) => {
    return (
        <div className={className}>
            <CloseSquareIconOutline
                width={150}
                height={150}
                stroke="red"
                fill={colors?.red[400]}
            />
            <h1 className="text-lg text-red-400 font-semibold mt-4 mb-7">{orderText?.failurePaymentText}</h1>
        </div>
    )
}
export default FailurePayment
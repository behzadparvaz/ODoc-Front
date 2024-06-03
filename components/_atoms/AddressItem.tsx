import { useDeleteLocation } from "@api/user/user.rq";
import { DeleteIconOutline } from "@com/icons";
import { colors } from "@configs/Theme";
import useNotification from "@hooks/useNotification";
import { useQueryClient } from "react-query";

interface Props {
    addressInfo: any
    className?: string
}
const AddressItem = ({ addressInfo, className = '' }: Props) => {
    const { mutate: mutateDeleteLocation, isLoading: mutateDeleteLocationLoading } = useDeleteLocation()
    const handleDeleteAddress = () => {
        mutateDeleteLocation({
            Id: addressInfo?.id
        })
    }
    return (
        <div className={`w-full bg-grey-50 bg-opacity-30 rounded-md border border-grey-200 my-2 py-3 px-4 ${className}`}>
            <div className="flex justify-between">
                <div className="flex-auto">
                    {addressInfo?.name && <div className="w-full text-sm text-grey-600 mb-1 font-semibold">{addressInfo?.name}</div>}
                    <div className="w-full text-xs line-clamp-2 text-grey-600 mb-1">{addressInfo?.description}</div>
                </div>
                <div className="flex-auto flex justify-end pr-2">
                    <span onClick={() => handleDeleteAddress()} >
                        <DeleteIconOutline width={16} height={16} fill={colors?.red?.[600]} />
                    </span>
                </div>
            </div>
        </div>
    )
}
export default AddressItem
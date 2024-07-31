import AddressItem from "@com/_atoms/AddressItem"
import { useState } from "react";

interface Props {
    data: any;
    handleClickItem?: Function,
    inOrderPage?: boolean
}
const AddressList = ({ data, handleClickItem, inOrderPage = false }: Props) => {
    const [addressSelected, setAddressSelected] = useState(null)
    const handleClick = (item) => {
        if (inOrderPage) {
            handleClickItem(item)
            setAddressSelected(item?.id)
        }
        else {
            return null
        }
    }
    return (
        <div className="w-full">
            {data?.map((item) => {
                const activeItem = addressSelected === item?.id
                return (<div key={item?.id} onClick={(e) => handleClick(item)}><AddressItem activeItem={activeItem} className={`${activeItem ? 'border-teal-600 bg-teal-100' : ''} transition-all duration-300`} addressInfo={item} /></div>)
            })}
        </div>
    )
}
export default AddressList
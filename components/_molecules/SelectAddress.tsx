import { useGetUserLocations } from "@api/user/user.rq"
import Button from "@com/_atoms/Button"
import AddressList from "@com/_organisms/AddressList"
import ParsiMapBottomSheet from "@com/_organisms/ParsiMapBottomSheet"
import useModal from "@hooks/useModal"
import { setMapStateAction } from "@redux/map/mapActions"
import { RootState } from "@utilities/types"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"


interface Props {
    handleNextStep: (step, value) => void
}

const SelectAddress = ({ handleNextStep }: Props) => {

    const [addressSelected, setAddressSelected] = useState(null)
    const { addModal } = useModal()
    const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);
    const dispatch = useDispatch()
    const handleClickOpenModal = () => {
        dispatch(setMapStateAction({ viewport: defaultViewPort, mapIsTouched: false }));
        addModal({
            modal: ParsiMapBottomSheet,
            props: { latitude: defaultViewPort.latitude, longitude: defaultViewPort.longitude, addressId: 0 },
        });

    }
    const { data: addressData, isLoading } = useGetUserLocations()
    const addressItem: any = addressData
    return (

        <>
            <div className="w-full">
                {isLoading === false && <>
                    {!addressItem?.length ?
                        <div className="text-red text-sm text-red-600 text-center py-8">در حال حاضر آدرسی برای شما ثبت نشده است</div> : null}


                    {addressItem?.length ?
                        <AddressList inOrderPage={true} handleClickItem={(addressData) => setAddressSelected(addressData)
                        } data={addressItem} />
                        : null}
                </>}
            </div>
            <div className="w-full flex justify-between mt-5">
                <Button handleClick={() => handleClickOpenModal()} size='large' buttonType='contained' variant={'primary'}>افزودن آدرس</Button>
                <Button handleClick={()=>handleNextStep(3,addressSelected)} disabled={addressSelected ? false : true} buttonType="contained" size="large" variant="primary">ادامه</Button>
            </div>
        </>
    )
}
export default SelectAddress
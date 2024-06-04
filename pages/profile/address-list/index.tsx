import ProfileLayout from "@com/_template/ProfileLayout"
import { profileText } from "@com/texts/profileText"
import { useGetUserLocations } from "@api/user/user.rq"
import AddressItem from "@com/_atoms/AddressItem"
import ParsiMapBottomSheet from "@com/_organisms/ParsiMapBottomSheet"
import MainLayout from "@com/_template/MainLayout"
import { selectStoreTexts } from "@com/texts/selectStoreTexts"
import useModal from "@hooks/useModal"
import useNotification from "@hooks/useNotification"
import { setMapStateAction } from "@redux/map/mapActions"
import { RootState } from "@utilities/types"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@com/_atoms/Button"


const AddressList = () => {

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
        <ProfileLayout hasBackBtn title={profileText?.addresses} >
            {isLoading === false && <>
                {!addressItem?.length ?
                    <div className="text-red text-sm text-red-600 text-center py-8">در حال حاضر آدرسی برای شما ثبت نشده است</div> : null}
                <Button handleClick={() => handleClickOpenModal()} className={`${addressItem?.length ? 'mb-4' : 'w-full'} mt-4`} size='large' buttonType='contained' variant={'primary'}>افزودن آدرس</Button>

                {addressItem?.length ?

                    <div className="w-full">
                        {addressItem?.map((item) => {
                            return (<AddressItem addressInfo={item} key={item?.id} />)
                        })}
                    </div>
                    : null}
            </>}
        </ProfileLayout>
    )
}
export default AddressList
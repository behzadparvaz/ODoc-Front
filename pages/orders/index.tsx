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

const Map = () => {
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
        <MainLayout>
            <div className="w-full px-4">
                <div onClick={() => handleClickOpenModal()}>افزودن آدرس</div>
                {addressItem?.map((item) => {
                    return (<AddressItem addressInfo={item} key={item?.id} />)
                })}
            </div>
        </MainLayout>
    )
}
export default Map
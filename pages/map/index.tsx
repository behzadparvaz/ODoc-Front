import ParsiMapBottomSheet from "@com/_organisms/ParsiMapBottomSheet"
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
    return (
        <span onClick={() => handleClickOpenModal()}>map</span>
    )
}
export default Map
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

    return (
        <MainLayout>
            order
        </MainLayout>
    )
}
export default Map
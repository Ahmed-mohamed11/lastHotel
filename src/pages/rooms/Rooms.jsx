import { useEffect, useState } from "react";
 import { DeleteAlert } from "../../components/Alert";
import { useI18nContext } from "../../context/i18n-context";
import api from "../../ApiUrl";
 import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../store/slices/roomsSlice";
import RoomsTable from "./RoomsTable";

export default function Rooms({ role }) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [selectedRoomData, setSelectedRoomData] = useState({});
    const [roomsData, setRoomsData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);

    const { t } = useI18nContext();

    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    useEffect(() => {
        setRoomsData(rooms);
    }, [rooms]);


    const toggleOpenCreateModal = () => {
        setOpenCreate(!openCreate);
    };

    const toggleOpenPreviewModal = (selectedRoom) => {
        setSelectedRoomData(selectedRoom);
        setOpenPreview(!openPreview);
    };

    const toggleOpenEditModal = (selectedRoom) => {
        setSelectedRoomData(selectedRoom);
        setOpenEdit(!openEdit);
    };

     const [showDelete, setShowDelete] = useState(false);
    const [room, setRoom] = useState(0);

    const handleGetRoom = (selectedRoom) => {
        console.log(selectedRoom);
        setRoom(selectedRoom);
        setShowDelete(true);
    };

    const handleDeleteRoom = async () => {
        console.log(room.id);
        try {
            const response = await api.delete(`rooms/${room.id}/`);

            console.log("Data", response.data);
            dispatch(fetchRooms());
            setShowDelete(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={"text-white"}>
          

            <RoomsTable
                openEdit={toggleOpenEditModal}
                openCreate={toggleOpenCreateModal}
                openPreview={toggleOpenPreviewModal}
                RoomsData={roomsData}
                handleGetRoom={handleGetRoom}
            />

          
 

            {showDelete && (
                <DeleteAlert
                    title={t("Delete.deleteTitle")}
                    text={t("Delete.deleteText")}
                    deleteClick={handleDeleteRoom}
                    closeClick={() => setShowDelete(false)}
                />
            )}
        </div>
    );
}

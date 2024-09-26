import { useState, useRef, useEffect, useMemo } from "react";
import {
    CaretLeft,
    CaretRight,
    DotsThree,
    Eye,
    MagnifyingGlass,
    NotePencil,
    Plus,
    TrashSimple,
} from "@phosphor-icons/react";
import { useI18nContext } from "../../context/i18n-context";

// Pagination Controls component
const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-end items-center p-4 gap-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretRight size={18} weight="bold" />
        </button>
        <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 mx-2 font-bold text-sm rounded-md ${i + 1 === currentPage
                        ? "bg-slate-500 text-white"
                        : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretLeft size={18} weight="bold" />
        </button>
    </div>
);

export default function RoomsTable({
    openCreate,
    openPreview,
    openEdit,
    RoomsData,
    handleGetRoom,
}) {
    const lang = localStorage.getItem("language");
    const dropdownRefs = useRef({});
    const { t } = useI18nContext();

    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const toggleEditDropdown = (roomId) => {
        setSelectedRoomId((prevRoomId) =>
            prevRoomId === roomId ? null : roomId
        );
    };

    const handleClickOutside = (event, roomId) => {
        const dropdown = dropdownRefs.current[roomId];

        if (
            dropdown &&
            !dropdown.contains(event.target) &&
            !event.target.classList.contains("edit-button")
        ) {
            setSelectedRoomId(null);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            handleClickOutside(event, selectedRoomId);
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [selectedRoomId]);

    const handlePreviewClick = (room) => {
        openPreview(room);
    };

    const handleEditClick = (room) => {
        openEdit(room);
    };

    const filteredData = useMemo(() => {
        return RoomsData.filter(
            (room) =>
                room.type.toLowerCase().includes(searchTerm) ||
                room.people_number.toString().includes(searchTerm) ||
                room.price.toString().includes(searchTerm) ||
                room.breakfast_price.toString().includes(searchTerm) ||
                room.three_meals_price.toString().includes(searchTerm)
        );
    }, [RoomsData, searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">
                                        {t("roomsForm.search")}
                                    </label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlass
                                                size={20}
                                                weight="bold"
                                                className="text-gray-500 dark:text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 flex items-center align-middle text-gray-900 text-sm rounded-lg w-full pl-10 p-2 outline-none dark:bg-gray-700 border border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder={t("roomsForm.search")}
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={openCreate}
                                    className="flex gap-2 items-center justify-center duration-150 ease-linear
                                    text-white bg-themeColor-500 hover:bg-themeColor-700 
                                    focus:ring-4 focus:ring-themeColor-300 
                                    font-medium rounded-lg text-sm px-4 py-2 
                                    dark:bg-themeColor-300 dark:hover:bg-themeColor-500 dark:text-themeColor-800
                                    dark:hover:text-white
                                    focus:outline-none dark:focus:ring-themeColor-800"
                                >
                                    <Plus size={18} weight="bold" />
                                    {t("roomsForm.createRoom")}
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.type")}</th>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.peopleNumber")}</th>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.price")}</th>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.breakfastPrice")}</th>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.threeMealsPrice")}</th>
                                        <th scope="col" className="px-4 py-3">{t("roomsForm.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((room) => (
                                            <tr className="border-b dark:border-gray-700 text-center" key={room.id}>
                                                <td className="px-4 py-3">{room.type}</td>
                                                <td className="px-4 py-3">{room.people_number}</td>
                                                <td className="px-4 py-3">{room.price}</td>
                                                <td className="px-4 py-3">{room.breakfast_price}</td>
                                                <td className="px-4 py-3">{room.three_meals_price}</td>
                                                <td className="px-4 py-3 flex items-center justify-end">
                                                    <button
                                                        className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover:bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                        type="button"
                                                        onClick={() => toggleEditDropdown(room.id)}
                                                    >
                                                        <NotePencil size={18} weight="bold" />
                                                    </button>
                                                    {selectedRoomId === room.id && (
                                                        <div
                                                            ref={(el) => (dropdownRefs.current[room.id] = el)}
                                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-md z-10"
                                                        >
                                                            <ul className="py-2">
                                                                <li>
                                                                    <button
                                                                        onClick={() => handleEditClick(room)}
                                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full text-left"
                                                                    >
                                                                        {t("roomsForm.edit")}
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        onClick={() => handlePreviewClick(room)}
                                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full text-left"
                                                                    >
                                                                        {t("roomsForm.preview")}
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        onClick={() => handleGetRoom(room.id)}
                                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full text-left"
                                                                    >
                                                                        {t("roomsForm.delete")}
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-3 text-center">
                                                {t("roomsForm.noData")}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={setCurrentPage}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

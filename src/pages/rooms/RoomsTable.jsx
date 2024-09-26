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
    ClientsData,
    handleGetClient,
}) {
    const lang = localStorage.getItem("language");
    const dropdownRefs = useRef({});
    const { t } = useI18nContext();

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchTerm, setSearchTerm] = useState("");


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const toggleEditDropdown = (clientId) => {
        setSelectedClientId((prevClientId) =>
            prevClientId === clientId ? null : clientId
        );
    };

    const handleClickOutside = (event, clientId) => {
        const dropdown = dropdownRefs.current[clientId];

        if (
            dropdown &&
            !dropdown.contains(event.target) &&
            !event.target.classList.contains("edit-button")
        ) {
            setSelectedClientId(null);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            handleClickOutside(event, selectedClientId);
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [selectedClientId]);

    const handlePreviewClick = (client) => {
        openPreview(client);
    };

    const handleEditClick = (client) => {
        openEdit(client);
    };

    const filteredData = useMemo(() => {
        return ClientsData.filter(
            (client) =>
                client.name.toLowerCase().includes(searchTerm) ||
                client.address.toLowerCase().includes(searchTerm) ||
                client.phone.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm)
        );
    }, [ClientsData, searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(ClientsData.length / itemsPerPage);

    return (
        <div>
            <>
                <section className="bg-white dark:bg-gray-900 p-3 sm:p-5">
                    <div className="mx-auto max-w-screen-xl">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">
                                            {t("clientsForm.search")}
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
                                                placeholder={t("clientsForm.search")}
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
                                        {t("clientsForm.createClient")}
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                {t("clientsForm.fullName")}
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                {t("clientsForm.address")}
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                {t("clientsForm.phone")}
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                {t("clientsForm.email")}
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                <span>{t("clientsForm.actions")}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData ? (
                                            filteredData.length > 0 ? (
                                                paginatedData.map((client) => (
                                                    <tr
                                                        className="border-b dark:border-gray-700 text-center"
                                                        key={client.id}
                                                    >
                                                        <td className="px-4 py-3">{client.name}</td>
                                                        <td className="px-4 py-3">{client.address}</td>
                                                        <td className="px-4 py-3">{client.phone}</td>
                                                        <td className="px-4 py-3">{client.email}</td>
                                                        <td className="px-4 py-3 flex items-center justify-end">
                                                            <button
                                                                className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                                type="button"
                                                                onClick={() => toggleEditDropdown(client.id)}
                                                                ref={(el) =>
                                                                    (dropdownRefs.current[client.id] = el)
                                                                }
                                                            >
                                                                <DotsThree size={25} weight="bold" />
                                                            </button>
                                                            <div className="absolute z-50">
                                                                <div
                                                                    id={`client-dropdown-${client.id}`}
                                                                    className={`${selectedClientId === client.id
                                                                            ? `absolute -top-3 ${lang === "en"
                                                                                ? "right-full"
                                                                                : "left-full"
                                                                            } overflow-auto`
                                                                            : "hidden"
                                                                        } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                                                                >
                                                                    <ul className="py-1 text-sm">
                                                                        <li>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleEditClick(client)}
                                                                                className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                                                            >
                                                                                <NotePencil size={18} weight="bold" />
                                                                                {t("Actions.edit")}
                                                                            </button>
                                                                        </li>

                                                                        <li>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handlePreviewClick(client)
                                                                                }
                                                                                className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                                                            >
                                                                                <Eye size={18} weight="bold" />
                                                                                {t("Actions.preview")}
                                                                            </button>
                                                                        </li>
                                                                        <li>
                                                                            <button
                                                                                type="button"
                                                                                className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                                                                onClick={() => handleGetClient(client)}
                                                                            >
                                                                                <TrashSimple size={18} weight="bold" />
                                                                                {t("Actions.delete")}
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-4 text-center">
                                                        No data available
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-4 text-center">
                                                    No data available
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
                {/* End block */}
            </>
        </div>
    );
}

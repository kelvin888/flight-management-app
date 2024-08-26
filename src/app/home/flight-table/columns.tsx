import React, { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import Modal from "../../../components/modal/Modal"
import { FlightType } from "@/types/flight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import DeleteFlight from "./delete-flight"
import EditFlight from "./edit-flight"
import config from "@/config"

const columnHelper = createColumnHelper<FlightType>()

export const flightColumns = [
    columnHelper.accessor("code", {
        cell: (info) => info.getValue(),
        header: () => <span>Flight Code</span>,
    }),
    columnHelper.accessor((row) => row.capacity, {
        id: "capacity",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Capacity</span>,
    }),
    columnHelper.accessor("departureDate", {
        header: () => "Departure Date",
        cell: (info) => <span>{info.renderValue()}</span>,
    }),
    columnHelper.accessor("action", {
        header: "Photo",
        cell: ({ cell }) => {

            const { row: { original: originalData } } = cell
            const [showModal, setShowModal] = useState(false)
            const openModal = () => { setShowModal(true) }
            function closeModal() { setShowModal(false) }

            return (
                <>
                    {originalData?.img ? <FontAwesomeIcon icon={faEye} onClick={openModal} /> : null}

                    <Modal isOpen={showModal} closeModal={closeModal} contentContainerClass="max-w-[40rem]">
                        <img
                            src={`${config.FLIGHT_SERVICE_ENDPOINT}/flights/${originalData.id}/photo`}
                            alt="flight photo"
                            className="object-fill w-full"
                        />
                    </Modal>
                </>
            )
        },
    }),
    columnHelper.accessor("id", {
        header: "Action",
        cell: ({ cell }) => {

            const { row: { original: originalData } } = cell
            const [showConfirmDelete, setShowConfirmDelete] = useState(false)
            const [showEditModal, setShowEditMOdal] = useState(false)


            const openDeleteConfirmModal = () => setShowConfirmDelete(true)
            const closeDeleteConfirmModal = () => setShowConfirmDelete(false)


            const openEditModal = () => setShowEditMOdal(true)
            const closeEditModal = () => setShowEditMOdal(false)

            return (
                <>
                    <div className="flex gap-4">
                        <FontAwesomeIcon icon={faEdit} onClick={openEditModal} />
                        <FontAwesomeIcon icon={faTrash} className="text-red-500" onClick={openDeleteConfirmModal} />
                    </div>

                    <DeleteFlight
                        showConfirmDelete={showConfirmDelete}
                        closeDeleteConfirmModal={closeDeleteConfirmModal}
                        flightId={originalData.id}
                    />

                    {showEditModal ?
                        <EditFlight isOpen={showEditModal} onClose={closeEditModal} flightData={originalData} />
                        : null
                    }
                </>
            )
        },
    }),
]

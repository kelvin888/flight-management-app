import Button from '@/components/button'
import Modal from '@/components/modal/Modal'
import { useFlights } from '@/hooks/useFlights'
import React, { FC } from 'react'

type DeleteFlightProps = {
    showConfirmDelete: boolean
    closeDeleteConfirmModal: () => void
    flightId: string
}

const DeleteFlight: FC<DeleteFlightProps> = ({ showConfirmDelete, closeDeleteConfirmModal, flightId }) => {

    const { handleFlightDeleting, isDeleting } = useFlights()

    const handleDelete = () => {
        handleFlightDeleting(flightId)
    }

    return (
        <Modal isOpen={showConfirmDelete} closeModal={closeDeleteConfirmModal} contentContainerClass="border-t-red-500">
            <h2 className="text-2xl mt-4 font-bold text-center">Confirm Delete</h2>
            <div className="p-6 text-center">Are you sure you want to delete the flight? This action cannot be reversed.</div>

            <div className="my-3 flex justify-center gap-2">
                <Button variant="dangerOutlined">Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Confirm</Button>
            </div>
        </Modal>)
}

export default DeleteFlight
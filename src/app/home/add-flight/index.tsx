import Button from "@/components/button";
import Dropzone from "@/components/dropzone";
import Input from "@/components/input/TextField";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useFlights } from "@/hooks/useFlights";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
    code: yup
        .string()
        .matches(/^[a-zA-Z]{6}$/, "Flight code must be 6 characters long and contain only uppercase or lowercase letters")
        .required("Flight code is required"),
    capacity: yup
        .number()
        .typeError('The value must be a number')
        .min(1, "Capacity must be at least 1")
        .max(200, "Capacity must be at most 200"),
    departureDate: yup.string().required("Departure Date is required"),
})

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AddFlightModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [flightImage, setFlightImage] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const { handleFlightCreation, isCreating } = useFlights();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data: FieldValues) => {

        if (flightImage === null) {
            setFileError("Upload flight image");
            return;
        }

        const formdata = new FormData();
        formdata.append("code", data.code);
        formdata.append("capacity", data.capacity);
        formdata.append("departureDate", data.departureDate);
        formdata.append("photo", flightImage);

        handleFlightCreation(formdata);
    };

    const handleDrop = (files: File[]) => {
        setFileError(null);
        setFlightImage(files[0]);
    };

    const handleRemove = () => {
        setFlightImage(null)
    }

    return (
        <Modal isOpen={isOpen} closeModal={onClose}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="mt-8 w-full rounded-lg bg-white dark:bg-gray-400 dark:py-3 px-7">
                        <h1 className="mb-3 font-bold text-2xl">Create Flight</h1>

                        <div className="flex flex-col gap-4">
                            <Input label="Flight Code" name="code" />
                            <Input label="Plane Capacity" name="capacity" />
                            <Input label="Departure Date" type="date" name="departureDate" />
                        </div>
                        <div className="mt-6 w-[100%] md:mt-5">
                            <div className="mb-3">
                                <label className="text-black-default font-medium">
                                    Upload Flight Image
                                </label>
                            </div>

                            <Dropzone
                                acceptedFileTypes={{
                                    "image/jpeg": [],
                                    "image/png": [],
                                }}
                                onDrop={handleDrop}
                                onRemove={handleRemove}
                            />

                            {flightImage ? <div>{flightImage.name}</div> : null}

                            <span className="text-sm text-red-500">{fileError}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-6 px-7 my-4">
                        <Button className="ml-4" variant="primaryOutlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isCreating ? "Creating..." : "Create Flight"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default AddFlightModal;

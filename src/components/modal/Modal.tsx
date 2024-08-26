import React, { ReactNode } from "react"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  contentContainerClass?: string
}
const Modal: React.FC<ModalProps> = ({
  closeModal,
  isOpen,
  children,
  contentContainerClass,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-10 bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`w-full max-w-md transform overflow-hidden rounded-[4px] bg-white dark:bg-gray-600 text-left align-middle shadow-xl transition-all border-t-4 border-t-blue-400 ${contentContainerClass}`}
              >
                <FontAwesomeIcon
                  className="absolute right-[0.8125rem] top-[0.8125rem] w-4 cursor-pointer  bg-red-500 text-white"
                  icon={faClose}
                  onClick={closeModal}
                />
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal

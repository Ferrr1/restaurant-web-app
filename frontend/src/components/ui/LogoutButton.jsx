import { useState } from "react";
import { MdLogout } from "react-icons/md";
import Modal from "./Modal";
import Button from "./Button";

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        onClick={openModal}
        className="relative cursor-pointer p-2 border-2 border-border hover:border-primary rounded-full group transition-colors duration-200 ease-in-out"
      >
        <MdLogout size={20} className="group-hover:text-primary" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Logout">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-text">
              When you click confirm, you will be redirected to the login page.
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={closeModal} variant="delete">
              Cancel
            </Button>
            <Button  variant="confirm">Confirm</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

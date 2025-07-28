import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

const ModalDeleteDishes = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Dishes">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-text">
            Are you sure you want to delete this dishes?
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="delete">
            Cancel
          </Button>
          <Button variant="confirm">Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteDishes;

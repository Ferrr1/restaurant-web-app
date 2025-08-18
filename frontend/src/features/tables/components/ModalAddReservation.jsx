import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";

const ModalAddReservation = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Reservation">
      <div className="flex flex-col gap-2">
        <Input
          label="Customer Name"
          className="w-full"
          placeholder="e.g. Maulana Feri"
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="delete" onClick={onClose} className="mt-2">
            Close
          </Button>
          <Button variant="confirm" className="mt-2">
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddReservation;

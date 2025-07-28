import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";

const ModalAddCategory = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Category">
      <div className="flex flex-col gap-2">
        <Input
          label="Category Name"
          className="w-full"
          placeholder="e.g. Beef"
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

export default ModalAddCategory;

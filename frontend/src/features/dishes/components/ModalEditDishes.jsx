import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";

const ModalEditDishes = ({ isOpen, onClose }) => {
  return (
    <Modal title={"Edit Dishes"} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <Input
          label="Name"
          type="text"
          className="w-full"
          placeholder="e.g. Wagyu Steak"
        />
        <Input
          label="Price"
          type="number"
          className="w-full"
          placeholder="e.g. 12000"
        />
        <Select
          label="Select Category"
          className="w-full text-text "
          placeholder="Select Category"
        >
          <option className="bg-background text-text" value="appetizers">
            Appetizers
          </option>
          <option className="bg-background text-text" value="main_courses">
            Main Courses
          </option>
          <option className="bg-background text-text" value="desserts">
            Desserts
          </option>
          <option className="bg-background text-text" value="beverages">
            Beverages
          </option>
          <option className="bg-background text-text" value="salads">
            Salads
          </option>
        </Select>
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

export default ModalEditDishes;

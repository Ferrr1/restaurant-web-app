import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { deleteDish } from "../services/DishesServices";

const ModalDeleteDishes = ({ isOpen, onClose, notify, selectedDish }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (dish) => deleteDish(dish),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes-and-categories"] });
      notify({ message: "Berhasil menghapus dishes!", type: "success" });
      onClose();
    },
    onError: (err) => {
      console.error("Error deleting dish:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Dishes">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-text">
            Are you sure you want to delete this dishes?
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} type="button" variant="delete">
            Cancel
          </Button>
          <Button
            onClick={() => mutate(selectedDish.dishid)}
            variant="confirm"
            disabled={!selectedDish.dishid}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteDishes;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { deleteTable } from "../services/TablesServices";

const ModalDeleteTable = ({ isOpen, onClose, notify, data }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (dish) => deleteTable(dish),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      notify({ message: "Berhasil menghapus table!", type: "success" });
      onClose();
    },
    onError: (err) => {
      console.error("Error deleting table:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Table">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-text">
            Are you sure you want to delete this table?
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} type="button" variant="delete">
            Cancel
          </Button>
          <Button
            onClick={() => mutate(data.id)}
            variant="confirm"
            // className={`${isLoading && "cursor-not-allowed opacity-50"}`}
            disabled={!data.id}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteTable;

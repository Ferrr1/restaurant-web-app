import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { addCategory } from "../services/DishesServices";

const ModalAddCategory = ({ isOpen, onClose, notify }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = useMutation({
    mutationFn: (data) => addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes-and-categories"] });
      notify({ message: "Berhasil tambah kategori!", type: "success" });
      onClose();
    },
    onError: (err) => {
      console.error("Error adding category:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]); // ← penting: ambil file pertama

    mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Category">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Category Name"
          {...register("name", { required: "Category name is required" })}
          className="w-full text-text"
          placeholder="e.g. Beef"
        />
        {errors.name && (
          <p className="text-red-500 text-sm -mt-1">{errors.name.message}</p>
        )}
        <Input
          label="Category Image"
          type="file"
          accept=".webp, .png"
          {...register("image", { required: "Category image is required" })}
          className="w-full text-text"
        />
        {errors.image && (
          <p className="text-red-500 text-sm -mt-1">{errors.image.message}</p>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="delete" onClick={onClose} className="mt-2">
            Close
          </Button>
          <Button variant="confirm" type="submit" className="mt-2">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddCategory;

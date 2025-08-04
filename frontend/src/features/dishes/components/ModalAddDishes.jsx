import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { addDish } from "../services/DishesServices";

const ModalAddDishes = ({ isOpen, onClose, data, notify }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = useMutation({
    mutationFn: (data) => addDish(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes-and-categories"] });
      notify({ message: "Berhasil tambah kategori!", type: "success" });
      onClose();
      reset();
    },
    onError: (err) => {
      console.error("Error adding category:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);
    formData.append("price", data.price);
    formData.append("category", data.category);

    mutate(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Dishes">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Dishes Name"
          {...register("name", { required: "Dishes name is required" })}
          className="w-full text-text"
          placeholder="e.g. Beef"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <Input
          label="Price"
          type="number"
          {...register("price", { required: "Price is required" })}
          className="w-full text-text"
          placeholder="e.g. 12000"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
        <Input
          label="Image"
          type="file"
          accept=".webp, .png"
          {...register("image", { required: "Image is required" })}
          className="w-full text-text"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
        <Select
          label="Select Category"
          {...register("category", { required: "Category is required" })}
          className="w-full text-text"
          placeholder="Select Category"
          onChange={(e) => console.log(e.target.value)}
          defaultValue={data[0]?.id}
        >
          <option disabled>Select Category</option>
          {data.map((category) => (
            <option
              key={category.name}
              className="bg-background text-text"
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="delete"
            type="button"
            onClick={onClose}
            className="mt-2"
          >
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

export default ModalAddDishes;

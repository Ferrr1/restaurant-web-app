import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { BASE_URL, updateDish } from "../services/DishesServices";

const ModalEditDishes = ({
  isOpen,
  onClose,
  notify,
  dataCategories,
  selectedDish,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => updateDish(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes-and-categories"] });
      notify({ message: "Berhasil mengupdate dish!", type: "success" });
      handleClose();
    },
    onError: (err) => {
      console.error("Error updating dish:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    mutate({ id: selectedDish.dishid, data: formData });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (selectedDish) {
      reset({
        name: selectedDish.dishname,
        price: selectedDish.dishprice,
        category: selectedDish.categoryid,
      });
    }
  }, [selectedDish, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Dishes">
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

        {selectedDish?.dishimage && (
          <img
            src={`${BASE_URL}/uploads/dishes/${selectedDish.dishimage}`}
            alt="Current Dish"
            className="w-32 h-24 object-cover rounded-md border-2 border-border"
          />
        )}

        <Input
          label="Image (optional)"
          type="file"
          accept=".webp, .png"
          {...register("image")}
          className="w-full text-text"
        />

        <Select
          label="Select Category"
          {...register("category", { required: "Category is required" })}
          className="w-full text-text"
        >
          <option disabled value="">
            Select Category
          </option>
          {dataCategories.map((category) => (
            <option
              key={category.id}
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
            onClick={handleClose}
            className="mt-2"
          >
            Close
          </Button>
          <Button variant="confirm" type="submit" className="mt-2">
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditDishes;

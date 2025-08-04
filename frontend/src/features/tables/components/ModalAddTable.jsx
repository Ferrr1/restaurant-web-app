import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { addTable } from "../services/TablesServices";

const ModalAddTable = ({ isOpen, onClose, notify, data }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = useMutation({
    mutationFn: (data) => addTable(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      notify({ message: "Table added successfully!", type: "success" });
      onClose();
      reset();
    },
    onError: (err) => {
      console.error("Error adding category:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Tables">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Number Table"
          type="number"
          disabled={true}
          value={data?.length + 1}
          className="w-full text-text cursor-not-allowed"
          placeholder="e.g. Auto Generate"
        />
        <Input
          label="Capacity"
          type="number"
          {...register("capacity", { required: "Capacity is required" })}
          className="w-full text-text"
          placeholder="e.g. Max 8"
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm">{errors.capacity.message}</p>
        )}
        <Select
          label="Select Status"
          {...register("status", { required: "Status is required" })}
          className="w-full text-text"
          placeholder="Select Status"
          onChange={(e) => console.log(e.target.value)}
          defaultValue="available"
        >
          <option className="bg-background text-text" disabled>
            Select Status
          </option>
          <option className="bg-background text-text" value="reserved">
            Reserved
          </option>
          <option className="bg-background text-text" value="available">
            Available
          </option>
          <option className="bg-background text-text" value="dine in">
            Dine In
          </option>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
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

export default ModalAddTable;

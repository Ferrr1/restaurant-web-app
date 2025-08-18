import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { Input, Select } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { updateTable } from "../services/TablesServices";

const ModalEditTable = ({ isOpen, onClose, notify, data }) => {
  const queryClient = useQueryClient();
  const tableId = data.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => updateTable(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      notify({ message: "Table updated successfully", type: "success" });
      handleClose();
    },
    onError: (err) => {
      console.error("Error updating table:", err);
      notify({ message: err.response?.data.error, type: "error" });
    },
  });

  const onSubmit = (data) => {
    console.log("submit", data);
    mutate({ id: tableId, data });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (data) {
      reset({
        number: data.number,
        capacity: data.capacity,
        status: data.status,
      });
    }
  }, [data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Table">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Number Table"
          disabled={true}
          {...register("number", { required: "Number is required" })}
          className="cursor-not-allowed w-full text-text"
          placeholder="e.g. Auto Generate"
        />
        {errors.number && (
          <p className="text-red-500 text-sm">{errors.number.message}</p>
        )}

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

export default ModalEditTable;

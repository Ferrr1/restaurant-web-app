import { useState } from "react";
import { MdLogout } from "react-icons/md";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { logout } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNotify } from "../../../context/NotifyContext";

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { push } = useNotify();
  const { setAuth } = useAuth();

  const { mutate } = useMutation({
    mutationFn: logout,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async () => {
      try {
        setAuth(null, null);
        navigate("/login");
      } catch (error) {
        console.error("Gagal ambil data user:", error);
      } finally {
        setLoading(false);
        push({ message: "Berhasil logout!", type: "success" });
      }
    },
    onError: (err) => {
      console.error("Logout gagal:", err?.response?.data);
      setLoading(false);
      push({ message: "Logout gagal!", type: "error" });
    },
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <>
      <button
        onClick={openModal}
        className="relative cursor-pointer p-2 border-2 border-border hover:border-primary rounded-full group transition-colors duration-200 ease-in-out"
      >
        <MdLogout size={20} className="group-hover:text-primary" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Logout">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-text">
              When you click confirm, you will be redirected to the login page.
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={closeModal} variant="delete">
              Cancel
            </Button>
            <Button disabled={loading} onClick={handleLogout} variant="confirm">
              {loading ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

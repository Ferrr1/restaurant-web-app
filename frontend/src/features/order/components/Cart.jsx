import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiPicnicTableBold } from "react-icons/pi";
import { RiTakeawayLine } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import Divider from "../../../components/ui/Divider";
import { useContext, useState } from "react";
// import Invoice from "../../../components/pdf/Invoice";
// import { PDFDownloadLink } from "@react-pdf/renderer";

import {
  FaCashRegister,
  FaCreditCard,
  FaMinus,
  FaPlus,
  FaPrint,
} from "react-icons/fa6";
import { FaMouse } from "react-icons/fa";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { useNotify } from "../../../context/NotifyContext";
import { Input, Select, TextArea } from "../../../components/ui/Input";
import { currencyIDR } from "../../../utils/currency";
import { useCart } from "../../../context/CartContext";

const Cart = () => {
  const {
    order,
    cartItems,
    totalQuantity,
    totalAmount,
    tax,
    totalAfterTax,
    createOrder,
    removeFromCart,
  } = useCart();
  const [payment, setPayment] = useState("Cash");
  const [activeModal, setactiveModal] = useState(null);
  const openModal = (type) => {
    setactiveModal(type);
  };
  const closeModal = () => setactiveModal(null);
  const tooglePayment = (pay) => setPayment(pay);
  console.log("cartItems:", cartItems);

  // customerName: "",
  //   orderType: "",
  //   tableNumber: 0,
  //   guestCount: 0,
  //   paymentType: "Cash",
  return (
    <>
      <div className="p-4 bg-surface rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-text text-xl">
            {order.tableNumber ? "Table " + order.tableNumber : "Not Selected"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => openModal("order")}
              className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full">
              <CiEdit size={24} className="text-primary" />
            </button>
            <button
              onClick={() => openModal("delete")}
              className="cursor-pointer p-2 border-2 border-border hover:bg-background rounded-full">
              <AiOutlineDelete size={24} className="text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-between ">
          {/* Minus Dinamis Order */}
          <div className="flex flex-col">
            <h2 className="text-base text-text-muted">Order #ODR007</h2>
            <h2 className="text-base text-text-muted">{order.customerName}</h2>
            <h2 className="text-base text-text-muted">{order.orderType}</h2>
          </div>
          <div className="flex gap-2 items-center justify-center text-text">
            {order.guestCount > 0 ? (
              <p>{order.guestCount}</p>
            ) : (
              <p className="text-text-muted">Not Set</p>
            )}
            <IoMdPeople size={24} />
          </div>
        </div>
        <Divider type="dashed" />
        <div className="flex justify-between">
          <h2 className="text-text text-xl">Ordered Items</h2>
          <div className="flex gap-2 text-text">
            <span className="text-lg text-text-muted">{totalQuantity}</span>
          </div>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex gap-2">
              <h2 className="text-text-muted text-lg">{item.quantity}</h2>
              <h2 className="text-text-muted text-lg">{item.dishname}</h2>
            </div>
            <div className="flex gap-2 text-text">
              <span className="text-lg text-text">
                {currencyIDR(item.price)}
              </span>
            </div>
          </div>
        ))}
        <Divider type="dashed" />
        <h2 className="text-text text-xl">Payment Summary</h2>
        <div className="flex justify-between">
          <div>
            <h2 className="text-text-muted text-lg">Sub Total</h2>
            <h2 className="text-text-muted text-lg">Tax</h2>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-text">
              {currencyIDR(totalAmount)}
            </span>
            <span className="text-lg text-text"> {currencyIDR(tax)}</span>
          </div>
        </div>
        <Divider type="dashed" />
        <div className="flex justify-between ">
          <h2 className="text-text text-xl">Total Pay</h2>
          <div className="flex gap-2 text-text">
            <span className="text-lg text-text">
              {" "}
              {currencyIDR(totalAfterTax)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-surface rounded-lg mt-4">
        <h2 className="text-text text-xl mb-2">Payment Method</h2>
        <div className="flex gap-2">
          <button
            onClick={() => tooglePayment("Cash")}
            className={`border-2 text-text ${
              payment === "Cash"
                ? "bg-primary/20 border-primary"
                : "border-border"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 px-4 py-2 rounded-xl`}>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="flex-1 font-semibold">
                <FaCashRegister />
              </span>
              <span className="flex-1 font-semibold">Cash</span>
            </div>
          </button>
          <button
            onClick={() => tooglePayment("Card")}
            className={`border-2 text-text ${
              payment === "Card"
                ? "bg-primary/20 border-primary"
                : "border-border"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 px-4 py-2 rounded-xl`}>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="flex-1 font-semibold">
                <FaCreditCard />
              </span>
              <span className="flex-1 font-semibold">Card</span>
            </div>
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <button className="flex flex-1 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg">
          <FaPrint />
        </button>
        <button className="flex flex-2 gap-2 justify-center items-center border-2 border-border cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg">
          <FaMouse />
          <span>Place Order</span>
        </button>
      </div>
      <ModalOrder
        createOrder={createOrder}
        isOpen={activeModal === "order"}
        onClose={closeModal}
      />
      <ModalDelete
        cartItems={cartItems}
        order={order}
        removeFromCart={removeFromCart}
        isOpen={activeModal === "delete"}
        onClose={closeModal}
      />
    </>
  );
};

export default Cart;

const ModalOrder = ({ isOpen, onClose, createOrder }) => {
  const { push } = useNotify();
  const [order, setOrder] = useState({
    customerName: "",
    orderType: "",
    tableNumber: 0,
    guestCount: 0,
    paymentType: "Cash",
  });

  const increment = () => {
    if (order.guestCount >= 8) return;
    setOrder({ ...order, guestCount: order.guestCount + 1 });
  };
  const decrement = () => {
    if (order.guestCount <= 0) return;
    setOrder({ ...order, guestCount: order.guestCount - 1 });
  };
  const handleCreate = () => {
    if (
      !order.customerName ||
      !order.orderType ||
      !order.tableNumber ||
      !order.paymentType
    ) {
      onClose();
      push({
        message: "Gagal membuat order!! Lengkapi semua field",
        type: "error",
      });
      return;
    }
    createOrder(order);
    onClose();
    push({ message: "Berhasil membuat order!", type: "success" });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Order">
      <div className="flex flex-col gap-2">
        <Input
          onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
          label="Customer Name"
          className="w-full text-text"
          placeholder="e.g. Udin"
        />
        <div>
          <label className="text-sm text-text/50">Order Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setOrder({ ...order, orderType: "Dine in" })}
              className={`flex ${
                order.orderType === "Dine in"
                  ? "bg-lime-600/10 border-lime-600"
                  : "border-lime-600/20"
              } border-2 flex-1 gap-2 justify-center items-center text-sm p-4 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out text-text`}>
              <PiPicnicTableBold size={20} />
              <span>Dine in</span>
            </button>
            <button
              onClick={() => setOrder({ ...order, orderType: "Take away" })}
              className={`flex ${
                order.orderType === "Take away"
                  ? "bg-violet-600/10 border-violet-600"
                  : "border-violet-600/20"
              } border-2 flex-1 gap-2 justify-center items-center text-sm p-4 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out text-text`}>
              <RiTakeawayLine size={20} />
              <span>Take away</span>
            </button>
          </div>
        </div>
        <Select
          onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
          label="Select Table"
          className="w-full text-text "
          placeholder="Select Table">
          <option className="bg-background text-text" value="1">
            Table 1
          </option>
          <option className="bg-background text-text" value="2">
            Table 2
          </option>
          <option className="bg-background text-text" value="3">
            Table 3
          </option>
          <option className="bg-background text-text" value="4">
            Table 4
          </option>
          <option className="bg-background text-text" value="5">
            Table 5
          </option>
        </Select>
        <div>
          <label className="block mb-2 text-sm font-medium text-[#ababab]">
            Guest
          </label>
          <div className="flex items-center justify-between bg-primary/30 px-4 py-3 rounded-lg">
            <button
              onClick={decrement}
              className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out">
              <FaMinus size={16} />
            </button>
            <span className="text-text">{order.guestCount} Person</span>
            <button
              onClick={increment}
              className="text-text cursor-pointer rounded-full p-2 border-2 border-border hover:border-primary bg-primary/20 hover:bg-primary/30 transition-colors duration-200 ease-in-out">
              <FaPlus size={16} />
            </button>
          </div>
        </div>
        <TextArea
          onChange={(e) => setOrder({ ...order, note: e.target.value })}
          label="Note"
          className="w-full text-text"
          placeholder="e.g. Please add extra cheese, No MSG, etc."
        />
        <div className="flex justify-end gap-2">
          <Button variant="delete" onClick={onClose} className="mt-2">
            Close
          </Button>
          <Button variant="confirm" onClick={handleCreate} className="mt-2">
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
const ModalDelete = ({ isOpen, onClose, removeFromCart, cartItems, order }) => {
  const { push } = useNotify();

  const handleClick = () => {
    const isOrderEmpty = !order || Object.keys(order).length === 0;

    if (cartItems.length === 0 && isOrderEmpty) {
      onClose();
      push({
        message: "Gagal menghapus order! Keranjang kosong.",
        type: "error",
      });
    } else {
      onClose();
      removeFromCart();
      push({ message: "Berhasil menghapus order!", type: "success" });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Delete Order">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-text">
              Are you sure you want to delete this order?
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={onClose} variant="delete">
              Cancel
            </Button>
            <Button onClick={handleClick} variant="confirm">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

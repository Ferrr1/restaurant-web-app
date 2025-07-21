import { AiOutlineDelete } from "react-icons/ai";
import { CiDesktopMouse2, CiEdit } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";
import Divider from "../ui/Divider";
import { useState } from "react";
import { FaCashRegister, FaCreditCard, FaPrint } from "react-icons/fa6";
import { FaMouse } from "react-icons/fa";

const Cart = () => {
  const [payment, setPayment] = useState("Cash");
  const tooglePayment = (pay) => setPayment(pay);
  const dataStatis = [
    {
      id: 1,
      name: "Nasi Goreng",
      price: 15000,
      quantity: 2,
    },
    {
      id: 2,
      name: "Sate Ayam",
      price: 20000,
      quantity: 1,
    },
    {
      id: 3,
      name: "Gado-Gado",
      price: 10000,
      quantity: 3,
    },
    {
      id: 4,
      name: "Mie Goreng",
      price: 12000,
      quantity: 2,
    },
    {
      id: 5,
      name: "Bakso",
      price: 25000,
      quantity: 1,
    },
  ];
  return (
    <>
      <div className="p-4 bg-foreground rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-text text-xl">Table No #04</h2>
          <div className="flex gap-2 text-text">
            <button className="cursor-pointer p-2 border-2 border-background/60 hover:bg-background rounded-full">
              <CiEdit size={24} />
            </button>
            <button className="cursor-pointer p-2 border-2 border-background/60 hover:bg-background rounded-full">
              <AiOutlineDelete size={24} className="text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-between ">
          <h2 className="text-base text-slate-400">Order #ODR007</h2>
          <div className="flex gap-2 items-center justify-center text-text">
            <p>3</p>
            <IoMdPeople size={24} />
          </div>
        </div>
        <Divider type="dashed" />
        <div className="flex justify-between">
          <h2 className="text-text text-xl">Ordered Items</h2>
          <div className="flex gap-2 text-text">
            <span className="text-lg text-slate-400">05</span>
          </div>
        </div>
        {dataStatis.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex gap-2">
              <h2 className="text-slate-400 text-lg">{item.quantity}</h2>
              <h2 className="text-slate-400 text-lg">{item.name}</h2>
            </div>
            <div className="flex gap-2 text-text">
              <span className="text-lg text-text">Rp. {item.price}</span>
            </div>
          </div>
        ))}
        <Divider type="dashed" />
        <h2 className="text-text text-xl">Payment Summary</h2>
        <div className="flex justify-between">
          <div>
            <h2 className="text-slate-400 text-lg">Sub Total</h2>
            <h2 className="text-slate-400 text-lg">Tax</h2>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-text">Rp. 50000</span>
            <span className="text-lg text-text">Rp. 50000</span>
          </div>
        </div>
        <Divider type="dashed" />
        <div className="flex justify-between ">
          <h2 className="text-text text-xl">Total Pay</h2>
          <div className="flex gap-2 text-text">
            <span className="text-lg text-text">Rp. 100000</span>
          </div>
        </div>
        <Divider type="dashed" />
        <h2 className="text-text text-xl mb-2">Payment Summary</h2>
        <div className="flex gap-2">
          <button
            onClick={() => tooglePayment("Cash")}
            className={`border-1 text-text ${
              payment === "Cash"
                ? "bg-primary/20 border-primary"
                : "border-background/60"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 px-4 py-2 rounded-xl`}
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="flex-1 font-semibold">
                <FaCashRegister />
              </span>
              <span className="flex-1 font-semibold">Cash</span>
            </div>
          </button>
          <button
            onClick={() => tooglePayment("Card")}
            className={`border-1 text-text ${
              payment === "Card"
                ? "bg-primary/20 border-primary"
                : "border-background/60"
            } cursor-pointer snap-center flex-shrink-0 flex gap-2 px-4 py-2 rounded-xl`}
          >
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
        <button className="flex flex-1 gap-2 justify-center items-center border-1 border-foreground cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg">
          <FaPrint />
          <span>Print</span>
        </button>
        <button className="flex flex-2 gap-2 justify-center items-center border-1 border-foreground cursor-pointer bg-primary hover:bg-primary/80 transition-colors duration-200 ease-in-out text-text-accent p-2 rounded-lg">
          <FaMouse />
          <span>Place Order</span>
        </button>
      </div>
    </>
  );
};

export default Cart;

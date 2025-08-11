// Invoice.jsx
import React from "react";
import { currencyIDR } from "../../utils/currency";

const Invoice = React.forwardRef(
  (
    {
      order,
      cartItems,
      // totalQuantity,
      totalAmount,
      tax,
      totalAfterTax,
      // payment,
      // currencyIDR,
    },
    ref
  ) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div ref={ref} className="Invoice">
        <div className="center bold">TOKO MAJU JAYA</div>
        <div className="center">Jl. Contoh No. 123</div>
        <div className="center">Telp: 0812-3456-7890</div>
        <hr />
        <div>Customer: {order.customerName || "-"}</div>
        <div>Order Type: {order.orderType || "-"}</div>
        {order.orderType === "Dine in" && (
          <div>Table: {order.tableNumber || "-"}</div>
        )}
        <div>Tanggal: {formattedDate}</div>
        <div>Waktu: {formattedTime}</div>
        <hr />
        {cartItems?.map((item, i) => (
          <div key={i}>
            {item.dishname} x{item.quantity}{" "}
            <span style={{ float: "right" }}>
              {currencyIDR(item.price * item.quantity)}
            </span>
          </div>
        ))}
        <hr />
        <div>
          Sub Total{" "}
          <span style={{ float: "right" }}>{currencyIDR(totalAmount)}</span>
        </div>
        <div>
          Tax <span style={{ float: "right" }}>{currencyIDR(tax)}</span>
        </div>
        <div style={{ fontWeight: "bold" }}>
          Total{" "}
          <span style={{ float: "right" }}>{currencyIDR(totalAfterTax)}</span>
        </div>

        <div className="center">-- Terima Kasih --</div>
      </div>
    );
  }
);

export default Invoice;

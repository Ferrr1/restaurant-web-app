// Invoice.jsx
import React from "react";
import { currencyIDR } from "../../utils/currency";
import "./InvoiceStyles.css";

const Invoice = React.forwardRef(
  (
    {
      order,
      cartItems,
      // totalQuantity,
      totalAmount,
      tax,
      totalAfterTax,
      payment,
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
      <div ref={ref} className="invoice-container">
        <div className="invoice-head">
          <div className="resto-title">RESTO WEB APP</div>
          <div className="address-invoice">Jl. Contoh No. 123</div>
          <div className="phone-number">Telp: 0812-3456-7890</div>
        </div>
        <hr />
        <div className="customer-info">
          <div className="order-info">Order: {order.orderType || "-"}</div>
          <div className="customer-name">
            Customer: {order.customerName || "-"}
          </div>
          {order.orderType === "Dine in"}
          <div className="time-info">Waktu: {formattedTime}</div>
          <div className="time-info">Table: {order.tableNumber || "-"}</div>
          <div className="date-info">Tanggal: {formattedDate}</div>
          <div className="time-info">Payment: {payment}</div>
        </div>
        <hr />
        {cartItems?.map((item, i) => (
          <div key={i}>
            {item.dishname} x{item.quantity}{" "}
            <span>{currencyIDR(item.price * item.quantity)}</span>
          </div>
        ))}
        <hr />
        <div>
          Sub Total <span>{currencyIDR(totalAmount)}</span>
        </div>
        <div>
          Tax <span>{currencyIDR(tax)}</span>
        </div>
        <div className="final-total">
          Total <span>{currencyIDR(totalAfterTax)}</span>
        </div>
        <hr />
        <div className="note">Noted: {order.note || "-"}</div>
        <hr />
        <div className="footer-section">-- Terima Kasih --</div>
      </div>
    );
  }
);

export default Invoice;

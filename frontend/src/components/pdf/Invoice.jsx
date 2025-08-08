// components/pdf/InvoiceDocument.jsx
import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import styles from "./InvoiceStyles";

// Fungsi manual format angka ke format Rp
const formatRupiah = (value) => {
  const number = Number(value) || 0;
  return `Rp ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const Invoice = ({
  order = {},
  cartItems = [],
  totalAmount = 0,
  tax = 0,
  totalAfterTax = 0,
  payment = "Not Set",
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>INVOICE</Text>

      <View style={styles.section}>
        <Text>Order ID: {order.id || "ODR007"}</Text>
        <Text>Table: {order.tableNumber || "Not Selected"}</Text>
        <Text>Guest Count: {order.guestCount || "Not Set"}</Text>
        <Text>Payment Method: {payment}</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.subtitle}>Ordered Items:</Text>
        {cartItems.length === 0 ? (
          <Text>Tidak ada item yang dipesan.</Text>
        ) : (
          cartItems.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text>
                {item.quantity || 0}x {item.name || "Unknown Item"}
              </Text>
              <Text>{formatRupiah(item.price)}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.summary}>
        <Text>Subtotal: {formatRupiah(totalAmount)}</Text>
        <Text>Tax: {formatRupiah(tax)}</Text>
        <Text style={styles.total}>Total: {formatRupiah(totalAfterTax)}</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;

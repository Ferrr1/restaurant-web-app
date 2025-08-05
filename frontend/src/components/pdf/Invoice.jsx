// components/pdf/InvoiceDocument.jsx
import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import styles from "./InvoiceStyles";

const Invoice = ({
  order,
  cartItems,
  totalAmount,
  tax,
  totalAfterTax,
  payment,
}) => (
  <Document>
    <Page size={{ width: 165, height: 600 }} style={styles.page}>
      <Text style={styles.title}>INVOICE</Text>

      <View style={styles.section}>
        <Text>Order ID: ODR007</Text>
        <Text>Table: {order.tableNumber || "Not Selected"}</Text>
        <Text>Guest Count: {order.guestCount || "Not Set"}</Text>
        <Text>Payment Method: {payment}</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.subtitle}>Ordered Items:</Text>
        {cartItems.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text>
              {item.quantity}x {item.name}
            </Text>
            <Text>Rp {item.price.toLocaleString()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text>Subtotal: Rp {totalAmount.toLocaleString()}</Text>
        <Text>Tax: Rp {tax.toLocaleString()}</Text>
        <Text style={styles.total}>
          Total: Rp {totalAfterTax.toLocaleString()}
        </Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;

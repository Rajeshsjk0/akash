import React, { useEffect, useState } from "react";

import "./ListTransaction.css";
import TransactionTable from "../../components/transactionTable/TransactionTable";

import { apiCall } from "../../utils/apiCall";

const ListTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/transactions"
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching transactions");
        }
        const data = await response.json();
        setTransactions([...data]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="trasaction-form-container">
      <TransactionTable
        key={JSON.stringify(transactions)}
        transactions={transactions}
      />
    </div>
  );
};

export default ListTransaction;

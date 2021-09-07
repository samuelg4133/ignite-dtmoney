import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionsContextProps = {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

const TransactionsContext = createContext({} as TransactionsContextProps);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((res) => {
      setTransactions(res.data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

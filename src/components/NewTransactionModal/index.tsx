import React, { FormEvent, useState } from "react";

import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

type TransactionType = "deposit" | "withdraw";

Modal.setAppElement("#root");

const NewTransactionModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<TransactionType>("deposit");

  const handleCreateNewTransaction = async (
    event: FormEvent
  ): Promise<void> => {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category,
    });
    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <fieldset>
          <legend>
            <h2>Cadastrar Transação</h2>
          </legend>
          <input
            type="text"
            placeholder="Título"
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            onChange={(event) => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
              }}
              isActive={type === "deposit"}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => {
                setType("withdraw");
              }}
              isActive={type === "withdraw"}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            type="text"
            placeholder="Categoria"
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </fieldset>
      </Container>
    </Modal>
  );
};

export { NewTransactionModal };

import { useState } from "react";
import {
  MESSAGE_SAMPLE,
  PERSONAL_SIGN_MESSAGE_SAMPLE,
  PLAY_APP_MESSAGE_SAMPLE,
  PLAY_APP_TRANSACTION_SAMPLE,
  TRANSACTION_SAMPLE,
} from "../data/sampleData";

export const useMessage = () => {
  const [message, setMessage] = useState(MESSAGE_SAMPLE);
  const [transaction, setTransaction] = useState(TRANSACTION_SAMPLE);
  const [personSignMessage, setPersonalSignMessage] = useState(
    PERSONAL_SIGN_MESSAGE_SAMPLE
  );
  const [playMessage, setPlayMessage] = useState<string>(
    PLAY_APP_MESSAGE_SAMPLE
  );
  const [playTransaction, setPlayTransaction] = useState<string>(
    PLAY_APP_TRANSACTION_SAMPLE
  );

  return {
    message,
    setMessage,
    transaction,
    setTransaction,
    personSignMessage,
    setPersonalSignMessage,
    playMessage,
    setPlayMessage,
    playTransaction,
    setPlayTransaction,
  };
};

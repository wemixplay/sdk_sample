import { useState } from "react";

const initialWallets = {
  unawallet: false,
  wemixwallet: false,
  playwallet: false,
  playwalletwc: false,
  wemixplayapp: true,
};

export type SupportedWalletType = keyof typeof initialWallets;

export const useWallet = () => {
  const [wallets, setWallets] = useState(initialWallets);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallets({
      ...wallets,
      [event.target.name]: event.target.checked,
    });
  };

  const getSupportedWallets = () => {
    return Object.keys(wallets).filter(
      (key): key is SupportedWalletType => wallets[key as SupportedWalletType]
    );
  };

  return {
    wallets,
    handleCheckBox,
    getSupportedWallets,
  };
};

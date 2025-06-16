import { useState } from "react";
import { ENVIRONMENTS, Environment } from "./useEnvironment";
import { SupportedWalletType } from "./useWallet";

export interface IWemixInstance {
  isConnected: boolean;
  connectedWallet: string;
  address: string;
  chainId: number;
  connect: (chainId: number) => Promise<any>;
  forcedConnect: (chainId: number) => Promise<any>;
  disconnect: () => Promise<void>;
  signMessage: (data: string) => Promise<any>;
  personalSignMessage: (data: string) => Promise<any>;
  signTransaction: (data: string) => Promise<any>;
  playSignMessage: (data: string) => Promise<any>;
  playSignTransaction: (data: string, chainName: string) => Promise<any>;
  switchChain: (chainId: number) => Promise<void>;
}

export const useWemix = (
  environment: string,
  supportedWallet: SupportedWalletType[]
) => {
  const [wemixInstance, setWemixInstance] = useState<IWemixInstance>();
  const [result, setResult] = useState("");

  const initialize = () => {
    window.Wemix.initialize({
      ...ENVIRONMENTS[environment as Environment],
      supportedWallet,
      log: "debug",
    })
      .then((res) => {
        setWemixInstance(res);
      })
      .catch((err) => {
        setResult(err);
      });
  };

  const connect = async (chainId: number) => {
    wemixInstance
      ?.connect(chainId)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const forcedConnect = async (chainId: number) => {
    wemixInstance
      ?.forcedConnect(chainId)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const disconnect = () => {
    wemixInstance
      ?.disconnect()
      .then(() => {
        setResult("successfully disconnected.");
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const signMessage = async (data: string) => {
    wemixInstance
      ?.signMessage(data)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const personalSignMessage = async (data: string) => {
    wemixInstance
      ?.personalSignMessage(data)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const signTransaction = async (data: string) => {
    wemixInstance
      ?.signTransaction(data)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const playSignMessage = async (data: string) => {
    wemixInstance
      ?.playSignMessage(data)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const playSignTransaction = async (data: string, chainName: string) => {
    wemixInstance
      ?.playSignTransaction(data, chainName)
      .then((res) => {
        setResult(JSON.stringify(res, null, 4));
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  const switchChain = async (chainId: number) => {
    wemixInstance
      ?.switchChain(chainId)
      .then(() => {
        setResult("successfully switched chain.");
      })
      .catch((err) => {
        setResult(JSON.stringify(err, null, 4));
      });
  };

  return {
    wemixInstance,
    result,
    initialize,
    connect,
    forcedConnect,
    disconnect,
    signMessage,
    personalSignMessage,
    signTransaction,
    playSignMessage,
    playSignTransaction,
    switchChain,
  };
};

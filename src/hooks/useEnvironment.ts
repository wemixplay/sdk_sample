import { ChangeEvent, useState } from "react";

const ENVIRONMENTS = {
  stage: {
    clientId: "1143-zxfrebsyb0dg09r3.apps.wemixnetwork.com",
    baseUrl: "https://stg-sdk.wemixnetwork.com",
  },
};

type Environment = keyof typeof ENVIRONMENTS;

export const useEnvironment = () => {
  const [environment, setEnvironment] = useState<Environment>("stage");
  const [chainId, setChainId] = useState(1112);
  const [chainName, setChainName] = useState<string>("tornado");

  const handleChangeEnvironment = (event: ChangeEvent<HTMLInputElement>) => {
    setEnvironment((event.target as HTMLInputElement).value as Environment);
  };

  return {
    environment,
    chainId,
    chainName,
    setChainName,
    handleChangeEnvironment,
  };
};

export default useEnvironment;
export { ENVIRONMENTS };
export type { Environment };

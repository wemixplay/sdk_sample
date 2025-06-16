declare interface Window {
  Wemix: {
    initialize: (config: IWemixConfig) => Promise<IWemixInstance>;
    isInitialized: boolean;
  };
}

const SUPPORTED_WALLET = Object.freeze({
  UNA: "una",
  UNA_WALLET: "unawallet",
  WEMIX_WALLET: "wemixwallet",
  METAMASK: "metamask",
  PLAY_WALLET: "playwallet",
  PLAY_WALLET_WC: "playwalletwc",
  WEMIX_PLAY_APP: "wemixplayapp",
});

type SupportedWalletType =
  (typeof SUPPORTED_WALLET)[keyof typeof SUPPORTED_WALLET];

const WEMIX_LANGUAGE = Object.freeze({
  KOREAN: "ko",
  ENGLISH: "en",
  CHINESE_SIMPLIFIED: "zh-Hans",
  CHINESE_TRADITIONAL: "zh-Hant",
  JAPANESE: "ja",
  THAI: "th",
  SPANISH: "es",
  PORTUGUESE: "pt",
  RUSSIAN: "ru",
});

type WemixLanguageType = (typeof WEMIX_LANGUAGE)[keyof typeof WEMIX_LANGUAGE];

const WEMIX_THEME = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

type WemixThemeType = (typeof WEMIX_THEME)[keyof typeof WEMIX_THEME];

type LogLevelNames = "trace" | "debug" | "info" | "warn" | "error";

/**
 * @description wemix sdk config
 * @field clientId wemix client id
 * @field supportedWallet supported wallet type
 * @field baseUrl base url
 * @field log log level
 */
interface IWemixConfig {
  clientId: string;
  supportedWallet: SupportedWalletType[];
  baseUrl: string;
  log?: "silent" | LogLevelNames;
}

interface IConnectResult {
  address: string;
  wallet: string;
  chainId: number;
}

interface ISignResult {
  signature: string;
  rawTx: string;
  rawData: string;
}

interface IWemixInstance {
  isConnected: boolean;
  address: string;
  connectedWallet: SupportedWalletType | "";
  chainId: number;

  setLanguage(lang: WemixLanguageType): void;
  setTheme(theme: WemixThemeType): void;

  connect(chainId: number): Promise<IConnectResult>;
  forcedConnect(chainId: number): Promise<IConnectResult>;
  disconnect(): Promise<void>;
  switchChain(chainId: number): Promise<void>;

  signMessage(message: string): Promise<ISignResult>;
  signTransaction(transaction: string): Promise<ISignResult>;
  personalSignMessage(message: string): Promise<ISignResult>;

  playSignMessage(message: string): Promise<ISignResult>;
  playSignTransaction(
    transaction: string,
    chainName: string
  ): Promise<ISignResult>;
}

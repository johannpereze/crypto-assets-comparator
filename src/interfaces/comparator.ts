import { GetRatesResp } from "./tatum";

export interface RatesLocalStorageData {
  rates: GetRatesResp[];
  dueTimestamp: number;
}

export interface Token {
  name: string;
  symbol: string;
  address: string | null;
  id: string;
}

export interface WalletInfo {
  name: string;
  balance: string;
  symbol: string;
  id: string;
}

export interface SelectedAssets {
  a: string | null;
  b: string | null;
}

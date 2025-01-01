import { GetRatesResp } from "./tatum";

export interface RatesLocalStorageData {
  rates: GetRatesResp[];
  dueTimestamp: number;
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
}
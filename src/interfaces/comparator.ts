import { GetRatesResp } from "./tatum";

export interface RatesLocalStorageData {
  rates: GetRatesResp[];
  dueTimestamp: number;
}

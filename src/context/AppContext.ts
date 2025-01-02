import type {
  RatesLocalStorageData,
  WalletInfo,
} from "@/interfaces/comparator";
import { createContext } from "react";

interface AppContextType {
  walletInfo: WalletInfo[];
  rates: RatesLocalStorageData;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

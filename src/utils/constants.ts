import { Token } from "../interfaces/comparator";

export const tatumFetchExpirationInMinutes =
  import.meta.env.VITE_TATUM_FETCH_EXPIRATION_IN_MINUTES || 1;

export const tokenData: Token[] = [
  {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  {
    name: "SHIBA INU",
    symbol: "SHIB",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  },
  {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
];
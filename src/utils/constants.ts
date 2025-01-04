import { Token } from "../interfaces/comparator";

export const tatumFetchExpirationInMinutes =
  import.meta.env.VITE_TATUM_FETCH_EXPIRATION_IN_MINUTES || 1;

export const tokenData: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    id: "ethereum",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    id: "usd-coin",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    id: "binancecoin",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    id: "binance-usd",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    id: "wrapped-bitcoin",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    id: "uniswap",
  },
  {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    id: "chainlink",
  },
];

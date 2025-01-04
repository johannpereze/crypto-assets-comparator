import { tatumFetchExpirationInMinutes } from "@/utils/constants";
import { useLocalStorage } from "usehooks-ts";
import {
  coinGeckoMarketChartEndpointA,
  coinGeckoMarketChartEndpointB,
} from "../config/endpoints";

const secondsInAYear = 31536000;

export interface MarketLocalStorageData {
  [key: string]: {
    prices: [number, number][];
    dueTimestamp: number;
  };
}

export default function useGetMarketChartRange() {
  const [value, setValue] = useLocalStorage<MarketLocalStorageData>(
    "marketData",
    {}
  );

  const fetchRates = async (id: string) => {
    if (
      value[id]?.dueTimestamp &&
      value[id]?.dueTimestamp > new Date().getTime()
    ) {
      return;
    }
    const headers = new Headers();
    headers.append("x-api-key", import.meta.env.VITE_COIN_GECKO_API_KEY || "");
    headers.append("accept", "application/json");

    const params = new URLSearchParams({
      vs_currency: "usd",
      from: String(Math.floor(new Date().getTime() / 1000) - secondsInAYear), // Date from a year ago in Unix time
      to: String(Math.floor(new Date().getTime() / 1000)), // Current date in Unix time
      precision: "2",
    });
    try {
      const response = await fetch(
        `${coinGeckoMarketChartEndpointA}${id}${coinGeckoMarketChartEndpointB}?${params.toString()}`,
        {
          method: "GET",
          headers,
        }
      );

      if (response.status !== 200) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();

      // Adds a predetermined amount of minutes to the current date
      const dueDate = new Date();
      dueDate.setMinutes(dueDate.getMinutes() + tatumFetchExpirationInMinutes);

      setValue({
        ...value,
        [id]: { prices: data.prices, dueTimestamp: dueDate.getTime() },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { fetchRates };
}

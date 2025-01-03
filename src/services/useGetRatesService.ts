import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { tatumRateEndpoint } from "../config/endpoints";
import { RatesLocalStorageData } from "../interfaces/comparator";
import { tatumFetchExpirationInMinutes } from "../utils/constants";

const testingAssets = [
  {
    basePair: "USD",
    currency: "BTC",
    batchId: "1",
  },
  {
    basePair: "USD",
    currency: "ETH",
    batchId: "1",
  },
  {
    basePair: "USD",
    currency: "USDC",
    batchId: "1",
  },
];

export default function useGetRatesService() {
  const [value, setValue] = useLocalStorage<RatesLocalStorageData>("apiData", {
    rates: [],
    dueTimestamp: 0,
  });

  const fetchRates = async () => {
    const headers = new Headers();
    headers.append("x-api-key", import.meta.env.VITE_TATUM_API_KEY || "");
    headers.append("accept", "application/json");
    headers.append("content-type", "application/json");

    const body = testingAssets; // TODO: Replace with real data

    try {
      const response = await fetch(tatumRateEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (response.status !== 201) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();

      // Adds a predetermined amount of minutes to the current date
      const dueDate = new Date();
      dueDate.setMinutes(dueDate.getMinutes() + tatumFetchExpirationInMinutes);

      setValue({ rates: data, dueTimestamp: dueDate.getTime() });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchHistorical = async () => {
    const headers = new Headers();
    headers.append("x-api-key", import.meta.env.VITE_TATUM_API_KEY || "");
    headers.append("accept", "application/json");
    headers.append("content-type", "application/json");

    // const body = testingAssets; // TODO: Replace with real data

    try {
      const response = await fetch(
        `https://api.tatum.io/v3/tatum/marketdata/historical?symbol=BTC&interval=1day&start=1609459200&end=1640995200`,
        {
          method: "GET",
          headers,
          // body: JSON.stringify(body),
        }
      );

      // if (response.status !== 201) {
      //   throw new Error("Error fetching data");
      // }
      const data = await response.json();
      console.log("🚀 ~ fetchHistorical ~ data:", data);

      // Adds a predetermined amount of minutes to the current date
      // const dueDate = new Date();
      // dueDate.setMinutes(dueDate.getMinutes() + tatumFetchExpirationInMinutes);

      // setValue({ rates: data, dueTimestamp: dueDate.getTime() });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const storedData = value;

    if (!storedData || !storedData.dueTimestamp) {
      fetchRates();
    } else {
      const dueDate = new Date(storedData.dueTimestamp);

      if (dueDate < new Date()) {
        fetchRates();
      }
    }
    fetchHistorical();
  }, [setValue]);

  return { rates: value };
}

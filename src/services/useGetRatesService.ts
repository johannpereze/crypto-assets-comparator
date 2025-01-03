import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { tatumRateEndpoint } from "../config/endpoints";
import { RatesLocalStorageData } from "../interfaces/comparator";
import { tatumFetchExpirationInMinutes, tokenData } from "../utils/constants";

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

    const body = tokenData.map((token) => ({
      basePair: "USD",
      currency: token.symbol,
      batchId: "1",
    }));

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
  }, [setValue]);

  return { rates: value };
}

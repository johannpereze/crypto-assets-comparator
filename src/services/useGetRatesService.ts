import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const minutesBeforeExpiration = 1;

export default function useGetRatesService() {
  const [value, setValue] = useLocalStorage<any>("apiData", {});
  console.log("🚀 ~ App ~ value:", value);
  const fetchRates = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const data = await response.json();

      // Adds a predetermined amount of minutes to the current date
      const dueDate = new Date();
      dueDate.setMinutes(dueDate.getMinutes() + minutesBeforeExpiration);

      data.dueTimestamp = dueDate.getTime();

      setValue(data);
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

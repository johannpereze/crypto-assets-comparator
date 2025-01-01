import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [value, setValue] = useLocalStorage("apiData", "");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => setValue(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return <>{JSON.stringify(value, null, 2)}</>;
}

export default App;

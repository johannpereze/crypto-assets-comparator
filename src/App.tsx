import useGetRatesService from "./services/useGetRatesService";

function App() {
  const { rates } = useGetRatesService();

  return <pre>{JSON.stringify(rates, null, 2)}</pre>;
}

export default App;

import useGetRatesService from "./services/useGetRatesService";
import useGetWalletInfoService from "./services/useGetWalletInfoService.ts";

function App() {
  const { rates } = useGetRatesService();
  const { walletInfo } = useGetWalletInfoService();
  console.log("🚀 ~ App ~ walletInfo:", walletInfo);

  return <pre>{JSON.stringify(rates, null, 2)}</pre>;
}

export default App;

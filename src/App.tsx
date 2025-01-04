import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Chart } from "./components/Chart.tsx";
import MainCard from "./components/MainCard.tsx";
import MainLayout from "./components/MainLayout.tsx";
import SelectorCard from "./components/SelectorCard.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { AppContext } from "./context/AppContext.ts";
import { SelectedAssets } from "./interfaces/comparator.ts";
import useGetMarketChartRange, {
  MarketLocalStorageData,
} from "./services/useGetMarketChartRange.ts";
import useGetRatesService from "./services/useGetRatesService";
import useGetWalletInfoService from "./services/useGetWalletInfoService.ts";

const id = "ethereum";

function App() {
  const [value] = useLocalStorage<MarketLocalStorageData>("marketData", {});
  const { rates } = useGetRatesService();
  const { walletInfo } = useGetWalletInfoService();
  const { fetchRates } = useGetMarketChartRange();
  const [selectedAssets, setSelectedAssets] = useState<SelectedAssets>({
    a: null,
    b: null,
  });
  console.log("🚀 ~ App ~ selectedAssets:", selectedAssets);
  console.log("🚀 ~ App ~ walletInfo:", walletInfo);

  useEffect(() => {
    if (
      !value[id]?.dueTimestamp ||
      value[id]?.dueTimestamp < new Date().getTime()
    ) {
      fetchRates(id);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContext.Provider value={{ walletInfo, rates }}>
        <MainLayout>
          <MainCard />
          <SelectorCard
            selectedAssets={selectedAssets}
            setSelectedAssets={setSelectedAssets}
          />
          <Chart />
        </MainLayout>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;

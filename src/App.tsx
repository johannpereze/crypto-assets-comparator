import { useState } from "react";
import { Chart } from "./components/Chart.tsx";
import MainCard from "./components/MainCard.tsx";
import MainLayout from "./components/MainLayout.tsx";
import SelectorCard from "./components/SelectorCard.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { AppContext } from "./context/AppContext.ts";
import { SelectedAssets } from "./interfaces/comparator.ts";
import useGetRatesService from "./services/useGetRatesService";
import useGetWalletInfoService from "./services/useGetWalletInfoService.ts";

function App() {
  const { rates } = useGetRatesService();
  const { walletInfo } = useGetWalletInfoService();
  const [selectedAssets, setSelectedAssets] = useState<SelectedAssets>({
    a: null,
    b: null,
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContext.Provider value={{ walletInfo, rates }}>
        <MainLayout>
          <MainCard />
          <SelectorCard
            selectedAssets={selectedAssets}
            setSelectedAssets={setSelectedAssets}
          />
          <Chart selectedAssets={selectedAssets} />
        </MainLayout>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;

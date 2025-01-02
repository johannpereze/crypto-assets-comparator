import MainCard from "./components/MainCard.tsx";
import MainLayout from "./components/MainLayout.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import useGetRatesService from "./services/useGetRatesService";
import useGetWalletInfoService from "./services/useGetWalletInfoService.ts";

function App() {
  const { rates } = useGetRatesService();
  const { walletInfo } = useGetWalletInfoService();
  console.log("🚀 ~ App ~ walletInfo:", walletInfo);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        <MainCard />
      </MainLayout>
      <pre>{JSON.stringify(rates, null, 2)}</pre>)
    </ThemeProvider>
  );
}

export default App;

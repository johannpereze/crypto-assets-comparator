import { ModeToggle } from "./components/ModeToggle.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import useGetRatesService from "./services/useGetRatesService";
import useGetWalletInfoService from "./services/useGetWalletInfoService.ts";

function App() {
  const { rates } = useGetRatesService();
  const { walletInfo } = useGetWalletInfoService();
  console.log("🚀 ~ App ~ walletInfo:", walletInfo);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <pre>{JSON.stringify(rates, null, 2)}</pre>)
    </ThemeProvider>
  );
}

export default App;

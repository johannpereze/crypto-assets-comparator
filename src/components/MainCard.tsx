import { AppContext } from "@/context/AppContext";
import { RatesLocalStorageData } from "@/interfaces/comparator";
import { useContext } from "react";
import { Avatar } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function MainCard() {
  const { walletInfo, rates } = useContext(AppContext);
  console.log("🚀 ~ MainCard ~ rates:", rates);
  const availableCoins = walletInfo.filter((coin) => coin.balance !== "0.0");

  const getUSDValue = (
    symbol: string,
    balance: string,
    rates: RatesLocalStorageData
  ) => {
    console.log("🚀 ~ MainCard ~ balance:", parseFloat(balance));
    const rate = rates.rates.find((rate) => rate.id === symbol);
    if (!rate) {
      return "0.00";
    }
    console.log("🚀 ~ MainCard ~ rates:", rate.value);
    const balanceNumber = parseFloat(balance);
    const rateNumber = parseFloat(rate.value);
    return (balanceNumber * rateNumber).toFixed(2);
  };
  return (
    <div className="flex justify-center w-full p-4">
      <div className="min-w-[16rem] max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Your Portfolio</CardTitle>
            <CardDescription>Available Assets</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {availableCoins.map(({ name, symbol, balance }) => (
              <div
                className="flex items-center gap-2 justify-between"
                key={name}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <i className={`cf cf-${symbol.toLowerCase()} text-4xl`}></i>
                  </Avatar>
                  <p className="text-lg font-semibold">{name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold">
                    $ {getUSDValue(symbol, balance, rates)} USD
                  </p>
                  <p className="text-sm text-gray-400">
                    {balance} {symbol}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>footer</CardFooter>
        </Card>
      </div>
    </div>
  );
}

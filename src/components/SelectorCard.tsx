import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { CoinsComboBox } from "./CoinsComboBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function SelectorCard() {
  const { walletInfo, rates } = useContext(AppContext);
  console.log("🚀 ~ MainCard ~ walletInfo:", walletInfo);
  console.log("🚀 ~ MainCard ~ rates:", rates);

  return (
    <div className="flex justify-center w-full p-4">
      <div className="min-w-[16rem] max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Compare Currencies</CardTitle>
            <CardDescription>Select Assets</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="font-thin text-sm mb-1">Asset A</p>
              <CoinsComboBox />
            </div>
            <div className="flex-1">
              <p className="font-thin text-sm mb-1">Asset B</p>
              <CoinsComboBox />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { SelectedAssets } from "@/interfaces/comparator";
import { Dispatch, SetStateAction } from "react";
import { CoinsComboBox } from "./CoinsComboBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface SelectorCardProps {
  selectedAssets: SelectedAssets;
  setSelectedAssets: Dispatch<SetStateAction<SelectedAssets>>;
}

export default function SelectorCard({
  selectedAssets,
  setSelectedAssets,
}: SelectorCardProps) {
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
              <CoinsComboBox
                value={selectedAssets.a}
                setValue={setSelectedAssets}
                name="a"
              />
            </div>
            <div className="flex-1">
              <p className="font-thin text-sm mb-1">Asset B</p>
              <CoinsComboBox
                value={selectedAssets.b}
                setValue={setSelectedAssets}
                name="b"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

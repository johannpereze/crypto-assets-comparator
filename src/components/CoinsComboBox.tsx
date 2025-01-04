import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppContext } from "@/context/AppContext";
import { SelectedAssets } from "@/interfaces/comparator";
import { cn } from "@/lib/utils";
import useGetMarketChartRange from "@/services/useGetMarketChartRange";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface CoinsComboBoxProps {
  value: string | null;
  setValue: Dispatch<SetStateAction<SelectedAssets>>;
  name: string;
}

export function CoinsComboBox({ value, setValue, name }: CoinsComboBoxProps) {
  const [open, setOpen] = useState(false);
  const { walletInfo } = useContext(AppContext);
  const { fetchRates } = useGetMarketChartRange();
  const options = walletInfo.map((info) => ({
    value: info.id,
    label: info.name,
  }));

  const handleSelect = (currentValue: string) => {
    setValue((prev) => ({
      ...prev,
      [name]: currentValue === value ? "" : currentValue,
    }));
    setOpen(false);
    fetchRates(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

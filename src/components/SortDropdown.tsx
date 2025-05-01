
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  onSortChange: (sortBy: string) => void;
  selectedSort: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, selectedSort }) => {
  const options = [
    { value: "default", label: "Our top picks" },
    { value: "price-asc", label: "Price (lowest first)" },
    { value: "price-desc", label: "Price (highest first)" },
    { value: "rating-desc", label: "Rating (highest first)" },
    { value: "rating-asc", label: "Rating (lowest first)" },
  ];

  return (
    <div className="flex items-center justify-end w-full">
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-52 bg-white border rounded-full">
          <div className="flex items-center">
            <ArrowUpDown size={14} className="mr-2" />
            <span>Sort by: </span>
            <SelectValue placeholder="Our top picks" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;

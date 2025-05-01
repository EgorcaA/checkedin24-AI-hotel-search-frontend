import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Hotel } from "@/types/hotel";

interface FilterSidebarProps {
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number | null) => void;
  selectedRating: number | null;
  minPrice: number;
  maxPrice: number;
  absoluteMinPrice: number;
  absoluteMaxPrice: number;
  hotels: Hotel[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onPriceChange,
  onRatingChange,
  selectedRating,
  minPrice,
  maxPrice,
  absoluteMinPrice,
  absoluteMaxPrice,
  hotels,
}) => {
  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    onPriceChange(min, max);
  };

  return (
    <div className="w-full space-y-8 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center justify-between">
          Price per night
          <span className="text-xs font-normal text-gray-500">▲</span>
        </h3>
        <div className="pt-4 px-2">
          <div className="flex justify-between mb-4">
            <div className="border rounded-md p-2 w-24 text-center">
              {minPrice} {absoluteMaxPrice > 0 ? "$" : ""}
            </div>
            <div className="border rounded-md p-2 w-24 text-center">
              {maxPrice} {absoluteMaxPrice > 0 ? "$" : ""}
            </div>
          </div>
          <Slider
            value={[minPrice, maxPrice]}
            min={absoluteMinPrice}
            max={absoluteMaxPrice}
            step={10}
            onValueChange={handlePriceChange}
            className="my-6"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center justify-between">
          Rating
          <span className="text-xs font-normal text-gray-500">▲</span>
        </h3>
        <RadioGroup
          value={selectedRating?.toString() || ""}
          onValueChange={(value) => {
            const rating = value ? Number(value) : null;
            onRatingChange(rating);
          }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="any-rating" />
            <Label htmlFor="any-rating">Any rating</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.5" id="rating-4.5" />
            <Label htmlFor="rating-4.5">4.5 and above</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="rating-4" />
            <Label htmlFor="rating-4">4 and above</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="rating-3" />
            <Label htmlFor="rating-3">3 and above</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;

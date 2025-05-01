import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import TagsList from "@/components/TagsList";
import HotelCard from "@/components/HotelCard";
import SortDropdown from "@/components/SortDropdown";
import { fetchHotels } from "@/services/hotelService";
import { Hotel } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [fetchedHotels, setFetchedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [absoluteMinPrice, setAbsoluteMinPrice] = useState<number>(0);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState<number>(0);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");

  const { toast } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [hotelsData] = await Promise.all([fetchHotels()]);
        setHotels(hotelsData.hotels);
        setFetchedHotels(hotelsData.hotels);
        setAvailableTags(hotelsData.tags);
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast({
          title: "Error",
          description: "Failed to load hotels. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle search query changes
  useEffect(() => {
    const loadSearchedHotels = async () => {
      if (!searchQuery) return;

      try {
        setLoading(true);
        const hotelsData = await fetchHotels(searchQuery);
        setHotels(hotelsData.hotels);
        setFetchedHotels(hotelsData.hotels);
        setAvailableTags(hotelsData.tags);

        if (hotels.length > 0) {
          const prices = hotels.map((hotel) => hotel.pricepernight);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setAbsoluteMinPrice(min);
          setAbsoluteMaxPrice(max);
          // Set initial price range to full range
          setMinPrice(min);
          setMaxPrice(max);
        }
      } catch (error) {
        console.error("Failed to search hotels:", error);
        toast({
          title: "Error",
          description: "Failed to search hotels. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSearchedHotels();
  }, [searchQuery]);

  // Update absolute price range when hotels change
  useEffect(() => {
    if (hotels.length > 0) {
      const prices = hotels.map((hotel) => hotel.pricepernight);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      // setAbsoluteMinPrice(min);
      // setAbsoluteMaxPrice(max);
      // Set initial price range to full range
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [hotels]);

  // Handle filtering of existing hotels
  useEffect(() => {
    const filterHotels = () => {
      try {
        let filteredHotels = fetchedHotels;

        // Filter by price range
        filteredHotels = filteredHotels.filter(
          (hotel) =>
            hotel.pricepernight >= minPrice && hotel.pricepernight <= maxPrice
        );

        // Filter by rating
        if (minRating !== null) {
          filteredHotels = filteredHotels.filter(
            (hotel) => hotel.rating >= minRating
          );
        }

        // Filter by selected tags
        if (selectedTags.length > 0) {
          filteredHotels = filteredHotels.filter((hotel) =>
            selectedTags.every((tag) => hotel.amenities.includes(tag))
          );
        }

        // Sort hotels
        if (sortBy === "price-asc") {
          filteredHotels.sort((a, b) => a.pricepernight - b.pricepernight);
        } else if (sortBy === "price-desc") {
          filteredHotels.sort((a, b) => b.pricepernight - a.pricepernight);
        } else if (sortBy === "rating-desc") {
          filteredHotels.sort((a, b) => b.rating - a.rating);
        }

        setHotels(filteredHotels);
      } catch (error) {
        console.error("Failed to filter hotels:", error);
        toast({
          title: "Error",
          description: "Failed to filter hotels. Please try again.",
          variant: "destructive",
        });
      }
    };

    filterHotels();
  }, [minPrice, maxPrice, minRating, selectedTags, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleRatingChange = (rating: number | null) => {
    setMinRating(rating);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-screen-xl">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="md:w-1/4 bg-white rounded-lg shadow">
            <FilterSidebar
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
              selectedRating={minRating}
              minPrice={minPrice}
              maxPrice={maxPrice}
              absoluteMinPrice={absoluteMinPrice}
              absoluteMaxPrice={absoluteMaxPrice}
              hotels={hotels}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <TagsList
                  tags={availableTags}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                  onTagRemove={handleTagRemove}
                />
                <SortDropdown
                  onSortChange={handleSortChange}
                  selectedSort={sortBy}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-blue mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading hotels...</p>
                </div>
              ) : hotels.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    No hotels found matching your criteria.
                  </p>
                </div>
              ) : (
                <div>
                  {hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.hotel_name}
                      hotel={hotel}
                      tags={availableTags}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

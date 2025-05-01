import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { amenitiesCategories, getCleanAmenityName } from "@/types/amenities";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.hotel) {
      setHotel(location.state.hotel);
      setLoading(false);
    } else {
      toast({
        title: "Error",
        description: "Hotel data not found. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }, [location.state]);

  console.log("Current state:", { loading, hotel, id });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-blue"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hotel not found</h2>
          <Link to="/">
            <Button className="bg-hotel-blue hover:bg-blue-700">
              Back to Hotels
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-hotel-blue hover:underline"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to hotel list
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold text-hotel-blue mb-2">
                  {hotel.hotel_name}
                </h1>
                <div className="flex items-center mb-4">
                  <MapPin size={18} className="text-hotel-blue" />
                  <span className="ml-1">{hotel.locationname}</span>
                </div>

                <div className="flex flex-wrap mb-4">
                  <span className="bg-hotel-lightblue text-hotel-blue text-sm px-3 py-1 rounded-full mr-2 mb-2">
                    {hotel.clusterbrand}
                  </span>
                  <span className="bg-hotel-lightblue text-hotel-blue text-sm px-3 py-1 rounded-full mr-2 mb-2">
                    {hotel.roomcategory}
                  </span>
                  <span className="bg-hotel-lightblue text-hotel-blue text-sm px-3 py-1 rounded-full mr-2 mb-2">
                    {hotel.mealtype}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Distance to City</p>
                    <p className="font-medium">{hotel.distancetocity} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distance to Beach</p>
                    <p className="font-medium">{hotel.distancetobeach} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distance to Airport</p>
                    <p className="font-medium">{hotel.distancetoairport} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Distance to Underground
                    </p>
                    <p className="font-medium">
                      {hotel.distancetounderground} km
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <div className="flex flex-col items-end mr-2">
                    <div className="font-medium">Rating</div>
                    <div className="text-sm text-gray-600">
                      {hotel.ratingscount} reviews
                    </div>
                  </div>
                  <div className="bg-hotel-blue text-white font-bold px-2 py-1 rounded">
                    {hotel.rating.toFixed(1)}
                  </div>
                </div>
                <div className="text-sm text-hotel-blue mb-4">
                  Star Category: {hotel.starcategory}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    €{hotel.pricepernight}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">per night</div>
                  <Button className="bg-hotel-blue hover:bg-blue-700 w-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="space-y-6">
                {Object.entries(amenitiesCategories).map(
                  ([category, categoryAmenities]) => {
                    // Filter amenities that exist in the hotel's amenities list
                    const availableAmenities = categoryAmenities.filter(
                      (amenity) =>
                        hotel.amenities.some(
                          (hotelAmenity) =>
                            getCleanAmenityName(
                              hotelAmenity.toLowerCase().replace(/\s+/g, "_")
                            ) === amenity
                        )
                    );

                    // Only render category if it has available amenities
                    if (availableAmenities.length === 0) return null;

                    return (
                      <div key={category} className="space-y-2">
                        <h3 className="text-lg font-semibold text-hotel-blue">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {availableAmenities.map((amenity, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-hotel-blue mr-2">•</span>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;

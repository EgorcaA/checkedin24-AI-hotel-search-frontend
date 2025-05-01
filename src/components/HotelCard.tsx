import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface HotelCardProps {
  hotel: Hotel;
  tags?: string[];
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, tags = [] }) => {
  // console.log(tags);
  return (
    <div className="flex flex-col md:flex-row border-b py-6 gap-4">
      <div className="md:w-1/4">
        <img
          src={
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
          alt={hotel.hotel_name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <Link to={`/hotel/${hotel.hotel_name}`} state={{ hotel }}>
            <h2 className="text-xl font-bold text-hotel-blue hover:underline">
              {hotel.hotel_name}
            </h2>
          </Link>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <MapPin size={16} className="text-hotel-blue" />
            <Link
              to={`/map/${hotel.locationname}`}
              className="ml-1 text-hotel-blue underline"
            >
              {hotel.locationname}
            </Link>
            <Link
              to={`/map/${hotel.locationname}`}
              className="ml-4 text-hotel-blue underline"
            >
              Show on map
            </Link>
          </div>
          <div className="flex flex-wrap mt-2">
            {/* {hotel.amenities.map((tag) => (
              <span
                key={tag}
                className="bg-hotel-lightblue text-hotel-blue text-xs px-2 py-1 rounded mr-2 mb-2"
              >
                {tag}
              </span>
            ))} */}
            {hotel.amenities
              .filter((amenity) => tags.length === 0 || tags.includes(amenity))
              .map((tag) => (
                <span
                  key={tag}
                  className="bg-hotel-lightblue text-hotel-blue text-xs px-2 py-1 rounded mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>
          <p className="mt-2 text-gray-600 line-clamp-2">{"description"}</p>
        </div>
        <div className="md:w-1/4 flex flex-col items-end justify-between mt-4 md:mt-0">
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <div className="flex flex-col items-end mr-2">
                <div className="font-medium">Very good</div>
                <div className="text-sm text-gray-600">
                  {hotel.ratingscount} reviews
                </div>
              </div>
              <div className="bg-hotel-blue text-white font-bold px-2 py-1 rounded">
                {hotel.rating.toFixed(1)}
              </div>
            </div>
            <div className="mt-1 text-sm text-hotel-blue">
              Location {hotel.locationtype}
            </div>
          </div>
          <div className="mt-4 flex flex-col items-end">
            <div className="text-xl font-bold">{hotel.pricepernight}</div>
            <div className="text-sm text-gray-600">per night</div>
            <Link to={`/hotel/${hotel.hotel_name}`} state={{ hotel }}>
              <Button className="mt-2 bg-hotel-blue hover:bg-blue-700">
                Show prices
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

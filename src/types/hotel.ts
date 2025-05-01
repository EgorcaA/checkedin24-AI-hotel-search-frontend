export interface Hotel {
  hotel_name: string;
  clusterchain: string;
  clusterbrand: string;
  clustersubbrand: string;
  pricepernight: number;
  rating: number;
  ratingscount: number;
  starcategory: number;
  mealtype: string;
  distancetocity: number;
  distancetounderground: number;
  distancetobeach: number;
  distancetoairport: number;
  roomcategory: string;
  locationtype: string;
  locationname: string;
  popular_location_rank: number;
  amenities: string[];
}

export interface HotelResponse {
  hotels: Hotel[];
  user_preferences: Record<string, any>;
}

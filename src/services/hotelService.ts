import { Hotel, HotelResponse } from "../types/hotel";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://checkedin24-aihotelsearch.vercel.app/";
// import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Get hotels based on user prompt
export const fetchHotels = async (
  prompt: string = ""
): Promise<{ hotels: Hotel[]; user_preferences: any; tags: string[] }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels?prompt=${encodeURIComponent(prompt)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    const data: HotelResponse = await response.json();

    // Extract keys from user preferences amenities
    const tags = Object.keys(data.user_preferences.amenities || {});
    console.log("Extracted keys from user preferences:", tags);

    return {
      hotels: data.hotels,
      user_preferences: data.user_preferences,
      tags,
    };
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

// Get hotel by ID
export const fetchHotelById = async (
  id: number
): Promise<Hotel | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotel");
    }
    const data: Hotel = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }
};

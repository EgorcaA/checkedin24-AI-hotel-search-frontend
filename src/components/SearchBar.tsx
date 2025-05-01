
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for hotels, locations, or amenities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-4 pr-12 py-6 text-base rounded-full border-2 border-hotel-blue focus:border-hotel-blue"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-hotel-blue text-white hover:bg-blue-700 h-10 w-10 rounded-full"
        >
          <Search size={20} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

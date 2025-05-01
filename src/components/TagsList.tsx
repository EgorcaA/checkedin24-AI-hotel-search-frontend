
import { X } from "lucide-react";

interface TagsListProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const TagsList: React.FC<TagsListProps> = ({ 
  tags, 
  selectedTags, 
  onTagSelect, 
  onTagRemove 
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap max-w-full gap-2 py-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => isSelected ? onTagRemove(tag) : onTagSelect(tag)}
            className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
              isSelected 
                ? "bg-hotel-blue text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {isSelected && (
              <X className="mr-1" size={14} />
            )}
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default TagsList;

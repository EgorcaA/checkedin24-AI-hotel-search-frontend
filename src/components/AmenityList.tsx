
interface AmenityListProps {
  categoryName: string;
  items: string[];
}

const AmenityList: React.FC<AmenityListProps> = ({ categoryName, items }) => {
  if (!items || items.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{categoryName}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmenityList;

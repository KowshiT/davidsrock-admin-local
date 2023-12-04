import React, { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (searchTerm: string) => any;
  className?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className={`${className}`}>
      <div className="">
        <FiSearch className="search-icon" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={(e: any) => handleSearch(e)}
      />
    </div>
  );
};

export default SearchBar;

import { useSearchRestaurants } from "@/api/RestaurantApi";
import { SearchBar, SearchForm } from "@/components/SearchBar";
import { SearchResultCard } from "@/components/SearchResultCard";
import { SearchResultInfo } from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

export const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(searchState,city);
  const handleSearch = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: "" }));
  };

  if (isLoading) return <span>Loading...</span>;

  if (!results?.data || !city) {
    return <span>Results not found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
        searchQuery={searchState.searchQuery}
          onSubmit={handleSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

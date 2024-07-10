import { useSearchRestaurants } from "@/api/RestaurantApi";
import { CuisineFilter } from "@/components/CuisineFilter";
import { PaginationSelector } from "@/components/PaginationSelector";
import { SearchBar, SearchForm } from "@/components/SearchBar";
import { SearchResultCard } from "@/components/SearchResultCard";
import { SearchResultInfo } from "@/components/SearchResultInfo";
import { SortOptionDropdown } from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page?: number;
  selectedCuisines: string[];
  sortOption: string;
};

export const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,

    }));
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const handleSearch = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({ ...prevState, searchQuery: "", page: 1 }));
  };

  if (isLoading) return <span>Loading...</span>;

  if (!results?.data || !city) {
    return <span>Results not found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row ">
        <SearchResultInfo total={results.pagination.total} city={city} />
        <SortOptionDropdown onChange={setSortOption} sortOption={searchState.sortOption} />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

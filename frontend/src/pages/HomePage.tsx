import landingImage from "../assets/landing.webp";
import appDowndloadImage from "../assets/appDownload.png";
import { SearchBar, SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (SearchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${SearchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-4xl font-bold tracking-tight text-orange-600">
          Tuck into takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span className="text-lg">
            The app is the easiest way to order food and support your favorite
            local restaurant download now to get started.
          </span>

          <img src={appDowndloadImage} />
        </div>
      </div>
    </div>
  );
};

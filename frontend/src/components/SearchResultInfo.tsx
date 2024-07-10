import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

export const SearchResultInfo = ({ city, total }: Props) => {
  return (
    <span>
      {`${total} Restaurants found in ${city} `}
      <Link
        className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        to={`/`}
      >
        Change Location
      </Link>
    </span>
  );
};

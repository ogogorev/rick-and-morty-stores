import { FC, useCallback } from "react";
import { debounce } from "debounce";

import "./Search.css";

type Props = {
  onSearch: (searchTerm: string) => void;
};

export const Search: FC<Props> = ({ onSearch }) => {
  const handleChange = useCallback(
    debounce((e: any) => {
      onSearch(e.target.value);
    }, 300),
    []
  );

  return (
    <div className="search">
      <input onChange={handleChange} />
    </div>
  );
};

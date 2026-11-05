import { useState } from "react";
import AppTextField from "../generic/form/AppTextField";
import { Search } from "@mui/icons-material";

const LoanSearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching:", search);
  };

  return (
    <div className="mb-8 flex w-full gap-3">

      <div className="flex-1">
        <AppTextField
          label=""
          placeholder="Search loan products or lenders..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="self-end rounded-lg bg-yellow-400 px-6 py-3 font-medium text-black transition hover:bg-yellow-600"
      >
        Search 
        <Search className="ml-2" />
      </button>

    </div>
  );
};

export default LoanSearchBar;
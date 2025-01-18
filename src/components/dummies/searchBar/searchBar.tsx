import { FC, useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDebounce } from "@/utils";

interface SearchBarProps {
  label?: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  label = "Поиск",
  searchTerm,
  setSearchTerm,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};

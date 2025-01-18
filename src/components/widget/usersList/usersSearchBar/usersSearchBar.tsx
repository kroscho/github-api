import { FC, useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/dummies/searchBar";
import { User } from "@/models/user";
import { getUser } from "@/api";

interface UsersSearchBarProps {
  setFindedUser: (user: User | null) => void;
  setSearchingError: (error: boolean) => void;
}

export const UsersSearchBar: FC<UsersSearchBarProps> = ({
  setFindedUser,
  setSearchingError,
}) => {
  const [searchLogin, setSearchLogin] = useState("");

  const handleSearchUser = useCallback(async () => {
    if (searchLogin === "") {
      setFindedUser(null);
      setSearchingError(false);
      return;
    }

    try {
      const userResponse = await getUser({
        userName: searchLogin,
      });
      setFindedUser(userResponse);
      setSearchingError(false);
    } catch (e) {
      setFindedUser(null);
      setSearchingError(true);
      console.log("Error find user", e);
    }
  }, [searchLogin]);

  useEffect(() => {
    handleSearchUser();
  }, [searchLogin]);

  return (
    <SearchBar
      label="Поиск по логину"
      searchTerm={searchLogin}
      setSearchTerm={setSearchLogin}
    />
  );
};

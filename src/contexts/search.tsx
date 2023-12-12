import useDebounce from '@hooks/useDebounce';
import React, { createContext, useContext, useState } from 'react';

interface ISearchContextData {
  search: string;
  debouncedSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
}

const SearchContext = createContext<ISearchContextData>(
  {} as ISearchContextData,
);

export const SearchProvider: React.FC<IProps> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 500);

  return (
    <SearchContext.Provider
      value={{
        search,
        debouncedSearch,
        setSearch,
        loading,
        setLoading,
        refreshing,
        setRefreshing,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);
export default useSearch;

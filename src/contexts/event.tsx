import React, { createContext, useContext, useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import { IEvent } from '@interfaces/event';

interface IEventContextData {
  event: IEvent | null;
  setEvent: React.Dispatch<React.SetStateAction<IEvent>>;
  searchInvite: string;
  debouncedSearchInvite: string;
  setSearchInvite: React.Dispatch<React.SetStateAction<string>>;
  loadingInviteSearch: boolean;
  setLoadingInviteSearch: React.Dispatch<React.SetStateAction<boolean>>;
  refreshingInviteSearch: boolean;
  setRefreshingInviteSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
}

const EventContext = createContext<IEventContextData>({} as IEventContextData);

export const EventProvider: React.FC<IProps> = ({ children }) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [searchInvite, setSearchInvite] = useState<string>('');
  const [loadingInviteSearch, setLoadingInviteSearch] =
    useState<boolean>(false);
  const [refreshingInviteSearch, setRefreshingInviteSearch] =
    useState<boolean>(false);

  const debouncedSearchInvite = useDebounce(searchInvite, 500);

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        searchInvite,
        debouncedSearchInvite,
        setSearchInvite,
        loadingInviteSearch,
        setLoadingInviteSearch,
        refreshingInviteSearch,
        setRefreshingInviteSearch,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext);
export default useEvent;

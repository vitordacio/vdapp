import React, { createContext, useContext, useState } from 'react';

import { IParticipation } from '@interfaces/participation';

interface IEventContextData {
  // searchInvite: string;
  // debouncedSearchInvite: string;
  // setSearchInvite: React.Dispatch<React.SetStateAction<string>>;
  // loadingInviteSearch: boolean;
  // setLoadingInviteSearch: React.Dispatch<React.SetStateAction<boolean>>;
  // refreshingInviteSearch: boolean;
  // setRefreshingInviteSearch: React.Dispatch<React.SetStateAction<boolean>>;
  eventRequestsPending: IParticipation[];
  setEventRequestsPending: React.Dispatch<
    React.SetStateAction<IParticipation[]>
  >;
  eventRequestsReviwed: IParticipation[];
  setEventRequestsReviwed: React.Dispatch<
    React.SetStateAction<IParticipation[]>
  >;
}

const EventContext = createContext<IEventContextData>({} as IEventContextData);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [eventRequestsPending, setEventRequestsPending] = useState<
    IParticipation[]
  >([]);
  const [eventRequestsReviwed, setEventRequestsReviwed] = useState<
    IParticipation[]
  >([]);

  // const [searchInvite, setSearchInvite] = useState<string>('');
  // const [loadingInviteSearch, setLoadingInviteSearch] =
  //   useState<boolean>(false);
  // const [refreshingInviteSearch, setRefreshingInviteSearch] =
  //   useState<boolean>(false);

  // const debouncedSearchInvite = useDebounce(searchInvite, 500);

  return (
    <EventContext.Provider
      value={{
        // searchInvite,
        // debouncedSearchInvite,
        // setSearchInvite,
        // loadingInviteSearch,
        // setLoadingInviteSearch,
        // refreshingInviteSearch,
        // setRefreshingInviteSearch,
        eventRequestsPending,
        setEventRequestsPending,
        eventRequestsReviwed,
        setEventRequestsReviwed,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext);
export default useEvent;

import React, { createContext, useContext, useState } from 'react';

import { IParticipation } from '@interfaces/participation';

interface IEventContextData {
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

  return (
    <EventContext.Provider
      value={{
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

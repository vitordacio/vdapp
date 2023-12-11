import React, { createContext, useContext, useState } from 'react';
import { IEvent } from '@interfaces/event';

interface IEventContextData {
  event: IEvent | null;
  setEvent: React.Dispatch<React.SetStateAction<IEvent>>;
}

interface IProps {
  children: React.ReactNode;
}

const EventContext = createContext<IEventContextData>({} as IEventContextData);

export const EventProvider: React.FC<IProps> = ({ children }) => {
  const [event, setEvent] = useState<IEvent | null>(null);

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext);
export default useEvent;

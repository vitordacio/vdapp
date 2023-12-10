import React, { createContext, useContext, useState } from 'react';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type style = {
  transform: {
    translateY: number;
  }[];
  opacity: number;
};

interface IMessageContextData {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageType: string;
  setMessageType: React.Dispatch<React.SetStateAction<string>>;
  animatedStyle: style;
  handleEntering: () => void;
  handleExiting: () => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
}

const MessageContext = createContext<IMessageContextData>(
  {} as IMessageContextData,
);

export const MessageProvider: React.FC<IProps> = ({ children }) => {
  const translateY = useSharedValue(-100);
  const opac = useSharedValue(0);

  const [message, setMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>('info');
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleEntering = () => {
    translateY.value = withSpring(15);
    opac.value = withTiming(1, { easing: Easing.bezier(0.5, 0.01, 0, 1) });
    setRefresh(prev => !prev);
  };

  const handleExiting = () => {
    translateY.value = withSpring(-100);
    opac.value = withTiming(0, { easing: Easing.bezier(0.5, 0.01, 0, 1) });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opac.value,
    };
  });

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        messageType,
        setMessageType,
        animatedStyle,
        handleEntering,
        handleExiting,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = () => useContext(MessageContext);
export default useMessage;

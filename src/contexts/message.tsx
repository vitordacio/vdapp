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

type handleMessage = {
  message: string;
  type?: 'info' | 'error' | '';
  icon?: string;
};

interface IMessageContextData {
  handleMessage: handleMessage;
  animatedStyle: style;
  handleEntering: () => void;
  handleExiting: () => void;
  throwInfo: (data: string) => void;
  throwError: (data: string) => void;
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

  const [refresh, setRefresh] = useState<boolean>(false);
  const [handleMessage, setHandleMessage] = useState<handleMessage>({
    message: '',
    icon: '',
    type: '',
  });

  const handleEntering = () => {
    translateY.value = withSpring(15);
    opac.value = withTiming(1, { easing: Easing.bezier(0.5, 0.01, 0, 1) });
    setRefresh(prev => !prev);
  };

  const handleExiting = () => {
    translateY.value = withSpring(-100);
    opac.value = withTiming(0, { easing: Easing.bezier(0.5, 0.01, 0, 1) });
  };

  const throwInfo = (infoMessage: string) => {
    setHandleMessage({
      message: infoMessage,
    });

    handleEntering();
  };

  const throwError = (errorMessage: string) => {
    setHandleMessage({
      type: 'error',
      message: errorMessage,
      icon: 'alert',
    });

    handleEntering();
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
        handleMessage,
        animatedStyle,
        handleEntering,
        handleExiting,
        refresh,
        setRefresh,
        throwInfo,
        throwError,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = () => useContext(MessageContext);
export default useMessage;

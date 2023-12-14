import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Message } from '@components/Message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, ViewProps } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MessageProvider } from '@contexts/message';
import { EventProvider } from '@contexts/event';

const RoutesView: React.FC<ViewProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <EventProvider>
            <MessageProvider>
              <Message />
              <NavigationContainer>{children}</NavigationContainer>
            </MessageProvider>
          </EventProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RoutesView;

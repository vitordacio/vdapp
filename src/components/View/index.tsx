import React from 'react';
import { View as NativeView, ViewProps, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles';

export const View = (props: ViewProps) => {
  return <NativeView {...props} />;
};

export const AppView = (props: ViewProps) => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <NativeView {...props} style={[styles.app_view, props.style]} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

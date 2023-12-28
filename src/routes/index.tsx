import React from 'react';
import useAuth from '@contexts/auth';
import { LoadingView } from '@components/View/Loading';
import RoutesView from '@components/View/Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppRoutes from './App/app.routes';
// import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { signed, loading, user } = useAuth();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <RoutesView>
      <Stack.Navigator>
        {signed ? (
          <Stack.Screen
            name="AppRoutes"
            component={AppRoutes}
            initialParams={{ user }}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="AuthRoutes"
            component={AuthRoutes}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </RoutesView>
  );
};

export default Routes;

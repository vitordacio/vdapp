import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Auth/Login';
import SignUp from '@screens/Auth/SignUp';
import Welcome from '@screens/Auth/Welcome';

import React from 'react';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
      initialRouteName="Welcome"
    >
      <Auth.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;

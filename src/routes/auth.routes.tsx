import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import Welcome from '@screens/Welcome';

import React from 'react';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator initialRouteName="Welcome">
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

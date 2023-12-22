import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/app.routes';
import UpdateUser from '@screens/App/User/Update';
import UpdateBio from '@screens/App/User/Update/UpdateBio';
import UpdateGender from '@screens/App/User/Update/UpdateGender';
import UpdateName from '@screens/App/User/Update/UpdateName';
import UpdatePassword from '@screens/App/User/Update/UpdatePassword';
import UpdatePrivacy from '@screens/App/User/Update/UpdatePrivacy';
import UpdateSocial from '@screens/App/User/Update/UpdateSocial';
import UpdateUsername from '@screens/App/User/Update/UpdateUsername';
import { screenOptionsDefault } from '@styles/screenOptions';
import React from 'react';

const UpdateUserStackTab = createNativeStackNavigator();

export const UpdateUserRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <UpdateUserStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Editar Perfil' })}
    >
      <UpdateUserStackTab.Screen name="UpdateUserScreen">
        {props => <UpdateUser {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      {/* <UpdateUserStackTab.Screen name="UpdateUserConfirm">
        {props => <UpdateUserConfirm {...props} route={route} />}
      </UpdateUserStackTab.Screen> */}

      <UpdateUserStackTab.Screen name="UpdateUsername">
        {props => <UpdateUsername {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateName">
        {props => <UpdateName {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateBio">
        {props => <UpdateBio {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateGender">
        {props => <UpdateGender {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateSocial">
        {props => <UpdateSocial {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdatePrivacy">
        {props => <UpdatePrivacy {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateEmail">
        {props => <UpdateSocial {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdatePassword">
        {props => <UpdatePassword {...props} route={route} />}
      </UpdateUserStackTab.Screen>
    </UpdateUserStackTab.Navigator>
  );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/app.routes';
import UpdateUser from '@screens/App/User/Update';
import UpdateBio from '@screens/App/User/Update/UpdateBio';
import UpdateEmail from '@screens/App/User/Update/UpdateEmail';
import UpdateGender from '@screens/App/User/Update/UpdateGender';
import UpdateLocation from '@screens/App/User/Update/UpdateLocation';
import UpdateName from '@screens/App/User/Update/UpdateName';
import UpdatePassword from '@screens/App/User/Update/UpdatePassword';
import UpdatePrivacy from '@screens/App/User/Update/UpdatePrivacy';
import UpdateSocial from '@screens/App/User/Update/UpdateSocial';
import { UpdateUserConfirm } from '@screens/App/User/Update/UpdateUserConfirm';
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

      <UpdateUserStackTab.Screen name="UpdateUserConfirm">
        {props => <UpdateUserConfirm {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserUsername">
        {props => <UpdateUsername {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserName">
        {props => <UpdateName {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserBio">
        {props => <UpdateBio {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserLocation">
        {props => <UpdateLocation {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserGender">
        {props => <UpdateGender {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserSocial">
        {props => <UpdateSocial {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserPrivacy">
        {props => <UpdatePrivacy {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserEmail">
        {props => <UpdateEmail {...props} route={route} />}
      </UpdateUserStackTab.Screen>

      <UpdateUserStackTab.Screen name="UpdateUserPassword">
        {props => <UpdatePassword {...props} route={route} />}
      </UpdateUserStackTab.Screen>
    </UpdateUserStackTab.Navigator>
  );
};

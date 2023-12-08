import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Achievements from '@screens/App/Top/Achievements';
import EmojisSent from '@screens/App/Top/EmojisSent';
import Events from '@screens/App/Top/Events';
import Participations from '@screens/App/Top/Participations';
import UpdateUser from '@screens/App/Update';
import UpdateBio from '@screens/App/Update/UpdateBio';
import UpdateEmail from '@screens/App/Update/UpdateEmail';
import UpdateGender from '@screens/App/Update/UpdateGender';
import UpdateLocation from '@screens/App/Update/UpdateLocation';
import UpdateName from '@screens/App/Update/UpdateName';
import UpdatePassword from '@screens/App/Update/UpdatePassword';
import UpdatePrivacy from '@screens/App/Update/UpdatePrivacy';
import UpdateSocial from '@screens/App/Update/UpdateSocial';
import UpdateUsername from '@screens/App/Update/UpdateUsername';

const UpdateUserStackTab = createNativeStackNavigator();

export const UpdateUserRoutes: React.FC = () => {
  return (
    <UpdateUserStackTab.Navigator
      screenOptions={{
        headerTitle: 'Editar Perfil',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >
      <UpdateUserStackTab.Screen
        name="UpdateUserScreen"
        component={UpdateUser}
      />
      <UpdateUserStackTab.Screen
        name="UpdateUsername"
        component={UpdateUsername}
      />
      <UpdateUserStackTab.Screen name="UpdateName" component={UpdateName} />
      <UpdateUserStackTab.Screen name="UpdateBio" component={UpdateBio} />
      <UpdateUserStackTab.Screen
        name="UpdateLocation"
        component={UpdateLocation}
      />
      <UpdateUserStackTab.Screen name="UpdateGender" component={UpdateGender} />
      <UpdateUserStackTab.Screen name="UpdateSocial" component={UpdateSocial} />
      <UpdateUserStackTab.Screen
        name="UpdatePrivacy"
        component={UpdatePrivacy}
      />
      <UpdateUserStackTab.Screen name="UpdateEmail" component={UpdateEmail} />
      <UpdateUserStackTab.Screen
        name="UpdatePassword"
        component={UpdatePassword}
      />
    </UpdateUserStackTab.Navigator>
  );
};

const UserTopTab = createMaterialTopTabNavigator();

export const UserTopTabRoutes: React.FC = () => {
  return (
    <UserTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <UserTopTab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />
      <UserTopTab.Screen
        name="Participations"
        component={Participations}
        options={{
          tabBarLabel: 'Participações',
        }}
      />
      <UserTopTab.Screen
        name="EmojisSent"
        component={EmojisSent}
        options={{
          tabBarLabel: '😊',
        }}
      />
      <UserTopTab.Screen
        name="Achievements"
        component={Achievements}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </UserTopTab.Navigator>
  );
};

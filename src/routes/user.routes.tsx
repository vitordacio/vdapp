import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmojisReceived from '@screens/App/User/Emojis';
import Friends from '@screens/App/User/Friends';
import Inbox from '@screens/App/User/Inbox';
import Achievements from '@screens/App/User/Top/Achievements';
import EmojisSent from '@screens/App/User/Top/EmojisSent';
import Events from '@screens/App/User/Top/Events';
import Participations from '@screens/App/User/Top/Participations';
import UpdateUser from '@screens/App/User/Update';
import UpdateUsername from '@screens/App/User/Update/UpdateUsername';
import UpdateName from '@screens/App/User/Update/UpdateName';
import UpdateBio from '@screens/App/User/Update/UpdateBio';
import UpdateLocation from '@screens/App/User/Update/UpdateLocation';
import UpdateGender from '@screens/App/User/Update/UpdateGender';
import UpdateSocial from '@screens/App/User/Update/UpdateSocial';
import UpdatePrivacy from '@screens/App/User/Update/UpdatePrivacy';
import UpdateEmail from '@screens/App/User/Update/UpdateEmail';
import UpdatePassword from '@screens/App/User/Update/UpdatePassword';
import User from '@screens/App/User';
import Profile from '@screens/App/Profile';

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

const UserStackTab = createNativeStackNavigator();

const UserRoutes: React.FC = () => {
  return (
    <UserStackTab.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: 'black',
      //   },
      //   headerTitleStyle: {
      //     color: 'white',
      //   },
      //   headerTintColor: 'white',
      //   headerTitleAlign: 'center',
      // }}
      screenOptions={({ route }) => {
        return {
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          tabBarVisible: `${route.name === 'User'}`,
        };
      }}
    >
      <UserStackTab.Screen name="User" component={User} />
      <UserStackTab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerTitle: 'Amigos',
        }}
      />
      <UserStackTab.Screen
        name="EmojisReceived"
        component={EmojisReceived}
        options={{
          headerTitle: 'Emotes Recebidos',
        }}
      />
      <UserStackTab.Screen
        name="UpdateUser"
        component={UpdateUserRoutes}
        options={{
          headerShown: false,
        }}
      />
      <UserStackTab.Screen name="Inbox" component={Inbox} />

      <UserStackTab.Screen name="Profile" component={Profile} />
    </UserStackTab.Navigator>
  );
};

export default UserRoutes;

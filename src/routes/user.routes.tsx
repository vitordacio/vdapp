import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import User from '@screens/User';
import UpdateUser from '@screens/User/Update';
import EmojisReceived from '@screens/User/Emojis';
import Friends from '@screens/User/Friends';
import Inbox from '@screens/User/Inbox';
import Achievements from '@screens/User/Top/Achievements';
import EmojisSent from '@screens/User/Top/EmojisSent';
import Events from '@screens/User/Top/Events';
import Participations from '@screens/User/Top/Participations';
import UpdateUsername from '@screens/User/Update/UpdateUsername';

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
      {/* <UpdateUserStackTab.Screen name="UpdateName" component={UpdateName} />
      <UpdateUserStackTab.Screen name="UpdateBio" component={UpdateBio} />
      <UpdateUserStackTab.Screen
        name="UpdateLocation"
        component={UpdateLocation}
      />
      <UpdateUserStackTab.Screen name="UpdateGender" component={UpdateGender} />
      <UpdateUserStackTab.Screen
        name="UpdateSocials"
        component={UpdateSocials}
      />
      <UpdateUserStackTab.Screen
        name="UpdatePrivacy"
        component={UpdatePrivacy}
      />
      <UpdateUserStackTab.Screen name="UpdateEmail" component={UpdateEmail} />
      <UpdateUserStackTab.Screen
        name="UpdatePassword"
        component={UpdatePassword}
      /> */}
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
    </UserStackTab.Navigator>
  );
};

export default UserRoutes;

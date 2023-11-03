import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from '@screens/App/Profile';
import EditProfile from '@screens/App/Profile/EditProfile';
import EditPassword from '@screens/App/Profile/EditProfile/EditPassword';
import EditUsername from '@screens/App/Profile/EditProfile/EditUsername';
import EmojisReceived from '@screens/App/Profile/Emojis';
import Friends from '@screens/App/Profile/Friends';
import Inbox from '@screens/App/Profile/Inbox';
import Achievements from '@screens/App/Profile/Top/Achievements';
import EmojisSent from '@screens/App/Profile/Top/EmojisSent';
import Events from '@screens/App/Profile/Top/Events';
import Participations from '@screens/App/Profile/Top/Participations';
import EditBio from '@screens/App/Profile/EditProfile/EditBio';
import EditEmail from '@screens/App/Profile/EditProfile/EditEmail';
import EditGender from '@screens/App/Profile/EditProfile/EditGender';
import EditLocation from '@screens/App/Profile/EditProfile/EditLocation';
import EditName from '@screens/App/Profile/EditProfile/EditName';
import EditPrivacy from '@screens/App/Profile/EditProfile/EditPrivacy';
import EditSocials from '@screens/App/Profile/EditProfile/EditSocials';

const EditProfileStackTab = createNativeStackNavigator();

export const EditProfileRoutes: React.FC = () => {
  return (
    <EditProfileStackTab.Navigator
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
      <EditProfileStackTab.Screen name="EditProfile" component={EditProfile} />
      <EditProfileStackTab.Screen
        name="EditUsername"
        component={EditUsername}
      />
      <EditProfileStackTab.Screen name="EditName" component={EditName} />
      <EditProfileStackTab.Screen name="EditBio" component={EditBio} />
      <EditProfileStackTab.Screen
        name="EditLocation"
        component={EditLocation}
      />
      <EditProfileStackTab.Screen name="EditGender" component={EditGender} />
      <EditProfileStackTab.Screen name="EditSocials" component={EditSocials} />
      <EditProfileStackTab.Screen name="EditPrivacy" component={EditPrivacy} />
      <EditProfileStackTab.Screen name="EditEmail" component={EditEmail} />
      <EditProfileStackTab.Screen
        name="EditPassword"
        component={EditPassword}
      />
    </EditProfileStackTab.Navigator>
  );
};

const ProfileTopTab = createMaterialTopTabNavigator();

export const ProfileTopTabRoutes: React.FC = () => {
  return (
    <ProfileTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <ProfileTopTab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />
      <ProfileTopTab.Screen
        name="Participations"
        component={Participations}
        options={{
          tabBarLabel: 'Participações',
        }}
      />
      <ProfileTopTab.Screen
        name="EmojisSent"
        component={EmojisSent}
        options={{
          tabBarLabel: '😊',
        }}
      />
      <ProfileTopTab.Screen
        name="Achievements"
        component={Achievements}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </ProfileTopTab.Navigator>
  );
};

const ProfileStackTab = createNativeStackNavigator();

const AppProfileRoutes: React.FC = () => {
  return (
    <ProfileStackTab.Navigator
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
      <ProfileStackTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Nome do usuário',
        }}
      />
      <ProfileStackTab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerTitle: 'Amigos',
        }}
      />
      <ProfileStackTab.Screen
        name="EmojisReceived"
        component={EmojisReceived}
        options={{
          headerTitle: 'Emotes Recebidos',
        }}
      />
      <ProfileStackTab.Screen
        name="EditProfile"
        component={EditProfileRoutes}
        options={{
          headerShown: false,
        }}
        // options={{
        //   headerTitle: 'Editar Perfil',
        // }}
      />
      <ProfileStackTab.Screen name="Inbox" component={Inbox} />
    </ProfileStackTab.Navigator>
  );
};

export default AppProfileRoutes;

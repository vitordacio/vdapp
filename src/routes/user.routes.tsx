import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserAchievements from '@screens/App/User/Top/UserAchievements';
import UserEmojisSent from '@screens/App/User/Top/UserEmojisSent';
import UserEvents from '@screens/App/User/Top/UserEvents';
import UserParticipations from '@screens/App/User/Top/UserParticipations';
import UpdateUser from '@screens/App/User/Update';
import UpdateBio from '@screens/App/User/Update/UpdateBio';
import UpdateEmail from '@screens/App/User/Update/UpdateEmail';
import UpdateGender from '@screens/App/User/Update/UpdateGender';
import UpdateLocation from '@screens/App/User/Update/UpdateLocation';
import UpdateName from '@screens/App/User/Update/UpdateName';
import UpdatePassword from '@screens/App/User/Update/UpdatePassword';
import UpdatePrivacy from '@screens/App/User/Update/UpdatePrivacy';
import UpdateSocial from '@screens/App/User/Update/UpdateSocial';
import UpdateUsername from '@screens/App/User/Update/UpdateUsername';
import { ParamListBase } from '@react-navigation/native';
import { IUser } from '@interfaces/user';
import { PrivateContentView } from '@components/View/PrivateContent';

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

const UserPrivateTopTab = createMaterialTopTabNavigator();

export const UserPrivateTopTabRoutes: React.FC = () => {
  return (
    <UserPrivateTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <UserPrivateTopTab.Screen
        name="UserPrivateEvents"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />
      <UserPrivateTopTab.Screen
        name="UserPrivateParticipations"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Participações',
        }}
      />
      <UserPrivateTopTab.Screen
        name="UserPrivateEmojisSent"
        component={PrivateContentView}
        options={{
          tabBarLabel: '😊',
        }}
      />
      <UserPrivateTopTab.Screen
        name="UserPrivateAchievements"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </UserPrivateTopTab.Navigator>
  );
};

const UserTopTab = createMaterialTopTabNavigator();

export const UserTopTabRoutes: React.FC<
  Partial<NativeStackScreenProps<ParamListBase>> & {
    user: IUser;
  }
> = ({ user }) => {
  return (
    <UserTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <UserTopTab.Screen
        name="UserEvents"
        options={{
          tabBarLabel: 'Eventos',
        }}
      >
        {props => <UserEvents {...props} user={user} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserParticipations"
        component={UserParticipations}
        options={{
          tabBarLabel: 'Participações',
        }}
      />
      <UserTopTab.Screen
        name="UserEmojisSent"
        component={UserEmojisSent}
        options={{
          tabBarLabel: '😊',
        }}
      />
      <UserTopTab.Screen
        name="UserAchievements"
        component={UserAchievements}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </UserTopTab.Navigator>
  );
};

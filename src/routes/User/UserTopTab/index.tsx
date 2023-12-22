import { IUser } from '@interfaces/user';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserAchievements from '@screens/App/User/Top/UserAchievements';
import UserEmojisSent from '@screens/App/User/Top/UserEmojisSent';
import UserEvents from '@screens/App/User/Top/UserEvents';
import UserParticipations from '@screens/App/User/Top/UserParticipations';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const UserTopTab = createMaterialTopTabNavigator();

export const UserTopTabRoutes: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <UserTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      {/* <UserTopTab.Screen
        name="UserEvents"
        options={{
          tabBarLabel: 'Eventos',
        }}
      >
        {props => <UserEvents {...props} route={route} />}
      </UserTopTab.Screen> */}

      <UserTopTab.Screen
        name="UserEvents"
        initialParams={{ user }}
        component={UserEvents}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />

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

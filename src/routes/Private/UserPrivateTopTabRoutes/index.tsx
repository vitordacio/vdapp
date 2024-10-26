import { PrivateContentView } from '@components/View/PrivateContent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const UserPrivateTopTab = createMaterialTopTabNavigator();

export const UserPrivateTopTabRoutes: React.FC = () => {
  return (
    <UserPrivateTopTab.Navigator
      screenOptions={() => screenOptionsTopDefault({})}
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
          tabBarLabel: 'Reações',
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

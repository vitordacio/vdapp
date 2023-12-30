import { PrivateContentView } from '@components/View/PrivateContent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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

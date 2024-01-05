import { PrivateContentView } from '@components/View/PrivateContent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const EventPrivateTopTab = createMaterialTopTabNavigator();

export const EventPrivateTopTabRoutes: React.FC = () => {
  return (
    <EventPrivateTopTab.Navigator
      screenOptions={() => screenOptionsTopDefault({})}
    >
      <EventPrivateTopTab.Screen
        name="EventPrivateMoments"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Momentos',
        }}
      />
      <EventPrivateTopTab.Screen
        name="EventPrivateParticipations"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Participando',
        }}
      />
      <EventPrivateTopTab.Screen
        name="EventPrivateReactsReceived"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Reações',
        }}
      />
      <EventPrivateTopTab.Screen
        name="EventPrivateAchievements"
        component={PrivateContentView}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </EventPrivateTopTab.Navigator>
  );
};

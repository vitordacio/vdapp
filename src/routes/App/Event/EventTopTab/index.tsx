import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import EventAchievements from '@screens/App/Event/Top/EventAchievements';
import EventMoments from '@screens/App/Event/Top/EventMoments';
import EventParticipations from '@screens/App/Event/Top/EventParticipations';
import EventReactsReceived from '@screens/App/Event/Top/EventReactsReceived';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const EventTopTab = createMaterialTopTabNavigator();

export const EventTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <EventTopTab.Screen
        name="EventMoments"
        options={{
          tabBarLabel: 'Momentos',
        }}
      >
        {props => <EventMoments {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventParticipations"
        options={{
          tabBarLabel: 'Participando',
        }}
      >
        {props => <EventParticipations {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventReactsReceived"
        options={{
          tabBarLabel: 'Reações',
        }}
      >
        {props => <EventReactsReceived {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventAchievements"
        options={{
          tabBarLabel: 'Conquistas',
        }}
      >
        {props => <EventAchievements {...props} route={route} />}
      </EventTopTab.Screen>
    </EventTopTab.Navigator>
  );
};

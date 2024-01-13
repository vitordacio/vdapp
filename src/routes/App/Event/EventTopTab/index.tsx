import { Icon } from '@components/Icon';
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
          tabBarLabel: () => {
            return <Icon name="moments" />;
          },
        }}
      >
        {props => <EventMoments {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventParticipations"
        options={{
          tabBarLabel: () => {
            return <Icon name="users" />;
          },
        }}
      >
        {props => <EventParticipations {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventReactsReceived"
        options={{
          tabBarLabel: () => {
            return <Icon name="smile" />;
          },
        }}
      >
        {props => <EventReactsReceived {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventAchievements"
        options={{
          tabBarLabel: () => {
            return <Icon name="achievement" />;
          },
        }}
      >
        {props => <EventAchievements {...props} route={route} />}
      </EventTopTab.Screen>
    </EventTopTab.Navigator>
  );
};

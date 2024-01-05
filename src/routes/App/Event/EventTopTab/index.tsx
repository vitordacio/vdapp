import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import Custom from '@screens/Custom';
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
        {props => <Custom {...props} route={route} />}
      </EventTopTab.Screen>
      <EventTopTab.Screen
        name="EventParticipations"
        options={{
          tabBarLabel: 'Participando',
        }}
      >
        {props => <Custom {...props} route={route} />}
      </EventTopTab.Screen>
      <EventTopTab.Screen
        name="EventReactsReceived"
        options={{
          tabBarLabel: 'Reações',
        }}
      >
        {props => <Custom {...props} route={route} />}
      </EventTopTab.Screen>

      <EventTopTab.Screen
        name="EventAchievements"
        options={{
          tabBarLabel: 'Conquistas',
        }}
      >
        {props => <Custom {...props} route={route} />}
      </EventTopTab.Screen>
    </EventTopTab.Navigator>
  );
};

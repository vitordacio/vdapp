import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Custom from '@screens/Custom';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import { EventProps } from '../event.routes';

const EventTopTab = createMaterialTopTabNavigator();

export const EventTopTabRoutes: React.FC<EventProps> = () => {
  return (
    <EventTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <EventTopTab.Screen
        name="EventPictures"
        component={Custom}
        options={{
          tabBarLabel: 'Momentos',
        }}
      />
      <EventTopTab.Screen
        name="EventParticipations"
        component={Custom}
        options={{
          tabBarLabel: 'Participando',
        }}
      />
      <EventTopTab.Screen
        name="EventEmojisReceived"
        component={Custom}
        options={{
          tabBarLabel: 'Emotes',
        }}
      />
      <EventTopTab.Screen
        name="EventAchievements"
        component={Custom}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </EventTopTab.Navigator>
  );
};

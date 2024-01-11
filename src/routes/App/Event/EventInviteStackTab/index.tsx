import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/App/app.routes';
import EventInvite from '@screens/App/Event/EventInvite';
import EventInviteConfirm from '@screens/App/Event/EventInvite/EventInviteConfirm';
import { screenOptionsDefault } from '@styles/screenOptions';

const EventInviteStackTab = createNativeStackNavigator();

export const EventInviteRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventInviteStackTab.Navigator
      screenOptions={() => screenOptionsDefault({})}
    >
      <EventInviteStackTab.Screen name="EventInviteScreen">
        {props => <EventInvite {...props} route={route} />}
      </EventInviteStackTab.Screen>

      <EventInviteStackTab.Screen name="EventInviteConfirm">
        {props => <EventInviteConfirm {...props} route={route} />}
      </EventInviteStackTab.Screen>
    </EventInviteStackTab.Navigator>
  );
};

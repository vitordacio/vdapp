import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventSettings from '@screens/App/Event/EventSettings';
import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import EventReport from '@screens/App/Event/EventSettings/Report';

const EventSettingsStackTab = createNativeStackNavigator();

export const EventSettingsRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventSettingsStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Gerenciar' })}
    >
      <EventSettingsStackTab.Screen name="EventSettingsScreen">
        {props => <EventSettings {...props} route={route} />}
      </EventSettingsStackTab.Screen>

      <EventSettingsStackTab.Screen
        name="EventReport"
        options={{ headerTitle: 'Reportar' }}
      >
        {props => <EventReport {...props} route={route} />}
      </EventSettingsStackTab.Screen>
    </EventSettingsStackTab.Navigator>
  );
};

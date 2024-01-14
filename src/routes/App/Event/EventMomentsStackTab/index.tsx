import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventMoments from '@screens/App/Event/EventMoments';
import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';

const EventMomentsStackTab = createNativeStackNavigator();

export const EventMomentsRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventMomentsStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Momentos' })}
    >
      <EventMomentsStackTab.Screen name="EventMomentsScreen">
        {props => <EventMoments {...props} route={route} />}
      </EventMomentsStackTab.Screen>
    </EventMomentsStackTab.Navigator>
  );
};

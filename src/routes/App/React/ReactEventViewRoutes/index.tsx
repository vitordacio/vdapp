import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReactConfirmDelete from '@screens/App/React/ConfirmDelete';
import ReactEventView from '@screens/App/React/EventView';

const ReactEventViewStackTab = createNativeStackNavigator();

export const ReactEventViewRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <ReactEventViewStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Sua Reação' })}
    >
      <ReactEventViewStackTab.Screen name="ReactEventViewScreen">
        {props => <ReactEventView {...props} route={route} />}
      </ReactEventViewStackTab.Screen>

      <ReactEventViewStackTab.Screen name="ReactEventDelete">
        {props => <ReactConfirmDelete {...props} route={route} />}
      </ReactEventViewStackTab.Screen>
    </ReactEventViewStackTab.Navigator>
  );
};

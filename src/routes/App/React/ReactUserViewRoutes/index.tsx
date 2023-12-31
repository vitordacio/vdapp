import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReactConfirmDelete from '@screens/App/React/ConfirmDelete';
import ReactUserView from '@screens/App/React/UserView';

const ReactUserViewStackTab = createNativeStackNavigator();

export const ReactUserViewRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <ReactUserViewStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Sua Reação' })}
    >
      <ReactUserViewStackTab.Screen name="ReactUserViewScreen">
        {props => <ReactUserView {...props} route={route} />}
      </ReactUserViewStackTab.Screen>

      <ReactUserViewStackTab.Screen name="ReactUserDelete">
        {props => <ReactConfirmDelete {...props} route={route} />}
      </ReactUserViewStackTab.Screen>
    </ReactUserViewStackTab.Navigator>
  );
};

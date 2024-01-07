import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/App/app.routes';
import { screenOptionsDefault } from '@styles/screenOptions';
import User from '@screens/App/User';
import { UpdateUserRoutes } from './UpdateUserStackTab';
import UserHeaderRight from './UserHeaderRight/HeaderRight';
import { UserSettingsRoutes } from './UserSettingsStackTab';

const UserStackTab = createNativeStackNavigator();

export const UserRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <UserStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <UserStackTab.Screen
        name="UserScreen"
        options={{
          headerTitle: route.params.user.name,
          headerRight: () => (
            <UserHeaderRight navigation={navigation} route={route} />
          ),
        }}
      >
        {props => <User {...props} route={route} />}
      </UserStackTab.Screen>

      <UserStackTab.Screen name="UpdateUser" options={{ headerShown: false }}>
        {props => <UpdateUserRoutes {...props} route={route} />}
      </UserStackTab.Screen>

      <UserStackTab.Screen name="UserSettings" options={{ headerShown: false }}>
        {props => <UserSettingsRoutes {...props} route={route} />}
      </UserStackTab.Screen>
    </UserStackTab.Navigator>
  );
};

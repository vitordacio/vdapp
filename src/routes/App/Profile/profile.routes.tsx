import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/App/app.routes';
import Profile from '@screens/App/Profile';
import { screenOptionsDefault } from '@styles/screenOptions';
import { ProfileSettingsRoutes } from './ProfileSettingsStackTab';
import ProfileHeaderRight from './ProfileHeaderRight/HeaderRight';

const ProfileStackTab = createNativeStackNavigator();

export const ProfileRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <ProfileStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <ProfileStackTab.Screen
        name="ProfileScreen"
        options={{
          headerTitle: route.params.user_profile.name,
          headerRight: () => (
            <ProfileHeaderRight navigation={navigation} route={route} />
          ),
        }}
      >
        {props => <Profile {...props} route={route} />}
      </ProfileStackTab.Screen>

      <ProfileStackTab.Screen
        name="ProfileSettings"
        options={{ headerShown: false }}
      >
        {props => <ProfileSettingsRoutes {...props} route={route} />}
      </ProfileStackTab.Screen>
    </ProfileStackTab.Navigator>
  );
};

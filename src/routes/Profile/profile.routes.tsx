import { IUser } from '@interfaces/user';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/app.routes';
import Profile from '@screens/App/Profile';
import { screenOptionsDefault } from '@styles/screenOptions';

const ProfileStackTab = createNativeStackNavigator();

export const ProfileRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  const onUpdateProfile = (data: IUser) => {
    navigation.setParams({
      ...route.params,
      profile: data,
    });
  };
  route.params.onUpdateProfile = onUpdateProfile;

  return (
    <ProfileStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <ProfileStackTab.Screen
        name="ProfileScreen"
        options={{ headerTitle: route.params.profile.name }}
      >
        {props => <Profile {...props} route={route} />}
      </ProfileStackTab.Screen>
    </ProfileStackTab.Navigator>
  );
};

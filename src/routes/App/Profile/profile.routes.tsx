import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/App/app.routes';
import Profile from '@screens/App/Profile';
import { screenOptionsDefault } from '@styles/screenOptions';

const ProfileStackTab = createNativeStackNavigator();

export const ProfileRoutes: React.FC<AppProps> = ({ route }) => {
  // const onUpdateProfile = (data: IUser) => {
  //   navigation.setParams({
  //     ...route.params,
  //     user_profile: data,
  //   });
  // };
  // route.params.onUpdateProfile = onUpdateProfile;

  return (
    <ProfileStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <ProfileStackTab.Screen
        name="ProfileScreen"
        options={{ headerTitle: route.params.user_profile.name }}
      >
        {props => <Profile {...props} route={route} />}
      </ProfileStackTab.Screen>
    </ProfileStackTab.Navigator>
  );
};

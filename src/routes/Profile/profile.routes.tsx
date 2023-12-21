import { IUser } from '@interfaces/user';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/app.routes';
import Profile from '@screens/App/Profile';
import { screenOptionsDefault } from '@styles/screenOptions';

const ProfileStackTab = createNativeStackNavigator();

// export type ProfileProps = NativeStackScreenProps<ParamListBase> & {
//   route: { params: { user: IUser } };
//   onUpdateProfile: (data: IUser) => void;
// };

export type ProfileProps = AppProps & {
  onUpdateProfile: (data: IUser) => void;
};

export const ProfileRoutes: React.FC<ProfileProps> = ({
  navigation,
  route,
}) => {
  const onUpdateProfile = (data: IUser) => {
    navigation.setParams({
      ...route.params,
      user: data,
    });
  };

  return (
    <ProfileStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <ProfileStackTab.Screen
        name="ProfileScreen"
        options={{ headerTitle: route.params.user.name }}
      >
        {props => (
          <Profile {...props} route={route} onUpdateProfile={onUpdateProfile} />
        )}
      </ProfileStackTab.Screen>
    </ProfileStackTab.Navigator>
  );
};

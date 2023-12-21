import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/app.routes';
import { screenOptionsDefault } from '@styles/screenOptions';
import User from '@screens/App/User';
import { UpdateUserRoutes } from './UpdateUserStackTab';

// export type BottomTabProps = NativeStackScreenProps<ParamListBase> & {
//   route: { params: { user: IUser; onUpdateUser: (data: IUser) => void } };
// };

const UserStackTab = createNativeStackNavigator();

export const UserRoutes: React.FC<AppProps> = ({ route }) => {
  // const onUpdateUser = (data: IUser) => {
  //   navigation.setParams({
  //     ...route.params,
  //     user: data,
  //   });
  // };

  return (
    <UserStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <UserStackTab.Screen
        name="UserScreen"
        options={{ headerTitle: route.params.user.name }}
      >
        {props => <User {...props} route={route} />}
      </UserStackTab.Screen>

      <UserStackTab.Screen name="UpdateUser" options={{ headerShown: false }}>
        {props => <UpdateUserRoutes {...props} route={route} />}
      </UserStackTab.Screen>
    </UserStackTab.Navigator>
  );
};

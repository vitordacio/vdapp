import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import SearchEvent from '@screens/App/Search/SearchEvent';
import SearchUser from '@screens/App/Search/SearchUser';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const SearchTopTab = createMaterialTopTabNavigator();

export const SearchTopRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <SearchTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <SearchTopTab.Screen
        name="SearchEvent"
        options={{ tabBarLabel: 'Eventos' }}
      >
        {props => <SearchEvent {...props} route={route} />}
      </SearchTopTab.Screen>

      <SearchTopTab.Screen
        name="SearchUser"
        options={{ tabBarLabel: 'Usuários' }}
      >
        {props => <SearchUser {...props} route={route} />}
      </SearchTopTab.Screen>
    </SearchTopTab.Navigator>
  );
};

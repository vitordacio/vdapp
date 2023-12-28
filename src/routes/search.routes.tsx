// import colors from '@styles/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchEvent from '@screens/App/Search/SearchEvent';
import { SearchProvider } from '@contexts/search';
import Search from '@screens/App/Search';
import SearchUser from '@screens/App/Search/SearchUser';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';

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

const SearchRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <SearchProvider>
      <Search navigation={navigation} route={route} />
    </SearchProvider>
  );
};

export default SearchRoutes;

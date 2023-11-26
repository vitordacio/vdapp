import colors from '@styles/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchEvent from '@screens/App/Search/SearchEvent';
import { SearchProvider } from '@contexts/search';
import Search from '@screens/App/Search';
import SearchUser from '@screens/App/Search/SearchUser';

const SearchTopTab = createMaterialTopTabNavigator();

export const SearchTopRoutes: React.FC = () => {
  return (
    <SearchTopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: `${colors.VIEW_BACKGROUND}` },
        tabBarIndicatorStyle: { backgroundColor: `${colors.GOLD}` },
        tabBarActiveTintColor: `${colors.GOLD}`,
        tabBarInactiveTintColor: `${colors.TEXT_DEFAULT}`,
      }}
    >
      <SearchTopTab.Screen
        name="SearchEvent"
        component={SearchEvent}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />
      <SearchTopTab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{
          tabBarLabel: 'Usuários',
        }}
      />
    </SearchTopTab.Navigator>
  );
};

const SearchRoutes = () => {
  return (
    <SearchProvider>
      <Search />
    </SearchProvider>
  );
};

export default SearchRoutes;

import Home from '@screens/App/Home';
import Custom from '@screens/Custom';
import colors from '@styles/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HomeTopTab = createMaterialTopTabNavigator();

const HomeRoutes: React.FC = () => {
  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: `${colors.GOLD}`,
        },
      }}
    >
      <HomeTopTab.Screen name="main" component={Home} />
      <HomeTopTab.Screen name="Latest" component={Custom} />
      <HomeTopTab.Screen name="Trending" component={Custom} />
    </HomeTopTab.Navigator>
  );
};

export default HomeRoutes;

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYou from '@screens/App/Home/Top/ForYou';
import Latest from '@screens/App/Home/Top/Latest';
import Trending from '@screens/App/Home/Top/Trending';

const HomeTopTab = createMaterialTopTabNavigator();

export const HomeTopRoutes: React.FC = () => {
  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <HomeTopTab.Screen
        name="ForYou"
        component={ForYou}
        options={{
          tabBarLabel: 'Para Você',
        }}
      />
      <HomeTopTab.Screen
        name="Latest"
        component={Latest}
        options={{
          tabBarLabel: 'Mais Novos',
        }}
      />
      <HomeTopTab.Screen
        name="Trending"
        component={Trending}
        options={{
          tabBarLabel: 'Em Alta',
        }}
      />
    </HomeTopTab.Navigator>
  );
};

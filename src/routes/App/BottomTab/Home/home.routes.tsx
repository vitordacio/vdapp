import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import ForYou from '@screens/App/Home/Top/ForYou';
import Latest from '@screens/App/Home/Top/Latest';
import Trending from '@screens/App/Home/Top/Trending';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const HomeTopTab = createMaterialTopTabNavigator();

export const HomeTopRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <HomeTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <HomeTopTab.Screen name="ForYou" options={{ tabBarLabel: 'Para Você' }}>
        {props => <ForYou {...props} route={route} />}
      </HomeTopTab.Screen>

      <HomeTopTab.Screen name="Latest" options={{ tabBarLabel: 'Mais Novos' }}>
        {props => <Latest {...props} route={route} />}
      </HomeTopTab.Screen>

      <HomeTopTab.Screen name="Trending" options={{ tabBarLabel: 'Em Alta' }}>
        {props => <Trending {...props} route={route} />}
      </HomeTopTab.Screen>
    </HomeTopTab.Navigator>
  );
};

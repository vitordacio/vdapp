import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '@screens/Home';
import Profile from '@screens/Profile';

const App = createBottomTabNavigator();

// export default function TabRoutes() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="home" component={Home} />
//       <Tab.Screen name="profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator>
      <App.Screen name="home" component={Home} />
      <App.Screen name="profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;

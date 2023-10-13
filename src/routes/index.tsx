import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './app.routes';

export default function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}

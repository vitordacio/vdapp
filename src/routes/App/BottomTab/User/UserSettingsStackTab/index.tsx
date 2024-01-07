import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSettings from '@screens/App/User/UserSettings';
import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import Custom from '@screens/Custom';
import DeleteUser from '@screens/App/User/UserSettings/Delete';
import Logout from '@screens/App/User/UserSettings/Logout';
import Suggestion from '@screens/App/User/UserSettings/Suggestion';

const UserSettingsStackTab = createNativeStackNavigator();

export const UserSettingsRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <UserSettingsStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Gerenciar' })}
    >
      <UserSettingsStackTab.Screen name="UserSettingsScreen">
        {props => <UserSettings {...props} route={route} />}
      </UserSettingsStackTab.Screen>

      <UserSettingsStackTab.Screen
        name="ToS"
        options={{ headerTitle: 'Termos de Serviço' }}
      >
        {props => <Custom {...props} route={route} />}
      </UserSettingsStackTab.Screen>

      <UserSettingsStackTab.Screen
        name="PrivacyPolicy"
        options={{ headerTitle: 'Política de Privacidade' }}
      >
        {props => <Custom {...props} route={route} />}
      </UserSettingsStackTab.Screen>

      <UserSettingsStackTab.Screen
        name="Suggestion"
        options={{ headerTitle: 'Sugestão' }}
      >
        {props => <Suggestion {...props} route={route} />}
      </UserSettingsStackTab.Screen>

      <UserSettingsStackTab.Screen
        name="Logout"
        options={{ headerTitle: 'Sair' }}
      >
        {props => <Logout {...props} route={route} />}
      </UserSettingsStackTab.Screen>

      <UserSettingsStackTab.Screen
        name="DeleteUser"
        options={{ headerTitle: 'Excluir Conta' }}
      >
        {props => <DeleteUser {...props} route={route} />}
      </UserSettingsStackTab.Screen>
    </UserSettingsStackTab.Navigator>
  );
};

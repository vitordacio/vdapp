import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileSettings from '@screens/App/Profile/ProfileSettings';
import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import ProfileBlock from '@screens/App/Profile/ProfileSettings/Block';
import ProfileReport from '@screens/App/Profile/ProfileSettings/Report';

const ProfileSettingsStackTab = createNativeStackNavigator();

export const ProfileSettingsRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <ProfileSettingsStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Gerenciar' })}
    >
      <ProfileSettingsStackTab.Screen name="ProfileSettingsScreen">
        {props => <ProfileSettings {...props} route={route} />}
      </ProfileSettingsStackTab.Screen>

      <ProfileSettingsStackTab.Screen
        name="ProfileReport"
        options={{ headerTitle: 'Reportar' }}
      >
        {props => <ProfileReport {...props} route={route} />}
      </ProfileSettingsStackTab.Screen>

      <ProfileSettingsStackTab.Screen
        name="ProfileBlock"
        options={{ headerTitle: 'Bloquear / Desbloquear' }}
      >
        {props => <ProfileBlock {...props} route={route} />}
      </ProfileSettingsStackTab.Screen>
    </ProfileSettingsStackTab.Navigator>
  );
};

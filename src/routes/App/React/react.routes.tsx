import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import { EmojiProvider } from '@contexts/emoji';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReactConfirmCreate from '@screens/App/React/ConfirmCreate';
import { EmojiTopRoutes } from './EmojiTopRoutes';

const ReactStackTab = createNativeStackNavigator();

export const ReactRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EmojiProvider>
      <ReactStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
        <ReactStackTab.Screen
          name="Emoji"
          options={{ headerTitle: 'Escolha um Emoji' }}
        >
          {props => <EmojiTopRoutes {...props} route={route} />}
        </ReactStackTab.Screen>

        <ReactStackTab.Screen
          name="ReactConfirmCreate"
          options={{ headerTitle: 'Reagir' }}
        >
          {props => <ReactConfirmCreate {...props} route={route} />}
        </ReactStackTab.Screen>
      </ReactStackTab.Navigator>
    </EmojiProvider>
  );
};

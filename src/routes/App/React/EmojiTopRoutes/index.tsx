import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import EmojiAnimal from '@screens/App/React/Emoji/EmojiAnimal';
import EmojiBody from '@screens/App/React/Emoji/EmojiBody';
import EmojiFace from '@screens/App/React/Emoji/EmojiFace';
import EmojiPeople from '@screens/App/React/Emoji/EmojiPeople';
import EmojiSymbol from '@screens/App/React/Emoji/EmojiSymbol';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const EmojiTopTab = createMaterialTopTabNavigator();

export const EmojiTopRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EmojiTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <EmojiTopTab.Screen name="EmojiFace" options={{ tabBarLabel: '🙂' }}>
        {props => <EmojiFace {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen name="EmojiBody" options={{ tabBarLabel: '👍' }}>
        {props => <EmojiBody {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen name="EmojiSymbol" options={{ tabBarLabel: '💚' }}>
        {props => <EmojiSymbol {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen name="EmojiAnimal" options={{ tabBarLabel: '🦉' }}>
        {props => <EmojiAnimal {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen name="EmojiPeople" options={{ tabBarLabel: '👼' }}>
        {props => <EmojiPeople {...props} route={route} />}
      </EmojiTopTab.Screen>
    </EmojiTopTab.Navigator>
  );
};

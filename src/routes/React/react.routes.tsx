import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  screenOptionsDefault,
  screenOptionsTopDefault,
} from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import { EmojiProvider } from '@contexts/emoji';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Custom from '@screens/Custom';

const EmojiTopTab = createMaterialTopTabNavigator();

export const EmojiTopRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EmojiTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <EmojiTopTab.Screen
        name="EmojiAnimal"
        options={{ tabBarLabel: 'Animal' }}
      >
        {props => <Custom {...props} route={route} />}
      </EmojiTopTab.Screen>
      <EmojiTopTab.Screen name="EmojiBody" options={{ tabBarLabel: 'Corpo' }}>
        {props => <Custom {...props} route={route} />}
      </EmojiTopTab.Screen>
      {/*
      <EmojiTopTab.Screen
        name="EmojiAnimal"
        options={{ tabBarLabel: 'Animal' }}
      >
        {props => <EmojiAnimal {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen
        name="EmojiBody"
        options={{ tabBarLabel: 'Corpo' }}
      >
        {props => <EmojiBody {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen
        name="EmojiFace"
        options={{ tabBarLabel: 'Cara' }}
      >
        {props => <EmojiFace {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen
        name="EmojiPeople"
        options={{ tabBarLabel: 'Pessoa' }}
      >
        {props => <EmojiPeople {...props} route={route} />}
      </EmojiTopTab.Screen>

      <EmojiTopTab.Screen
        name="EmojiSymbol"
        options={{ tabBarLabel: 'Símbolo' }}
      >
        {props => <EmojiSymbol {...props} route={route} />}
      </EmojiTopTab.Screen> */}
    </EmojiTopTab.Navigator>
  );
};

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

        {/* <ReactStackTab.Screen name="ReactConfirm" options={{ headerShown: false }}>
        {props => <ReactConfirm {...props} route={route} />}
      </ReactStackTab.Screen> */}

        <ReactStackTab.Screen name="ReactConfirm" component={Custom} />
      </ReactStackTab.Navigator>
    </EmojiProvider>
  );
};

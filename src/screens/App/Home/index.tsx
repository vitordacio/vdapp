import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import React, { useEffect, useState } from 'react';
import { HomeTopRoutes } from '@routes/home.routes';
import { Button } from '@components/Button';
import {
  ParamListBase,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './styles';

const Home: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
  route,
}) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case 'ForYou':
        setDescription('Acontecendo agora próximo a você');
        break;
      case 'Latest':
        setDescription('Descubra as novidades mais recentes');
        break;
      case 'Trending':
        setDescription('Em destaque no momento');
        break;
      default:
        setDescription('Acontecendo agora próximo a você');
        break;
    }
  }, [route]);

  return (
    <AppView>
      <View style={styles.content}>
        <Button
          style={{ width: '100%' }}
          svgSize={22}
          onPress={() => navigation.push('Map')}
          title="Abrir Mapa"
          svg="map"
        />

        <Text style={styles.description}>{description}</Text>
      </View>

      <HomeTopRoutes />
    </AppView>
  );
};

export default Home;

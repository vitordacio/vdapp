import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import React, { useEffect, useState } from 'react';
import { HomeTopRoutes } from '@routes/home.routes';
import { Button } from '@components/Button';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

const Home: React.FC<AppProps> = ({ navigation, route }) => {
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
          iconSize={22}
          onPress={() => navigation.push('Map')}
          title="Abrir Mapa"
          icon="map"
        />

        <Text style={styles.description}>{description}</Text>
      </View>

      <HomeTopRoutes navigation={navigation} route={route} />
    </AppView>
  );
};

export default Home;

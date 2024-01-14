import React, { useEffect, useState } from 'react';
import { AppProps } from '@routes/App/app.routes';
import { View } from '@components/View';
import { Image } from 'react-native';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { formatDate } from '@utils/formaters';
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable } from '@components/Pressable';
import { Loading } from '@components/View/Loading';
import styles from './styles';

const EventMoments: React.FC<AppProps> = ({ navigation, route }) => {
  const {
    event_moments: { moments, selected_moment },
    user: self,
  } = route.params;

  // const [moment, setMoment] = useState<IMoment>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const moment = moments[currentIndex];

  const handlePreview = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex < 0 ? moments.length - 1 : prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex >= moments.length ? 0 : nextIndex);
  };

  const handleAuthor = () => {
    if (self.id_user === moment.author.id_user)
      return navigation.navigate('User');

    route.params.user_profile = moment.author;
    return navigation.push('Profile');
  };

  useEffect(() => {
    const index = moments.findIndex(
      dataMoment => dataMoment.id_moment === selected_moment.id_moment,
    );
    setCurrentIndex(index !== -1 ? index : 0);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {moment ? (
        <View style={styles.container}>
          <View style={styles.control}>
            <Button
              title="Anterior"
              type="blue"
              style={{ flex: 1 }}
              onPress={handlePreview}
            />
            <Button
              title="Próximo"
              type="blue"
              style={{ flex: 1 }}
              onPress={handleNext}
            />
          </View>
          <View style={styles.image}>
            <Image
              source={{ uri: moment.img_url }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
          </View>
          <Pressable onPress={handleAuthor} style={styles.container_author}>
            <Text style={styles.author}>@{moment.author.name}</Text>
          </Pressable>
          <View style={styles.container_data}>
            <Text style={styles.title}>{moment.title}</Text>
            <Text style={styles.description}>{moment.description}</Text>
            <Text style={styles.created_at}>
              {formatDate(moment.created_at)}
            </Text>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default EventMoments;

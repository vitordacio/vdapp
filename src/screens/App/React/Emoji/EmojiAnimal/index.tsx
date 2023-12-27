import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/app.routes';
import { Loading } from '@components/View/Loading';
import useEmoji from '@contexts/emoji';
import { IEmoji } from '@interfaces/emoji';
import { emojiService } from '@services/Emoji';
import { Button } from '@components/Button';
import styles from '../styles';

let loadMore = true;

const EmojiAnimal: React.FC<AppProps> = ({ navigation }) => {
  const { emojiAnimal, setEmojiAnimal, loadingEmoji, setLoadingEmoji } =
    useEmoji();
  const { throwError } = useMessage();

  const [page, setPage] = useState(2);

  const fetchNewData = async () => {
    setLoadingEmoji(true);
    let animals: IEmoji[];

    try {
      animals = await emojiService.findEmojiAnimal({
        page,
      });

      if (animals.length === 0) {
        loadMore = false;
      }

      setEmojiAnimal(prev => [...prev, ...animals]);
      setPage(page + 1);
      setLoadingEmoji(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: IEmoji }) => {
      // return <CardUser navigation={navigation} route={route} user={item} />;
      return (
        <Button
          title={item.value}
          style={{ width: 40 }}
          onPress={() => navigation.push('ReactConfirm')}
        />
      );
    },
    [emojiAnimal],
  );

  const keyExtractor = useCallback((item: IEmoji) => `${item.id_emoji}`, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [emojiAnimal]);

  const onEndReached = () => {
    if (loadMore) {
      fetchNewData();
    }
  };

  const listFooterComponent = useCallback(() => {
    return <Loading size={80} />;
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={emojiAnimal}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={loadingEmoji && listFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EmojiAnimal;

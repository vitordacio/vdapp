import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/App/app.routes';
import { Loading } from '@components/View/Loading';
import useEmoji from '@contexts/emoji';
import { IEmoji } from '@interfaces/emoji';
import { emojiService } from '@services/Emoji';
import { Button } from '@components/Button';
import styles from '../styles';

let loadMore = true;

const EmojiBody: React.FC<AppProps> = ({ navigation, route }) => {
  const { emojiBody, setEmojiBody, loadingEmoji } = useEmoji();
  const { throwError } = useMessage();

  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const handleReactConfirm = (item: IEmoji) => {
    route.params.react = { ...route.params.react, emoji: item };
    navigation.push('ReactConfirmCreate');
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let animals: IEmoji[];

    try {
      animals = await emojiService.findEmojiBody({
        page,
      });

      if (animals.length === 0) {
        loadMore = false;
      }

      setEmojiBody(prev => [...prev, ...animals]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: IEmoji }) => {
      return (
        <Button
          title={item.value}
          style={{ width: 40 }}
          onPress={() => handleReactConfirm(item)}
        />
      );
    },
    [emojiBody],
  );

  const keyExtractor = useCallback((item: IEmoji) => `${item.id_emoji}`, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [emojiBody]);

  const onEndReached = () => {
    if (loadMore) {
      fetchNewData();
    }
  };

  const listFooterComponent = useCallback(() => {
    return <Loading size={80} />;
  }, []);

  return (
    <View style={styles.container}>
      {!loadingEmoji && (
        <FlatList
          data={emojiBody}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          ListFooterComponent={showLoader && listFooterComponent}
          showsHorizontalScrollIndicator={false}
          numColumns={6}
          columnWrapperStyle={styles.wrapper}
        />
      )}
    </View>
  );
};

export default EmojiBody;

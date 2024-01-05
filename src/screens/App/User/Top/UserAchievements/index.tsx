import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IAchievement } from '@interfaces/achievement';
import { achievementService } from '@services/Achievement';
import useMessage from '@contexts/message';
import CardAchievement from '@components/Card/Achievement';
import { AppProps } from '@routes/App/app.routes';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

let loadMore = true;

const UserAchievements: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [data, setData] = useState<IAchievement[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let achievements: IAchievement[];

    try {
      achievements = await achievementService.findByUserId({
        user_id: user.id_user,
        page: 1,
      });

      if (achievements.length === 0) {
        loadMore = false;
      }

      setData(achievements);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let achievements: IAchievement[];

    try {
      achievements = await achievementService.findByUserId({
        user_id: user.id_user,
        page,
      });

      if (achievements.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...achievements]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CardAchievement
          route={route}
          navigation={navigation}
          achievement={item}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback(
    (item: IAchievement) => `${item.id_achievement}`,
    [],
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [data]);

  const onEndReached = () => {
    if (loadMore) {
      fetchNewData();
    }
  };

  const listFooterComponent = useCallback(() => {
    return <Loading size={80} />;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={showLoader && listFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserAchievements;

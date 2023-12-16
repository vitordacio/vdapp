import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { IEvent } from '@interfaces/event';
import { SearchInput } from '@components/Input/SearchInput';
import useEvent from '@contexts/event';
import { Loading } from '@components/View/Loading';
import useMessage from '@contexts/message';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import CardUserInfo from '@components/Card/User/Info';
import styles from './styles';

let loadMore = true;

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

const EventInvite: React.FC<EventProps> = ({ navigation }) => {
  const {
    searchInvite,
    setSearchInvite,
    debouncedSearchInvite,
    refreshingInviteSearch,
    setRefreshingInviteSearch,
  } = useEvent();
  const { throwError } = useMessage();

  const [data, setData] = useState<IUser[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    setShowLoader(true);

    let users: IUser[];

    try {
      users = await userService.searchUserByName({
        name: debouncedSearchInvite,
        page: 1,
      });

      if (users.length === 0) {
        loadMore = false;
      }

      setData(users);
      setShowLoader(false);
      if (refreshingInviteSearch) setRefreshingInviteSearch(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let users: IUser[];

    try {
      users = await userService.searchUserByName({
        name: searchInvite,
        page,
      });

      if (users.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...users]);
      setPage(page + 1);
      setShowLoader(false);
      if (refreshingInviteSearch) setRefreshingInviteSearch(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CardUserInfo
          user={item}
          onPress={() => navigation.push('EventInviteConfirm', { user: item })}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback((item: IUser) => `${item.id_user}`, []);

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
  }, [debouncedSearchInvite, refreshingInviteSearch]);

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pesquise um usuário</Text>
        <View style={styles.input}>
          <SearchInput
            handlePress={() => navigation.push('EventInviteConfirm')}
            onChangeText={e => setSearchInvite(e)}
            value={searchInvite}
          />
        </View>
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
      </ScrollView>
    </AppView>
  );
};

export default EventInvite;

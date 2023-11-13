import React, { useEffect, useState } from 'react';
import { ParamListBase, useRoute } from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import CardUser from '@components/Card/User';
import { FindFriends } from '@services/User/FindFriends';
import { IUser } from '@interfaces/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchUser } from '@services/User/SearchUser';
import styles from './styles';

type UserParam = ParamListBase & {
  user?: IUser;
};

const Friends: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const route = useRoute();

  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);

  const handleFriendsSearch = async () => {
    if (!search) return;
    try {
      const { data } = await SearchUser(search);
      setFriends(data);
    } catch (error) {
      setFriends([]);
    }
  };

  useEffect(() => {
    const { user } = route.params as UserParam;

    const fetchFriends = async () => {
      try {
        const { data } = await FindFriends(user.id_user);
        setFriends(data);
      } catch (error) {
        setFriends([]);
      }
    };

    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <SearchInput
            handlePress={handleFriendsSearch}
            onChangeText={e => setSearch(e)}
            value={search}
          />
          <ScrollView
            style={styles.friends}
            showsVerticalScrollIndicator={false}
          >
            {friends &&
              friends.map((friend, index) => (
                <CardUser navigation={navigation} key={index} user={friend} />
              ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Friends;

import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import CardUser from '@components/Card/User';
import styles from './styles';

const Friends = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);

  const handleFriendsSearch = () => {
    console.log(search);
  };

  useEffect(() => {
    setFriends([
      {
        id: 1,
        picture: '',
        username: 'username',
        name: 'Nome de usuário',
        friendship: false,
      },
      {
        id: 2,
        picture: '',
        username: 'username2',
        name: 'Nome de usuário2',
        friendship: true,
      },
    ]);
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
              friends.map(user => (
                <CardUser navigation={navigation} key={user.id} user={user} />
              ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Friends;

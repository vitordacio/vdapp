import React from 'react';
import { Text } from 'react-native';

const User = ({ route }) => {
  const { user } = route.params;

  return (
    <>
      {user && (
        <>
          <Text>{user.username}</Text>
          <Text>{user.name}</Text>
        </>
      )}
    </>
  );
};

export default User;

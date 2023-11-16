import { AppView } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
// import styles from './styles';

const Search: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Explorar',
    });
  }, [navigation]);

  return <AppView>NOTIFICATIONS</AppView>;
};

export default Search;

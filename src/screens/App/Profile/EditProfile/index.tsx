import { Feather } from '@expo/vector-icons';
import { Text } from '@components/Text';
import { CoverPhoto } from '@components/Profile/CoverPhoto';
import { Picture } from '@components/Profile/Picture';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import colors from '@styles/colors';
import styles from './styles';

const EditProfile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const handleEditUsername = async () => {
    navigation.navigate('EditUsername');
  };

  // const handleEditPassword = async () => {
  //   navigation.navigate('EditPassword');
  // };

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CoverPhoto />
          <View>
            <Picture />
            <Feather name="camera" size={28} color={`${colors.TEXT_DEFAULT}`} />
          </View>
          <View style={styles.edit_username}>
            <Text style={styles.username}>@nomedeusuario</Text>
            <TouchableOpacity onPress={handleEditUsername}>
              <Feather name="edit" size={28} color={`${colors.TEXT_DEFAULT}`} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default EditProfile;

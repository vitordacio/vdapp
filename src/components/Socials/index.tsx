import { FlatList, ImageBackground, Linking } from 'react-native';
import { Pressable } from '@components/Pressable';
import { View } from '@components/View';
import assets from '@assets/index';
import { useCallback } from 'react';
import { IUserSocial } from '@interfaces/social_network';
import useMessage from '@contexts/message';
import styles from './styles';

interface ISocialProps {
  name: IUserSocial['type']['name'];
  size?: number;
}

export const Social = ({ name, size }: ISocialProps) => {
  return (
    <ImageBackground
      style={{ width: size || 30, height: size || 30 }}
      source={assets[name]}
    />
  );
};

interface ISocialsProps {
  socials: IUserSocial[];
}

export const Socials: React.FC<ISocialsProps> = ({ socials }) => {
  const { throwError } = useMessage();

  const handlePress = async (item: IUserSocial) => {
    const formattedUrl = `${item.type.base_url}${item.username}`;
    const supported = await Linking.canOpenURL(formattedUrl);

    if (supported) {
      await Linking.openURL(formattedUrl);
    } else {
      throwError(`Não é possível abrir o URL: ${formattedUrl}`);
    }
  };

  const keyExtractor = useCallback(
    (item: IUserSocial) => `${item.id_social_network}`,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: IUserSocial }) => {
      return (
        <Pressable onPress={() => handlePress(item)}>
          <Social name={item.type.name} />
        </Pressable>
      );
    },
    [socials],
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ width: 21 }} />;
  }, [socials]);

  return (
    <>
      {socials && (
        <FlatList
          style={styles.container}
          data={socials}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      )}
    </>
  );
};

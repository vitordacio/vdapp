import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  Linking,
} from 'react-native';
import { Pressable } from '@components/Pressable';
import { View } from '@components/View';
import assets from '@assets/index';
import { useCallback, useEffect, useState } from 'react';
import { IUserSocial } from '@interfaces/social_network';
import styles from './styles';

const assetMapping: Record<string, ImageSourcePropType> = {
  instagram: assets.instagram,
  tiktok: assets.tiktok,
  twitter: assets.twitter,
  twitch: assets.twitch,
  youtube: assets.youtube,
};

interface ISocialsProps {
  socials: IUserSocial[];
}

export const Socials: React.FC<ISocialsProps> = ({ socials }) => {
  const [data, setData] = useState<IUserSocial[] | []>([]);

  const handlePress = async (item: IUserSocial) => {
    const formattedUrl = `${item.type.base_url}${item.username}`;
    const supported = await Linking.canOpenURL(formattedUrl);

    if (supported) {
      await Linking.openURL(formattedUrl);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Não é possível abrir o URL: ${formattedUrl}`);
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
          <ImageBackground
            style={styles.social}
            source={assetMapping[item.type.type]}
          />
        </Pressable>
      );
    },
    [data],
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ width: 21 }} />;
  }, [data]);

  useEffect(() => {
    setData(socials);
  }, []);

  return (
    <FlatList
      style={{ marginBottom: 8 }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={itemSeparatorComponent}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    />
  );
};

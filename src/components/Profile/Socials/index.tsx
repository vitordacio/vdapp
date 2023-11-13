// import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { Pressable } from '@components/Pressable';
import { View } from '@components/View';
import assets from '@assets/index';
import styles from './styles';

const assetMapping: Record<string, ImageSourcePropType> = {
  instagram: assets.instagram,
  tiktok: assets.tiktok,
  twitter: assets.twitter,
  twitch: assets.twitch,
  youtube: assets.youtube,
};

interface ISocialProps {
  social: keyof typeof assetMapping;
}

export const Social: React.FC<ISocialProps> = ({ social }) => {
  const socialAsset = assetMapping[social];

  return (
    <Pressable>
      <ImageBackground style={styles.social} source={socialAsset} />
    </Pressable>
  );
};

interface ISocialsProps {
  socials: string[];
}

export const Socials: React.FC<ISocialsProps> = ({ socials }) => {
  return (
    <View style={styles.container}>
      {socials.map((social, index) => (
        <Social key={index} social={social} />
      ))}
    </View>
  );
};

import { Text } from '@components/Text';
import { AppView } from '@components/View';
import styles from './styles';

const NotFoundProfile = () => {
  return (
    <AppView>
      <Text
        style={styles.text}
      >{`Ops, parece que esse perfil não existe mais! :(`}</Text>
    </AppView>
  );
};

export default NotFoundProfile;

import { Text } from '@components/Text';
import { AppView } from '@components/View';
import styles from './styles';

const NotFoundEvent = () => {
  return (
    <AppView>
      <Text
        style={styles.text}
      >{`Ops, parece que esse evento não existe mais! :(`}</Text>
    </AppView>
  );
};

export default NotFoundEvent;

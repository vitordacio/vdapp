import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { IAchievement } from '@interfaces/achievement';
import { AppProps } from '@routes/App/app.routes';
import { formatDate } from '@utils/formaters';
import styles from './styles';
import { handleAchievementMessage } from './handler';

type CardAchievementProps = AppProps & {
  achievement: IAchievement;
};

const CardAchievement: React.FC<CardAchievementProps> = ({
  achievement,
  route,
}) => {
  const { user: self } = route.params;
  const message = handleAchievementMessage(achievement);

  return (
    <>
      {achievement && (
        <View
          style={[
            styles.container,
            achievement.type.difficulty === 1 && styles.difficulty_1,
            achievement.type.difficulty === 2 && styles.difficulty_2,
            achievement.type.difficulty === 3 && styles.difficulty_3,
          ]}
        >
          {message && (
            <Text style={[styles.text, styles.text_default_color]}>
              {message}
            </Text>
          )}
          {achievement.created_at && (
            <Text style={[styles.text, styles.text_gray_color]}>
              {formatDate(achievement.created_at, self.locale)}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default CardAchievement;

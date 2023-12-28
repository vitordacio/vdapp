import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import colors from '@styles/colors';
import { AppProps } from '@routes/App/app.routes';

const Custom: React.FC<AppProps> = () => {
  return (
    <View
      style={{ minHeight: 600, backgroundColor: `${colors.GRAY_BACKGROUND}` }}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>Custom</Text>
    </View>
  );
};

export default Custom;

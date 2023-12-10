import { Button } from '@components/Button';
import { View } from '@components/View';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import useMessage from '@contexts/message';

const Home: React.FC<BottomTabScreenProps<ParamListBase>> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}) => {
  const { handleEntering, handleExiting, setMessage } = useMessage();

  return (
    <View>
      <Button
        title="ENTRADA"
        style={{ backgroundColor: 'green', marginTop: 100 }}
        onPress={() => {
          setMessage('ENTRANDO');
          handleEntering();
        }}
      />
      <Button
        title="SAÍDA"
        style={{ backgroundColor: 'red', marginTop: 15 }}
        onPress={() => {
          setMessage('SAINDO');
          handleExiting();
        }}
      />
    </View>
  );
};

export default Home;

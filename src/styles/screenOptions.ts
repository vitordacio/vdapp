import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { IUser } from '@interfaces/user';
import colors from './colors';

type screenOptionsProps = {
  title?: string;
  backgroundColor?: string;
  color?: string;
  tintColor?: string;
  titleAlign?: 'center' | 'left';
};

export const screenOptionsDefault = ({
  title,
  backgroundColor,
  color,
  tintColor,
  titleAlign,
}: screenOptionsProps): NativeStackNavigationOptions => {
  return {
    headerTitle: title || undefined,
    headerStyle: {
      backgroundColor: backgroundColor || `${colors.BLACK}`,
    },
    headerTitleStyle: {
      color: color || `${colors.WHITE}`,
    },
    headerTintColor: tintColor || `${colors.WHITE}`,
    headerTitleAlign: titleAlign || 'center',
  };
};

type screenOptionsTopProps = {
  color?: string;
  backgroundColor?: string;
  colorSelected?: string;
};

export const screenOptionsTopDefault = ({
  color,
  backgroundColor,
  colorSelected,
}: screenOptionsTopProps): MaterialTopTabNavigationOptions => {
  return {
    tabBarLabelStyle: { color: color || `${colors.WHITE}` },
    tabBarStyle: { backgroundColor: backgroundColor || `${colors.BLACK}` },
    tabBarIndicatorStyle: {
      backgroundColor: colorSelected || `${colors.GOLD}`,
    },
  };
};

type screenOptionsFriendsTitle = {
  user: IUser;
  user_friends?: IUser;
};

export const screenOptionsFriendsTitle = ({
  user,
  user_friends,
}: screenOptionsFriendsTitle): string => {
  if (user_friends && user.id_user === user_friends.id_user)
    return 'Seus Amigos';
  return user_friends ? `Amigos de ${user_friends.name}` : `Amigos`;
};

type screenOptionsReactsReceivedTitle = {
  user: IUser;
  user_reacts_received?: IUser;
};

export const screenOptionsReactsReceivedTitle = ({
  user,
  user_reacts_received,
}: screenOptionsReactsReceivedTitle): string => {
  if (user_reacts_received && user.id_user === user_reacts_received.id_user)
    return 'Suas Reações';
  return user_reacts_received
    ? `Reações de ${user_reacts_received.name}`
    : `Reações`;
};

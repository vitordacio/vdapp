import Custom from '@screens/Custom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OwnProfile from '@screens/Profile/OwnProfile';

const ProfileTopTab = createMaterialTopTabNavigator();

export const ProfileTopTabRoutes: React.FC = () => {
  return (
    <ProfileTopTab.Navigator screenOptions={{}}>
      <ProfileTopTab.Screen name="Events" component={Custom} />
      <ProfileTopTab.Screen name="Participations" component={Custom} />
      <ProfileTopTab.Screen name="EmojisSent" component={Custom} />
      <ProfileTopTab.Screen name="Achievements" component={Custom} />
    </ProfileTopTab.Navigator>
  );
};

const ProfileStackTab = createNativeStackNavigator();

const ProfileRoutes: React.FC = () => {
  return (
    <ProfileStackTab.Navigator screenOptions={{}}>
      <ProfileStackTab.Screen name="OwnProfile" component={OwnProfile} />
      <ProfileStackTab.Screen name="Friends" component={Custom} />
      <ProfileStackTab.Screen name="EmojisReceived" component={Custom} />
      <ProfileStackTab.Screen name="EditProfile" component={Custom} />
      <ProfileStackTab.Screen name="Inbox" component={Custom} />
    </ProfileStackTab.Navigator>
  );
};

export default ProfileRoutes;

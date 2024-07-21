import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type RootTabParamList = {
  Settings: undefined;
  Profile: undefined;
};

export type RootDrawerParamList = {
  Stack: NavigatorScreenParams<RootStackParamList>;
  Tabs: undefined;
};

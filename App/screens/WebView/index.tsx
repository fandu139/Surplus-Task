import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { WebView } from 'react-native-webview';
import Colors from '../../theme/colors';

type RouteParams = {
  uri: string;
};

type RootStackParamList = {
  WebViewScreen: RouteParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'WebViewScreen'>;

const WebViewScreen: React.FC<Props> = ({ route }: Props) => {
  return (<WebView source={{ uri: route?.params?.uri }} style={{ flex: 1 }} />);
};

export default WebViewScreen;

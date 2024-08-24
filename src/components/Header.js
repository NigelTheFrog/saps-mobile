import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getHost } from '../utils/host';

const Header = ({ title, desc }) => {
  const store_name = useSelector(state => state.auth.store_name);

  return (
    <View style={{ padding: 16 }}>
      <Image
        source={{ uri: getHost() + '/img/logo.png' }}
        resizeMode="contain"
        style={{ width: 120, height: 120, alignSelf: 'center' }}
      />
      <Text style={{ fontSize: 18, alignSelf: 'center', textAlign: 'center' }}>
        {title ?? 'Selamat Datang di \n' + store_name}
      </Text>
      <Text style={{ alignSelf: 'center' }}>{desc ?? ''}</Text>
    </View>
  );
};

export default Header;

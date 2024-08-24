import * as React from 'react';
import { StyleSheet, Image, View, Button, Text } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { auth, customer as customerSlice } from '../store';
import request from '../utils/request';
import {
  printQueueReceipt,
  printQueueReceiptWithSubstitute,
} from '../utils/printer';
import { getHost } from '../utils/host';
import { useCallback } from 'react';

const CustomerInfo = ({ code, name}) => (
  <View style={{ backgroundColor: '#187de4', padding: 16 }}>
    <Text
      style={{
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        fontSize: 48,
      }}>
      {code}
    </Text>
    <Text style={{ color: '#fff', fontSize: 24 }}>{name}</Text>
  </View>
);

const MarketingInfo = ({ code, name }) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ backgroundColor: '#fff', padding: 16, flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{name}</Text>
      <Text style={{ fontFamily: 'monospace', fontSize: 24, color: '#888' }}>
        {code}
      </Text>
    </View>
    <Image
      style={{ width: 64, height: 64, margin: 16 }}
      source={{ uri: `${getHost()}/img/boy.png` }}
    />
  </View>
);

const QueueCode = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = React.useState(10);
  const [response, setResponse] = React.useState({
    marketer_name: '',
    marketer_code: '',
    queue_code: '',
    substitute_code: '',
    substitute_name: '',
  });
  const customer = useSelector(state => state.customer);
  const storeName = useSelector(state => state.auth.store_name);
  const ordered = route.params?.ordered;

  const onFinish = useCallback(() => {
    dispatch(customerSlice.actions.reset());
    navigation.popToTop();
  }, [dispatch, navigation]);

  React.useEffect(() => {
    if (response.queue_code === '') {
      return;
    }   
    if (timer) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      clearTimeout()
      onFinish();
    }
  }, [timer, response.queue_code, onFinish]);

  React.useLayoutEffect(() => {   
    const errorMsg =
      'Pesanan anda tidak masuk, terjadi kendala teknis, silakan hubungi pegawai terdekat.';
    request
      .post(ordered ? '/customer/ordered' : '/customer', customer)
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          console.error(r);
          dispatch(auth.actions.resetWithError(errorMsg));
        }
      })
      .then(r => setResponse(r))
      .catch(() => dispatch(auth.actions.resetWithError(errorMsg)));
  }, []);

  React.useEffect(() => {
    if (response.queue_code) {
      if (response.substitute_code) {
        printQueueReceiptWithSubstitute(
          customer.CustomerName,
          storeName,
          response.queue_code,
          response.marketer_code,
          response.marketer_name,
          response.substitute_code,
          response.substitute_name,
        );
      } else {
        printQueueReceipt(
          customer.CustomerName,
          storeName,
          response.queue_code,
          response.marketer_code,
          response.marketer_name,
        );
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Header title="Kode Antrian Anda" />
      <Card mb={16} w="100%">
        <CustomerInfo name={customer.CustomerName} code={response.queue_code} />
        <MarketingInfo
          name={response.marketer_name}
          code={response.queue_code?.split('-')[0]}
        />
      </Card>
      <Button title="Selesai" color={colors.primary} onPress={onFinish} />
      <Text style={{ color: '#444', marginTop: 16 }}>
        Antrian tercetak, halaman akan tertutup dalam {timer} detik.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.background,
    padding: 16,
  },
});

export default QueueCode;

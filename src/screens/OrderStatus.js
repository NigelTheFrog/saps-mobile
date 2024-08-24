import * as React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { auth, customer as customerSlice } from '../store';

const OrderStatus = ({ navigation }) => {
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customer);

  return (
    // <View style={{flexDirection: "row", justifyContent: "center", backgroundColor: colors.background}}>
    <View style={styles.container}>
      <Pressable onPress={() => dispatch(auth.actions.reset())}>
        <Header desc="Silakan pilih status pesanan anda" />
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        <Card
          style={styles.orderStatus}
          color={colors.offpink}
          me={16}
          onPress={() => {
            if (customer.isExist === 1) navigation.navigate('QueueCode');
            else navigation.navigate('CustomerType');
          }}>
          <Text style={styles.titleText}>Belum Pesan</Text>
          <Text>Pilih jika anda belum pernah memesan barang</Text>
        </Card>
        <Card
          style={styles.orderStatus}
          color={colors.offgreen}
          onPress={() => {
            if (customer.isExist === 0) {
              navigation.navigate('Marketing');
            } else {
              dispatch(customerSlice.actions.setMarketer(0));
              navigation.navigate('QueueCode', { ordered: true });
            }
          }}>
          <Text style={styles.titleText}>Sudah Pesan</Text>
          <Text>Pilih jika anda sudah pernah memesan barang</Text>
        </Card>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="Kembali"
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: "center",
    backgroundColor: colors.background,
    padding: 18,
  },
  orderStatus: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OrderStatus;

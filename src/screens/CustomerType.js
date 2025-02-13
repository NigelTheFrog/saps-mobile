import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Button } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { customer } from '../store';
import request from '../utils/request';

const { width } = Dimensions.get('window');

const CustomerType = ({ navigation }) => {
  const dispatch = useDispatch();

  const onIndividual = () => {
    dispatch(customer.actions.setType('individual'));
    request
      .get('/getStoreStatus')
      .then(r => {
        return r.json();
      })
      .then((responseJson) => {
        if (responseJson['isManual'] == 1) {
          navigation.navigate('Marketing', { ordered: false });
        } else {          
          navigation.navigate('QueueCode');
        }
      });

  };

  const onInstitution = () => {
    dispatch(customer.actions.setType('institution'));
    navigation.navigate('IndustryCity');
  };

  return (
    <View style={styles.container}>
      <Header desc="Silakan pilih status pesanan anda" />
      <View style={{ flexDirection: 'row' }}>
        <Card
          style={styles.customerType}
          color={colors.offgreen}
          me={16}
          onPress={onIndividual}>
          <Icon size={30} name="user" />
          <Text style={styles.titleText}>Perorangan</Text>
        </Card>
        <Card
          style={styles.customerType}
          color={colors.offpink}
          onPress={onInstitution}>
          <Icon size={30} name="building" />
          <Text style={styles.titleText}>Instansi</Text>
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
  customerType: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    marginTop: 8,
  },
});

export default CustomerType;

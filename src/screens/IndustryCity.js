import * as React from 'react';
import { StyleSheet, View, Button, Text, Pressable } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { auth, customer as customerStore } from '../store';
import request from '../utils/request';

const IndustryCity = ({ navigation }) => {
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customer);
  const type = useSelector(state => state.customer.type)
  const [disabled, setDisabled] = React.useState(true);
  const [city, setCity] = React.useState();
  const [cities, setCities] = React.useState([
    { label: 'Pilih kota', value: 0 },
  ]);
  const [industry, setIndustry] = React.useState();
  const [industries, setIndustries] = React.useState([
    { label: 'Pilih bidang industri', value: 0 },
  ]);


  const a = React

  const onContinue = () => {
    dispatch(customerStore.actions.setCity(city));
    dispatch(customerStore.actions.setIndustry(industry));
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

  React.useEffect(() => {
    request
      .get('/city')
      .then(r => (r.ok ? r.json() : dispatch(auth.actions.reset())))
      .then(r => {
        setCities(r.map(item => ({ label: item.name, value: item.id })));
      })
      .catch(e => dispatch(auth.actions.resetWithError(e.message || e || '')));

    request
      .get('/industry')
      .then(r => (r.ok ? r.json() : dispatch(auth.actions.reset())))
      .then(r => {
        setIndustries(r.map(item => ({ label: item.name, value: item.id })));
      })
      .catch(() => dispatch(auth.actions.resetWithError(e.message || e || '')));
  }, []);

  React.useEffect(() => {
    if (industries.length > 1 && cities.length > 1) {
      request
        .post('/predata', { phone: customer.phone })
        .then(r => r.json())
        .then(r => {
          setIndustry(r.industry_id);
          setCity(r.city_id);
        })
        .catch();
    }
  }, [cities, industries]);

  React.useEffect(() => {
    if (city && industry) setDisabled(false);
  }, [city, industry]);

  return (
    <View style={styles.container}>
      <Header
        title="Pilih Bidang Industri dan Kota"
        desc="Silakan pilih bidang industri dan kota anda"
      />
      <Card p={18} w="100%">
        <Text>Bidang Industri</Text>
        <DropDownPicker
          style={{ marginBottom: 8 }}
          dropDownMaxHeight={120}
          defaultValue={industry ?? 0}
          containerStyle={{ height: 48, marginTop: 8 }}
          onChangeItem={item => item && setIndustry(item.value)}
          items={industries}
        />
        <Text>Kota</Text>
        <DropDownPicker
          style={{ marginBottom: 8 }}
          containerStyle={{ height: 48, marginTop: 8 }}
          dropDownMaxHeight={120}
          defaultValue={city ?? 0}
          onChangeItem={item => item && setCity(item.value)}
          items={cities}
        />
        <Pressable
          disabled={disabled}
          style={[
            styles.button,
            { backgroundColor: disabled ? '#e3e3e3' : colors.primary },
          ]}
          onPress={onContinue}>
          <Text style={{ color: disabled ? '#aaa' : '#fff' }}>LANJUTKAN</Text>
        </Pressable>
      </Card>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
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
    // justifyContent: "center",
    backgroundColor: colors.background,
    padding: 18,
  },
  button: {
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    zIndex: -100,
    backgroundColor: colors.primary,
    marginTop: 64,
  },
});

export default IndustryCity;

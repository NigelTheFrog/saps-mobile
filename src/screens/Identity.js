import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Header from '../components/Header';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { auth, customer as customerSlice } from '../store';
import AvoidingWrapper from '../constants/avoidingwrapper';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import request from '../utils/request';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const Identity = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const customerName = useSelector(state => state.customer.name);

  const [isWaiting, setIsWaiting] = React.useState(true);
  const [name, setName] = React.useState();
  const [customerList, setCustomerList] = React.useState([]);
  const [filteredCustomer, setFilteredCustomer] = React.useState([]);
  const [flatlistNamaHeight, setFlatlistNamaHeight] = React.useState(0);

  const [alamat, setAlamat] = React.useState();
  const [alamatList, setAlamatList] = React.useState([]);
  const [filteredAlamat, setFilteredAlamat] = React.useState([]);
  const [flatlistAlamatHeight, setFlatlistAlamatHeight] = React.useState(0);

  const [phone, setPhone] = React.useState();
  const [nik, setNik] = React.useState();
  const [customerCode, setCustomerCode] = React.useState();
  const [salesCode, setSalesCode] = React.useState();

  const [cityId, setCityId] = React.useState(0);

  const [isAlamatEditable, setIsAlamatEditable] = React.useState(false);

  const [response, setResponse] = React.useState({
    id: 0,
    CustomerName: '',
    Address: '',
    Phone: '',
    KodeSales: '',
    nik: '',
    city_id: '',
    industry_id: '',
    cust_id: '',
    type: "",
    institution_name: ""
  });

  const onContinue = () => {
    if (name === '') {
      return Alert.alert('Data Tidak Lengkap', 'Mohon isi semua data');
    }

    if (phone === '') {
      return Alert.alert('Nomor Telepon Tidak Tersedia', 'Harap isi dulu nomor telepon customer ini di Realting atau buat customer baru');
    }

    dispatch(customerSlice.actions.setPhoneName({
      CustomerName: name,
      Address: alamat,
      Phone: phone,
      nik: nik,
      CustomerCode: customerCode,
      KodeSales: salesCode,
    }));
    dispatch(customerSlice.actions.setExist(1));
    dispatch(customerSlice.actions.setCity(cityId));
    navigation.navigate('OrderStatus');
  };


  function displayCustomerList() {
    setIsWaiting(true);
    const errorMsg =
      'Terjadi kendala teknis, silahkan login ulang';
    request
      .post('/customer-list', ''
      )
      .then((response) => response.json())
      .then(responseData => {
        setIsWaiting(false);
        let arrayOfCustomer = [];
        let filteredData = [];
        const data = responseData['data'];
        const uniqueNames = new Set();
        data.forEach(item => {
          if (!uniqueNames.has(item.CustomerName)) {
            uniqueNames.add(item.CustomerName);
            filteredData.push(item);
          }
        });
        for (var i = 0; i < filteredData.length; i++) {
          arrayOfCustomer.push({
            name: filteredData[i]['CustomerName']
          });
        }
        setCustomerList(arrayOfCustomer);
      })
      .then(r => setResponse(r))
      .catch(() => dispatch(auth.actions.resetWithError(errorMsg)));

  }

  function displayAlamatList(nama) {
    setIsWaiting(true);
    const errorMsg =
      'Terjadi kendala teknis, silahkan login ulang';
    request
      .post('/customer-list/alamat', { name: nama }
      )
      .then((response) => response.json())
      .then(responseData => {
        setIsWaiting(false);
        let arrayOfCustomer = [];
        let filteredData = [];
        const data = responseData['data'];
        const uniqueNames = new Set();
        data.forEach(item => {
          if (!uniqueNames.has(item.CustomerCode)) {
            uniqueNames.add(item.CustomerCode);
            filteredData.push(item);
          }
        });
        if (filteredData.length > 1) {
          for (var i = 0; i < filteredData.length; i++) {
            arrayOfCustomer.push({
              name: filteredData[i]['CustomerName'],
              alamat: filteredData[i]['Address'],
              phone: filteredData[i]['Phone'],
              cust_id: filteredData[i]['CustomerCode'],
              kode_sales: filteredData[i]['KodeSales'],
              nik: filteredData[i]['nik'],
              city_id: filteredData[i]['city_id'],
              // industry_id: filteredData[i]['industry_id'],
              // type: filteredData[i]['type'],              
            });
          }
          setIsAlamatEditable(true);
          setAlamatList(arrayOfCustomer);
        } else if (filteredData.length == 1) {
          if (filteredData[0]['Address'] == null || filteredData[0]['Address'] == '') {
            setIsAlamatEditable(true);
          } else {
            setAlamat(filteredData[0]['Address']);
            setIsAlamatEditable(false);
          }
          setPhone(filteredData[0]['Phone']);
          setCustomerCode(filteredData[0]['CustomerCode']);
          setSalesCode(filteredData[0]['KodeSales']);
          setNik(filteredData[0]['nik'])
          // setCustomerType(filteredData[0]['type']);
          // if (filteredData[0]['type'] == "institution") {
            setCityId(filteredData[0]['city_id']);
          //   setIndustryId(filteredData[0]['industry_id']);
          // }
        }
      })
      .then(r => setResponse(r))
      .catch(() => dispatch(auth.actions.resetWithError(errorMsg)));

  }

  function filterCustomer(text) {
    setName(text);
    setAlamat('');
    setPhone('');

    let filteredData = [];

    for (var i = 0; i < customerList.length; i++) {

      const name = customerList[i].name.toLowerCase();
      if (name.includes(text.toLowerCase())) {
        filteredData.push(customerList[i]);
      }
    }
    if (filteredData.length == 0 || text == '') {
      setFlatlistNamaHeight(0);
    } else {
      setFlatlistNamaHeight(80);
    }
    setFilteredCustomer(filteredData);
  }

  function filterAlamat(text) {
    setAlamat(text);
    let filteredData = [];

    for (var i = 0; i < alamatList.length; i++) {
      // if (alamatList[i].alamat != null) {
      const alamat = alamatList[i].alamat?.toLowerCase();
      if (alamat?.includes(text.toLowerCase())) {
        filteredData.push(alamatList[i]);
      }
      // }
    }
    if (filteredData.length == 0) {
      setFlatlistAlamatHeight(0);
    } else {
      setFlatlistAlamatHeight(80);
    }
    setFilteredAlamat(filteredData);
  }

  React.useEffect(() => {
      displayCustomerList();
      setName('');
      setPhone('');
      setAlamat('');
      setSalesCode('');
  }, [isFocused]);

  return (
    <AvoidingWrapper>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate('PrintConfig')}
          onLongPress={() => dispatch(auth.actions.reset())}>
          <Header />
        </Pressable>
        <View style={{ width: width * 0.8 }}>
          <Modal transparent={true} visible={isWaiting} animationType='none'>
            <View style={styles.modalBackground}>
            <ActivityIndicator size="large" color={colors.primary}/>
            </View>
          </Modal>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ marginBottom: 10 }}>
              Nama <Text style={{ color: '#D32F2F' }}> *</Text>
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                value={name}
                onChangeText={filterCustomer}
                style={{ backgroundColor: "#F3F6F9", color: "#000000", width: '90%' }}
              />
              <TouchableOpacity
                style={{ width: '10%', alignSelf: 'center' }}
                onPress={() => navigation.navigate('CreateCusomter', {
                  paramName: name,
                  paramPhone: phone
                })}
              >
                <Icon size={22} name="user-plus" color={colors.primary} style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: flatlistNamaHeight, marginBottom: 10 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                style={{ alignContent: 'center' }}
                data={filteredCustomer}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      filterCustomer(item.name);
                      setFlatlistNamaHeight(0);
                      displayAlamatList(item.name);
                    }}>
                    <View style={{ paddingLeft: 5, paddingBottom: 5, backgroundColor: "#F3F6F9", marginBottom: 5 }}>
                      <Text style={{ marginTop: 8 }}>
                        {item ? item.name : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.name}
              />
            </SafeAreaView>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={{ marginBottom: 10 }}>
              Alamat <Text style={{ color: '#D32F2F' }}> *</Text>
            </Text>
            <TextInput
              value={alamat}
              onChangeText={filterAlamat}
              style={{ backgroundColor: "#F3F6F9", color: "#000000" }}
              editable={isAlamatEditable}
            />
          </View>
          <View style={{ height: flatlistAlamatHeight, marginBottom: 10 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                style={{ alignContent: 'center' }}
                data={filteredAlamat}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      filterAlamat(item.alamat);
                      setPhone(item.phone);
                      setName(item.name);
                      setCustomerCode(item.cust_id);
                      setFlatlistAlamatHeight(0);
                      setSalesCode(item.kode_sales);
                      setNik(item.nik);
                      setCityId(item.city_id);
                      // setIndustryId(item.industry_id);
                      // setCustomerType(item.type);
                    }}>
                    <View style={{ paddingLeft: 5, paddingBottom: 5, backgroundColor: "#F3F6F9", marginBottom: 5 }}>
                      <Text style={{ marginTop: 8 }}>
                        {item ? item.alamat : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.alamat}
              />
            </SafeAreaView>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10 }}>
              No Telepon (9-14 digit)
            </Text>
            <TextInput
              value={phone}
              keyboardType='number-pad'
              style={{ backgroundColor: "#F3F6F9", color: "#000000" }}
              editable={false}
            />
          </View>
          <Button
            disabled={!name || !alamat}
            title="Lanjutkan"
            color={colors.primary}
            onPress={onContinue}
          />
        </View>
      </View>

    </AvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    marginBottom: 10
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  textVersion: {
    color: colors.gray,
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 8,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTambahPengunjung: {
    paddingLeft: 10, paddingRight: 10,
    height: 40,
    marginLeft: 30,
    width: 180,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    // verticalAlign: 'middle',
    borderRadius: 20
  },
  buttonTambahPengunjungDisabled: {
    paddingLeft: 10, paddingRight: 10,
    height: 40,
    marginLeft: 30,
    width: 180,
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
    // verticalAlign: 'middle',
    borderRadius: 20
  },
  buttonTambahPengunjungText: {
    fontSize: 14,
    color: "#ffffff",
    justifyContent: 'center'
  },
  buttonTambahPengunjungTextDisabled: {
    fontSize: 14,
    color: "#a1a1a1",
    justifyContent: 'center'
  },
});

export default Identity;

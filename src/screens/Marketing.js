import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import request from '../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { customer } from '../store';
import { getHost } from '../utils/host';

const { width } = Dimensions.get('window');


const Marketing = ({ navigation, route }) => {
  const store_id = useSelector(state => state.auth.store_id);
  const type = useSelector(state => state.customer.type);
  const city_id = useSelector(state => state.customer.city_id);
  const industry_id = useSelector(state => state.customer.industry_id);
  const dispatch = useDispatch();
  const [rawData, setRawData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const ordered = route.params?.ordered;

  const onSearch = text => {
    const searchFilter = item =>
      item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase());

    if (text) {
      setData(rawData.filter(searchFilter));
    } else {
      setData(rawData);
    }
  };

  React.useEffect(() => {
    if(type == 'institution') {
      request
      .post(`/getMarketerInstitution`,{ cityId: city_id, industryId: industry_id })
      .then(r => r.json())
      .then(r => {
        setRawData(r);
        setData(r);
      })
      .catch();
    } else {
      request
      .get(`/marketer?store_id=${store_id}`)
      .then(r => r.json())
      .then(r => {
        setRawData(r);
        setData(r);
      })
      .catch();
    }
   
  }, [store_id]);

  const MarketerCard = ({ id, name, phone, code }) => (
    <Pressable style={styles.marketingCard}>
      <Card
        p={18}
        w={width * 0.4}
        onPress={() => {
          dispatch(customer.actions.setMarketer(id));
          navigation.navigate('QueueCode', { ordered: ordered });
        }}>
        <Image
          style={{ width: 64, height: 64, marginBottom: 16 }}
          source={{ uri: `${getHost()}/img/boy.png` }}
        />
        <Text
          style={{
            fontStyle: name === 'Support' ? 'italic' : 'normal',
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 8,
          }}>
          {name}
        </Text>
        {name === 'Support' ? (
          <Text style={{ fontSize: 12 }}>WA: {phone}</Text>
        ) : (
          <Text style={{ fontSize: 12 }}>{code}</Text>
        )}
      </Card>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Header title="Pilih Petugas Marketing" />
      <View
        style={{
          flexDirection: 'row',
          width: width * 0.8 + 16,
          alignSelf: 'center',
        }}>
        <TextInput style={styles.textInput} onChangeText={onSearch} />
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate('OrderStatus')}>
          <Text style={{ color: '#fff' }}>CARI</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: width * 0.9,
          height: 1,
          backgroundColor: 'lightgray',
          alignSelf: 'center',
        }}
      />
      <FlatList
        style={{ flexDirection: 'column' }}
        contentContainerStyle={{ alignItems: 'center' }}
        numColumns={2}
        data={data}
        keyExtractor={item => item.phone}
        renderItem={({ item }) => (
          <MarketerCard
            id={item.id}
            name={item.name}
            phone={item.phone}
            code={item.kodeSales}
            type={item.type}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.background,
  },
  textInput: {
    flex: 1,
    color: '#000',
    marginEnd: 8,
    height: 36,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: colors.gray,
    borderRadius: 4,
  },
  searchButton: {
    height: 36,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
  },
  marketingCard: {
    borderRadius: 8,
    margin: 8,
  },
});

export default Marketing;

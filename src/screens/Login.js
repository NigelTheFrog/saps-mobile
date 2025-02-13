import * as React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { login, system } from '../store';
import { VERSION } from '../constants/app';
import AvoidingWrapper from '../constants/avoidingwrapper';
import { Dropdown } from 'react-native-element-dropdown';


const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const systemState = useSelector(state => state.system);
  const [host, setHost] = React.useState(systemState.host);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [isFocus, setIsFocus] = React.useState(false);
  const [serverData] = React.useState([
    { value: 'http://192.168.88.56/saps-ts/public', label: 'SSS Tanjungsari' },    
    { value: 'http://192.168.3.24', label: 'SSS Raden Saleh' },
    { value: 'http://192.168.88.56/saps-sss-16k/public', label: 'SSS 16K' },
    { value: 'http://192.168.88.56/saps-sss-mabes/public', label: 'SSS Mabes' },
    { value: 'http://192.168.88.56/saps-sss-ltc/public', label: 'SSS LTC' },
    { value: 'http://192.168.88.56/saps-gci/public', label: 'GCI Dupak' },
    { value: 'http://192.168.88.56/saps-sso-bpn/public', label: 'SRM Balikpapan' },
    { value: 'http://192.168.88.56/saps-srm-smg/public', label: 'SRM Semarang' },
    { value: 'http://192.168.88.56/saps-srm-smd/public', label: 'SRM Samarinda' },
    { value: 'http://192.168.88.56/saps-srm-bpn/public', label: 'SRM Balikpapan' },
    { value: 'http://192.168.88.56/saps-rra/public', label: 'RRA' },  
    { value: 'http://192.168.88.56/saps-abb-jyp/public', label: 'ABB Jayapura' },
    { value: 'http://192.168.88.56/saps-abb-amb/public', label: 'ABB Ambon' },
    { value: 'http://192.168.88.56/saps-pst-pnk/public', label: 'PST Pontianak' },
    { value: 'http://192.168.88.56/saps-aas-smg/public', label: 'AAS Semarang' },
    { value: 'http://192.168.88.56/saps-aas-135/public', label: 'AAS 135' },
    { value: 'http://192.168.88.56/saps-aas-c3/public', label: 'AAS C3' },
    { value: 'http://192.168.88.56/saps-aas-b19/public', label: 'AAS B19' },
    { value: 'http://192.168.88.56/saps-smi/public', label: 'SMI' },
    // { value: 'http://192.168.88.56/saps-dev/public', label: 'DEV' },
    // { value: 'http://192.168.100.147:8000', label: 'DEV LOCAL NIGEL' },
  ]);
  

  const onSubmit = () => {
    const body = {
      username: username,
      password: password,
    };

    dispatch(system.actions.setHost(host));
    dispatch(login(body));
  };

  React.useEffect(() => {
    if (authState.is_error) {
      alert(authState.error_msg);
    }
  }, [authState]);

  return (
    <AvoidingWrapper style={colors.background}>
      <View style={styles.container}>
        <Header desc="Silakan masukkan username dan password anda" />
        <Card p={18} w={width * 0.8}>
          {/* <Input value={host} label={'Host'} setter={setHost} autoCapitalize='none' /> */}
          {/* <Dropdownitem label={'Host'} setter={setHost} data={serverData} value={host} valueField="value"/> */}
          <Text style={styles.textLabel}>Host</Text>
          <Dropdown
            style={styles.textInput}
            data={serverData}
            selectedTextProps={{ numberOfLines: 1 }}
            labelField="label"
            valueField="value"
            searchPlaceholder={'Cari...'}
            inputSearchStyle={{ color: 'black' }}
            value={host}
            search={true}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={server => {
              setHost(server.value);
              setIsFocus(false);
            }}
          />
          <Input value={username} label="Username" setter={setUsername} autoCapitalize='none' />
          <Input
            value={password}
            label="Password"
            setter={setPassword}
            password
            autoCapitalize='none'
          />
          <Button title="Login" color={colors.primary} onPress={onSubmit} />
        </Card>
        <View style={{ flex: 1 }} />
        <Text style={styles.textVersion}>{VERSION}</Text>
      </View>
    </AvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.background,
  },
  textVersion: {
    color: colors.gray,
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 8,
  },
  textLabel: {
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: colors.background,
    height: 50,
    color: 'black',
  },
});

export default Login;

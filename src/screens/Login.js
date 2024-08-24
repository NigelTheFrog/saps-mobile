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

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const systemState = useSelector(state => state.system);
  const [host, setHost] = React.useState(systemState.host);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

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
          <Input value={host} label={'Host'} setter={setHost} autoCapitalize='none'/>
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
});

export default Login;

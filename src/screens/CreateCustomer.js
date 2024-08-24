import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Button,
    Alert,
    Pressable,
    Text,
    TextInput,
} from 'react-native';
import Header from '../components/Header';
import colors from '../constants/colors';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { auth, customer as customerSlice } from '../store';
import { VERSION } from '../constants/app';
import AvoidingWrapper from '../constants/avoidingwrapper';


const { width } = Dimensions.get('window');

const CreateCustomer = ({ route, navigation }) => {
    const { paramName, paramPhone } = route.params;
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    const [alamat, setAlamat] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [nik, setNik] = React.useState('');
    const [pic, setPic] = React.useState(paramName);
    const [picPhone, setPicPhone] = React.useState(paramPhone);

    const onContinue = () => {

        dispatch(customerSlice.actions.setPhoneName({
            CustomerName: name,
            Address: alamat,
            Phone: phone,
            pic: pic,
            picPhone: picPhone,
        }));
        dispatch(customerSlice.actions.setExist(0));
        navigation.navigate('OrderStatus');
    };

    return (
        <AvoidingWrapper>
            <View style={styles.container}>
                <Pressable
                    onPress={() => navigation.navigate('PrintConfig')}
                    onLongPress={() => dispatch(auth.actions.reset())}>
                    <Header />
                </Pressable>

                <View style={{ width: width * 0.8 }}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={{ marginBottom: 10 }}>
                            Nama <Text style={{ color: '#D32F2F' }}> *</Text>
                        </Text>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{ backgroundColor: "#F3F6F9", color: "#000000" }}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ marginBottom: 10 }}>
                            No Telpon (9-14 digit) <Text style={{ color: '#D32F2F' }}> *</Text>
                        </Text>
                        <TextInput
                            keyboardType={'phone-pad'}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={{ backgroundColor: "#F3F6F9", color: "#000000" }}
                        />
                    </View>
                    <Button
                        disabled={!name || !phone || phone?.length < 9 || phone?.length > 14 }
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
    textVersion: {
        color: colors.gray,
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 8,
    }
});

export default CreateCustomer;

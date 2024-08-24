import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';
import AvoidingWrapper from '../constants/avoidingwrapper';
import { getHost } from '../utils/host';

const { width } = Dimensions.get('window');

const UpdateWarning = () => {

    return (
        <AvoidingWrapper>
            <View style={styles.container}>
                <View style={{ padding: 16 }}>
                    <Image
                        source={{ uri: getHost() + '/img/logo.png' }}
                        resizeMode="contain"
                        style={{ width: 120, height: 120, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                        Terdapat Aplikasi versi terbaru 
                    </Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>
                        Harap perbarui Aplikasi 
                    </Text>
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
        marginBottom: 10,
    },
});

export default UpdateWarning;

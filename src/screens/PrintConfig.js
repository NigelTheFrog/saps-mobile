import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Button,
  Alert,
  Pressable,
  Text,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import colors from '../constants/colors';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';
import { connectPrinter, printQueueReceipt } from '../utils/printer';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const PrintConfig = ({ navigation }) => {
  const [printers, setPrinters] = React.useState([]);
  const printer = useSelector(state => state.printer);

  React.useEffect(() => {
    BLEPrinter?.init().then(() => {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  });

  return (
    <View style={styles.container}>
      <Header
        title="Konfigurasi Printer Bluetooth"
        desc="Pilih perangkat cetak"
      />
      <Card m={18} p={18} w={width * 0.8}>
        {printers.map(device => (
          <Pressable
            style={[
              {
                marginBottom: 8,
                backgroundColor: '#f2f2f2',
                borderRadius: 4,
                paddingVertical: 4,
                paddingHorizontal: 8,
              },
              printer.inner_mac_address === device.inner_mac_address
                ? {
                    borderWidth: 2,
                    borderColor: colors.primary,
                    backgroundColor: colors.primaryBg,
                  }
                : {},
            ]}
            key={device.inner_mac_address}
            onPress={() => connectPrinter(device)}>
            <Text>{`device_name: ${device.device_name}`}</Text>
            <Text>{`mac_address: ${device.inner_mac_address}`}</Text>
          </Pressable>
        ))}
        <Button
          title="Kembali"
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.background,
  },
});

export default PrintConfig;

import { ToastAndroid } from 'react-native';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';
import dayjs from 'dayjs';
import { store } from '../store';
import { printer } from '../store';

const connectPrinter = device => {
  if (!device) {
    ToastAndroid.show("Can't initiate connection to device");
    return;
  }

  BLEPrinter.connectPrinter(device.inner_mac_address)
    .then(() => store.dispatch(printer.actions.set(device)))
    .then(() =>
      ToastAndroid.show('Printer successfully connected', ToastAndroid.SHORT),
    )
    .catch(() =>
      ToastAndroid.show('Failed to connect the printer', ToastAndroid.SHORT),
    );
};

const printQueueReceipt = (
  customer,
  storeName,
  queueCode,
  locket,
  marketer,
) => {
  const markup =
    '<C>---------------------------</C>\n' +
    `<CM>${storeName}</CM>\n` +
    '<C>---------------------------</C>\n' +
    `<CB>${queueCode}</CB>\n` +
    `<CM>${customer}</CM>\n` +
    '<C>---------------------------</C>\n' +
    `<C>Silakan ke loket ${locket}</C>\n` +
    `<C>${marketer}</C>\n` +
    '<C>---------------------------</C>\n' +
    '<C>Dicetak</C>\n' +
    `<C>${getTodayDateString()}</C>\n` +
    `<C>${getTodayTimeString()}</C>\n` +
    '<C>---------------------------</C>';
  console.log(markup);

  const { printer } = store.getState();

  printer.device_name && BLEPrinter.printBill(markup);
};

const printQueueReceiptWithSubstitute = (
  customer,
  storeName,
  queueCode,
  locket,
  marketer,
  locket_subs,
  marketer_subs,
) => {
  const markup =
    '<C>---------------------------</C>\n' +
    `<CM>${storeName}</CM>\n` +
    '<C>---------------------------</C>\n' +
    `<CB>${queueCode}</CB>\n` +
    `<CM>${customer}</CM>\n` +
    '<C>---------------------------</C>\n' +
    `<C>${locket} tidak di tempat</C>\n` +
    `<C>${marketer}</C>\n` +
    '<C>---------------------------</C>\n' +
    `<C>Silakan ke loket ${locket_subs}</C>\n` +
    `<C>${marketer_subs}</C>\n` +
    '<C>---------------------------</C>\n' +
    '<C>Dicetak</C>\n' +
    `<C>${getTodayDateString()}</C>\n` +
    `<C>${getTodayTimeString()}</C>\n` +
    '<C>---------------------------</C>';
  console.log(markup);

  const { printer } = store.getState();

  printer.device_name && BLEPrinter.printBill(markup);
};

const parseMonth = month => {
  const mapMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'Mei',
    6: 'Jun',
    7: 'Jul',
    8: 'Agu',
    9: 'Sep',
    10: 'Okt',
    11: 'Nov',
    12: 'Des',
  };
  return mapMonth[month];
};

const getTodayDateString = () => {
  const day = dayjs().format('DD');
  const month = dayjs().format('M');
  const year = dayjs().format('YYYY');
  return `${day} ${parseMonth(month)} ${year}`;
};

const getTodayTimeString = () => {
  const time = dayjs().format('HH:mm:ss');
  return `${time} WIB`;
};

export { connectPrinter, printQueueReceipt, printQueueReceiptWithSubstitute };

import { View, Text } from 'react-native'
import * as React from 'react'
import { Dropdown } from 'react-native-element-dropdown';

const [isFocus, setIsFocus] = React.useState(false);
export default Dropdownitem = ({
  label,
  setter,
  value,
  data,
  valueField
}) => (
  <>
    <Text style={styles.textLabel}>{label} {required ? <Text style={{ color: '#D32F2F' }}> *</Text> : ''}</Text>
    <Dropdown
      style={styles.textInput}
      data={data}
      selectedTextProps={{ numberOfLines: 1 }}
      maxHeight={300}
      labelField="label"
      valueField={valueField}
      searchPlaceholder={'Cari...'}
      value={value}
      search={true}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={setter}
    />

  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 32,
  },
  textLabel: {
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: colors.background,
    color: 'black',
  },
});

// export default Dropdownitem;



import * as React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ label, type, setter, value, password, defaultValue, autoCapitalize, required}) => (
  <>
    <Text style={styles.textLabel}>{label} {required ? <Text style={{color: '#D32F2F'}}> *</Text> : ''}</Text>
    <TextInput
      defaultValue={defaultValue}
      autoCapitalize={autoCapitalize ?? 'sentences'}
      value={value}
      style={styles.textInput}
      secureTextEntry={password}
      keyboardType={type ?? 'default'}
      onChangeText={t => setter(t)}
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

export default Input;

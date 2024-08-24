/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import codePush from 'react-native-code-push';

import { CustomerStack, Root } from './src/navigator';
import colors from './src/constants/colors';
import { Provider } from 'react-redux';
import { store } from './src/store';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://eacdac033d3f414e8d17d6f6a15dbd33@o1007792.ingest.sentry.io/5970898',
});

const Section = ({ children, title }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );
};

let App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <Root />
      </NavigationContainer>
    </Provider>
  );
};

App = codePush(App);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

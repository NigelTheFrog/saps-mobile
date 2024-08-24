import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * @typedef {Object} Screen
 * @property {string} name
 * @property {*} component
 * @property {*} [options] - StackNavigationOptions
 */

/**
 * Options for screen navigation
 * @typedef {Object} ScreenOptions
 * @property {*} screensOptions
 * @property {*} stackOptions
 * @property {string} mode -- card | modal
 */

/**
 * Factory for creating stack navigations
 * @param {...Screen} screens - Screen[]
 * @param {ScreensOptions} [options]
 */
export const StackScreenFactory = (screens, options) => {
  const Stack = createStackNavigator();
  

  return () => (
    <Stack.Navigator
      screenOptions={options?.stackOptions ?? {}}
      mode={options?.mode}>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          options={{
            headerShown: false,
            ...options?.screensOptions,
          }}
          {...screen}
        />
      ))}
    </Stack.Navigator>
  );
};

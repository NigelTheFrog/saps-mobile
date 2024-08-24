import * as React from 'react';
import { Dimensions, StyleSheet, Pressable } from 'react-native';

const Card = ({ children, color, p, w, m, mb, me, ms, style, onPress }) => (
  <Pressable
    style={[
      styles.card,
      {
        backgroundColor: color ?? 'white',
        padding: p ?? 0,
        margin: m ?? 0,
        marginBottom: mb ?? 0,
        marginEnd: me ?? 0,
        marginStart: ms ?? 0,
        width: w,
      },
      style,
    ]}
    onPress={onPress}>
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    elevation: 4,
    alignSelf: 'center',
  },
});

export default Card;

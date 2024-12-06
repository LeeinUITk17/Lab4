import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Loading = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;  

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

 
  }, [bounceValue]);


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle]}>
        <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
          <MaterialCommunityIcons name="rocket" size={80} color="#6200ee" />
        </Animated.View>
      </Animated.View>

      {/* Text thông báo */}
      <Text style={styles.text}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default Loading;

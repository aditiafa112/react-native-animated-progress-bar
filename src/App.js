/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar, Animated} from 'react-native';

const ProgressBar = ({step, steps, height}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactive = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
    console.log('data: ', reactive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, width]);

  return (
    <Fragment>
      <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 12,
          fontWeight: '900',
          marginBottom: 8,
        }}>
        {step} / {steps}
      </Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;

          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height,
            width: '100%',
            borderRadius: height,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
    </Fragment>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ProgressBar step={index} steps={10} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});

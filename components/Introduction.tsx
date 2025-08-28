import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Dimensions, StyleSheet, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Introduction({ onComplete }: { onComplete: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const taglineFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a bouncing animation that runs continuously
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ])
    ).start();

    // Start the main animation sequence
    Animated.sequence([
      // First, fade in and animate the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 3,
          useNativeDriver: true,
        }),
        // Add a rotation animation
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
        }),
      ]),
      // Then slide in the text container from bottom
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      // Fade in title and tagline sequentially
      Animated.stagger(200, [
        Animated.timing(titleFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(taglineFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Wait for 2 seconds after animation completes
      setTimeout(() => {
        // Fade out everything with a nice rotation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -height,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 2,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(onComplete);
      }, 2000);
    });
  }, []);

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: ['-45deg', '0deg', '45deg']
                })
              }
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View style={[styles.titleWrapper, { opacity: titleFadeAnim }]}>
          <Text style={styles.titleMAG}>MAG</Text>
          <Text style={styles.titleTrabaho}>trabaho</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.taglineContainer,
            { opacity: taglineFadeAnim }
          ]}
        >
          <Text style={styles.taglineMatch}>Match</Text>
          <Text style={styles.taglineAnd}> and </Text>
          <Text style={styles.taglineGo}>Go</Text>
          <Text style={styles.taglineTrabaho}> Trabaho</Text>
        </Animated.View>

        <Animated.Text 
          style={[
            styles.subtitle,
            { opacity: taglineFadeAnim }
          ]}
        >
          Your Gateway to Local Services
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  textContainer: {
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  titleMAG: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  titleTrabaho: {
    fontSize: 48,
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: 2,
    marginLeft: 8,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  taglineMatch: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  taglineAnd: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
  taglineGo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  taglineTrabaho: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import clothing from '@/assets/images/top_goth_black.jpg';

const GradientButton = ({ title, width = 90 }) => {
  return (
    <TouchableOpacity style={{ width }}>
      <LinearGradient
        colors={['#EF50BE', '#FFB5E8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function App() {
  const dislike = () => {
    Alert.alert('Dislike Button Pressed!');
  };
  const like = () => {
    Alert.alert('Like Button Pressed!');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <View style={styles.buttonRow}>
        <GradientButton title="emo" />
        <GradientButton title="goth" />
        <GradientButton title="dark" />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={clothing}
          style={{ width: 300, height: 300, marginLeft: 10, marginTop: 10 }}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Women's Black Blouse</Text>
      <Text style={styles.description}>$30</Text>
      <Text style={styles.description}>
        Antilia femme black satin puff sleeve ruffle ruched button up
      </Text>

      <View style={styles.containerRow}>
        <TouchableOpacity onPress={dislike}>
          <Ionicons name="close-circle" size={110} color="#9747ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={like}>
          <Ionicons name="heart" size={110} color="#EF50BE" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    paddingTop: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 15,
  },
  gradient: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    paddingLeft: 50,
    paddingTop: 10,
  },
  description: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 2,
  },
});

import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const app = () => {
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <Text style={[styles.subsection, { paddingTop:20 }]}>Likes</Text>
      <View style={styles.containerThreeGrid}>
        <Image
          source={"https://media-photos.depop.com/b1/44456228/2943216441_f8cc10e8c5e24e04aa1b833367c1ffab/P0.jpg"}
          style={{ width: 100, height: 100, marginTop: 10 }}
          resizeMode="contain"
        />
        <Image
          source={"https://media-photos.depop.com/b1/15359016/2924864186_6002103d2ef745cf83bb099b065725d9/P0.jpg"}
          style={{ width: 100, height: 100, marginTop: 10 }}
          resizeMode="contain"
        />
        <Image
          source={"https://media-photos.depop.com/b1/48148051/2910747106_9cc427e35cf64b91b97d662372ce092d/P0.jpg"}
          style={{ width: 100, height: 100, marginTop: 10 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerThreeText}>
        <Text style={styles.subtitle}>Tops</Text>
        <Text style={styles.subtitle}> Bottoms</Text>
        <Text style={styles.subtitle}>Shoes</Text>
      </View>
      <Text style={[styles.subsection, { paddingTop:20 }]}>Outfit Suggestions</Text>
      <Text style={styles.subtitlePadding}>Dark frilly summer outfit</Text>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerThreeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal:25
  },
  containerThreeText: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal:55
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
  subsection: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    paddingLeft: 28,
    paddingTop: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
  subtitlePadding: {
    color: 'white',
    fontSize: 18,
    paddingLeft:28
  },
});
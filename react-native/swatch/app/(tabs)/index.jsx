import { View, Text, StyleSheet, Image } from 'react-native'
import swatch_logo from "@/assets/images/logo.jpg"
import top_swirl from "@/assets/images/top-swirl.png"
import bottom_swirl from "@/assets/images/bottom-swirl.png"
import React from 'react';


const App = () => {
  return (
    <View style={styles.page}>
      <View style = {styles.top_swirl_container}>
        <Image
          source = {top_swirl}
          style = {styles.top_swirl}
        />
      </View>

      <View style = {styles.container}>
        <Image
          source = {swatch_logo}
          style = {styles.logo}
        />
          <Text style = {styles.text}> Swatch your style. </Text>
      </View>

      <View style = {styles.bottom_swirl_container}>
        <Image
          source = {bottom_swirl}
          style = {styles.bottom_swirl}
        />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingBottom: 17,
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  top_swirl_container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  top_swirl: {
    width: '75%',
    height: 200,
    resizeMode: 'contain',
  },
  bottom_swirl_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
  },
  bottom_swirl: {
    width: '75%',
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    marginBottom: 100,
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
import { View, Text, StyleSheet, Image } from 'react-native'
import person from "@/assets/images/jessicachen.png"
import React from 'react'

const app = () => {
  return (
    <View style = {[styles.page,{backgroundColor:'black'}]}>
      <View style = {styles.row}>
        <Image
          source = {person}
          style = {styles.person}
        />
          <Text style = {styles.name}>Jessica Chen</Text>
          {/* <Text style = {styles.bio}>Trying to find my style after years of dressing basic!</Text> */}
          <Text style = {styles.title}>Measurements</Text>
            
      </View>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    pading: 30,
  },
  person: {
    marginLeft: 30,
    marginTop: 30,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  // bio: {
  //   color: 'white',
  //   fontSize: 12,
  //   marginTop: 150,
  // }
})
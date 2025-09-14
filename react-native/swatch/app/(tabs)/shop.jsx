import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as Asset from 'expo-asset';
import Papa from 'papaparse';



export default function OutfitSwiper(){
  const [catalog, setCatalog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadCSV = async () => {
      const csvUrl = FileSystem.asset("clothing.csv".url);
      const csv = await FileSystem.readAsStringAsync(csvUrl);

      const result = papa.parse(csv, {header: true});
      setItems(results.data);  
    }

    
  }, []);

  const swipeLiked = (liked) => {
    if (catalog.length === 0) return;

    const currentItem = catalog[currentIndex];
    console.log("User Swiped: ", liked, currentItem);

    // Tis is not getting the stuff from the /swipe from the app.py 
    // look at line 20-21 in app.py, 
    fetch("http://localhost:8081/swipe", {
      method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: item.title,
        style: item.style,
        type_: item.type,
        color: item.color, 
        url: item.url,
        image: item.image,
        liked: liked? 1:0
      }),
    });
    setCurrentIndex((prev) => (prev + 1) % catalog.length);
  };

  // If done loading
  if (catalog.length === 0) return <p>Loading...</p>;

  const currentItem = catalog[currentIndex];
  

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

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <View style={styles.buttonRow}>
        <GradientButton title="emo" />
        <GradientButton title="goth" />
        <GradientButton title="dark" />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={"https://media-photos.depop.com/b1/44456228/2943216441_f8cc10e8c5e24e04aa1b833367c1ffab/P0.jpg"}
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
        <TouchableOpacity onPress={swipeLiked(0)}>
          <Ionicons name="close-circle" size={110} color="#9747ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={swipeLiked(1)}>
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

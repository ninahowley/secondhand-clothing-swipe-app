import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View } from 'react-native';
import tabBackground from "@/assets/images/tab_background.png"
import swatchLogo from "@/assets/images/swatch_logo.png"

export default function RootLayout() { 
  return (<Tabs screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: "#ffffff",
        fontSize: 40
      },
      headerStyle : {
        backgroundColor: "#9747ff",
        outline: "#000000",
        height:80
      },
      tabBarBackground: () => (
        <Image
        source={tabBackground}
        style={{width:'100%', height:'100%'}}
        resizeMode='cover'
        />
      ),
      tabBarStyle: {
        height:80,
        paddingTop:15
      },
      headerRight: () => (
        <Ionicons name="cart-outline" color={'black'} size={50}
          style={{ width: 90, height: 90, alignContent:'center'}}
          resizeMode="contain"></Ionicons>
      ),
      headerLeft: () => (
        <Image
          source={swatchLogo}
          style={{ width: 100, height: 100, marginLeft: 10, marginTop:10 }}
          resizeMode="contain"
        />
      ),
      tabBarShowLabel:false,
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#000000ff'
    }}>
    <Tabs.Screen name="shop" options={{
      title: "Shop",
      tabBarIcon: ({color, size}) => (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Ionicons name="pricetag-outline" color={color} size={40}></Ionicons>
      </View>
    ),
    }}/>
    <Tabs.Screen name="closet" options={{
    title: "Closet",
    tabBarIcon: ({color, size}) => (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Ionicons name="bag-handle-outline" color={color} size={40}></Ionicons>
      </View>
    )
    }}/>
    <Tabs.Screen name="profile" options={{
    title: "Profile",
    tabBarIcon: ({color, size}) => (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Ionicons name="person-outline" color={color} size={40}></Ionicons>
      </View>
    )
    }}/>
  </Tabs>
  )
}
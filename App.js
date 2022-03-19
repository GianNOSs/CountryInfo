import React, {createContext, useContext, useMemo, useState} from 'react';
import { Box, Text, Button, Flex, NativeBaseProvider, Icon, StatusBar} from 'native-base';
import AppLoading from 'expo-app-loading';
import {useFonts, NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold} from '@expo-google-fonts/nunito-sans';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import { Animated, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold});
  const [DarkMode, setDarkMode] = useState(true);
  const [animation, setanimation] = useState(new Animated.Value(1));
  const [countries, setCountries] = useState([]);

  const AnimatedButton = Animated.createAnimatedComponent(Button);

  const handleAnimation = () => {
    if (DarkMode === false) {
      Animated.timing(animation, {
        toValue:1,
        duration: 800,
        useNativeDriver: false
    }).start()
  } else {
      Animated.timing(animation,{
        toValue:0,
        duration: 800,
        useNativeDriver: false
      }).start()
  }
  }

  const ComponentBackground =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:['hsl(0, 0%, 100%)' , 'hsl(209, 23%, 22%)']
  })

  const TextInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:['hsl(0, 0%, 0%)' , 'hsl(0, 0%, 100%)']
  })

  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["hsl(0, 0%, 95%)" , "hsl(207, 26%, 17%)"]
  })


  const animatedComponentBackground = {
    backgroundColor: boxInterpolation
  }

  const animatedColorStyle = {
    color: TextInterpolation
  }

  const animatedBackgroundStyle = {
    backgroundColor: ComponentBackground
  }

  const handleOnPress = () => {
    requestAnimationFrame(() => {
      DarkMode === true ? setDarkMode(false) : setDarkMode(true)
      handleAnimation();
    });
  }

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
  return (
    <NativeBaseProvider >
      <StatusBar backgroundColor={DarkMode === true ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)"} barStyle={DarkMode === true ? "light-content" : "dark-content"}/>
      <Animated.View style={{flex: 1, ...animatedComponentBackground}}>
        <Animated.View style={{flex: 0, ...animatedBackgroundStyle}} height= "15%">
          <Flex style={{...styles.FlexStyles, marginTop: 20, size: 5, flexDirection: 'row'}} >
            <Animated.Text 
            style={{fontFamily: 'NunitoSans_800ExtraBold', 
            fontSize: 16,
            marginRight: '15%',
              ...animatedColorStyle}}
            >
              Where in the world?
            </Animated.Text>
            <AnimatedButton 
            backgroundColor= "transparent" 
            height= "50%" 
            width= "25%" 
            leftIcon={<Icon as={<Ionicons name= {DarkMode === true ? "md-moon-sharp" : "md-moon-outline"}/>} color={DarkMode === true ? "white" : "black"} size="4" />} 
            onPress= {() => {handleOnPress();}}
            >
              <Animated.Text style={{fontFamily: 'NunitoSans_600SemiBold', 
            fontSize: 15,
            marginRight: '15%',
              ...animatedColorStyle}}
            >
              Dark Mode
            </Animated.Text>
            </AnimatedButton>
          </Flex>
        </Animated.View>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen">
              {props => <HomeScreen {...props} animation={animation} DarkMode={DarkMode}/>}
            </Stack.Screen>
            <Stack.Screen name="DetailsScreen">
              {props => <DetailsScreen {...props} animation={animation} DarkMode={DarkMode}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </Animated.View>
    </NativeBaseProvider>
  );
  }
}

const styles = StyleSheet.create({

  FlexStyles: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
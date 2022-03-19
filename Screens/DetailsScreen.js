import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Flex, Icon, Image, ScrollView, Text} from 'native-base';
import {useFonts, NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold} from '@expo-google-fonts/nunito-sans';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Animated } from 'react-native';

export default function DetailsScreen({navigation, route, animation, DarkMode}) {

  let [fontsLoaded] = useFonts({NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold});
  const { item } = route.params;
  const [nativeNames, setnativeNames] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Languages, setLanguages] = useState("");
  const [Borders, setBorders] = useState([]);
  const PopulationDots = (population) => {
    var parts = population.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }
  const AnimatedButton = Animated.createAnimatedComponent(Button);
  const AnimatedText = Animated.createAnimatedComponent(Text);
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

  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["hsl(0, 0%, 95%)" , "hsl(207, 26%, 17%)"]
  })

  const TextInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["hsl(0, 0%, 0%)" , "hsl(0, 0%, 100%)"]
  })

  const ComponentBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange:["hsl(0, 0%, 100%)" , "hsl(209, 23%, 22%)"]
  })

  const animatedBackgroundStyle = {
    backgroundColor: boxInterpolation
  }

  const animatedColorStyle = {
    color: TextInterpolation
  }

  const animatedComponentBackgroundColor = {
    backgroundColor: ComponentBackgroundColor
  }

  useMemo(() => {
      var tempnativeNames = '';      
      for (var item1 in item.name.nativeName) {
        if (item.name.nativeName.hasOwnProperty(item1)) {
          tempnativeNames = tempnativeNames+item.name.nativeName[item1].common
          tempnativeNames = tempnativeNames+', '
        }
      }
    setnativeNames(tempnativeNames);

    var tempCurrencies = '';      
    for (var item1 in item.currencies) {
      if (item.currencies.hasOwnProperty(item1)) {
        tempCurrencies = tempCurrencies+item.currencies[item1].name
        tempCurrencies = tempCurrencies+', '
      }
      setCurrency(tempCurrencies);
    }

    var tempLanguages = '';      
    for (var item1 in item.languages) {
      if (item.languages.hasOwnProperty(item1)) {
        tempLanguages = tempLanguages+item.languages[item1]
        tempLanguages = tempLanguages+', '
      }
      setLanguages(tempLanguages);
    }
    var tempBorders = '';
    if(item.borders) {
      item.borders.map((item1) => {
        tempBorders = tempBorders+item1;
        tempBorders = tempBorders+",";
      })
    
      fetch('https://restcountries.com/v3.1/alpha?codes='+tempBorders)
      .then((response) => {
        if(!response.ok) {
          throw Error('Coundn\'t find any countries with the given name');
        }
        return response.json();
      })
      .then((json) => setBorders(json))
    }
  }, [])

  return (
    <Animated.View style={{flex: 1, ...animatedBackgroundStyle}}>
    <Card flex= "1" borderRadius="0" borderWidth="12" borderColor="transparent" shadow= "0">
        <AnimatedButton 
        size="10%" 
        height="5%" 
        width="30%" 
        shadow= "8"
        style={{borderRadius: 2, shadowColor: "black", shadowRadius: 5, ...animatedComponentBackgroundColor}}
        leftIcon={<Icon as={<Entypo name= "home"/>} color={DarkMode === true ? "white" : "black"} size="4" />}
        onPress={() => navigation.navigate('HomeScreen')} >
          <Animated.Text style={{fontFamily: "NunitoSans_300Light", ...animatedColorStyle}}>Home</Animated.Text>
        </AnimatedButton>
        <AnimatedButton
        marginTop="5%"  
        size="10%" 
        height="5%" 
        width="30%" 
        shadow= "8"
        style={{borderRadius: 2, shadowColor: "black", shadowRadius: 5, ...animatedComponentBackgroundColor}}
        leftIcon={<Icon as={<AntDesign name= "arrowleft"/>} color={DarkMode === true ? "white" : "black"} size="4" />}
        onPress={() => navigation.goBack()} >
            <Animated.Text style={{fontFamily: "NunitoSans_300Light", ...animatedColorStyle}}>Back</Animated.Text>
        </AnimatedButton>
        <ScrollView marginTop= "15%" flex="1" >
          <Image
            height= "48"
            width= "100%"
            alt= "CountriesImage"
            source={{
            uri: item.flags.png
            }}
          />
          <AnimatedText marginTop="10%" fontFamily= "NunitoSans_800ExtraBold" style={{fontSize: 20, ...animatedColorStyle}} >{item.name.common}</AnimatedText>

          <Flex direction="row" wrap="wrap" marginTop="7%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Native Name: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{nativeNames}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Population: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{PopulationDots(item.population)}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Region: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{item.region}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Sub Region: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{item.subregion}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Capital: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{item.capital}</AnimatedText>
          </Flex>

          <Flex direction="row" wrap="wrap" marginTop="10%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Top Level Domain: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{item.tld}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Currencies: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{Currency}</AnimatedText>
          </Flex>
          <Flex direction="row" wrap="wrap" marginTop="3%">
            <AnimatedText fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 15, ...animatedColorStyle}} >{"Launguages: "}</AnimatedText>
            <AnimatedText fontFamily= "NunitoSans_300Light" style={{fontSize: 15, ...animatedColorStyle}} >{Languages}</AnimatedText>
          </Flex>
          <AnimatedText marginTop="12%" fontFamily= "NunitoSans_600SemiBold" style={{fontSize: 17, ...animatedColorStyle}}>Border Countries:</AnimatedText>
          <Flex direction="row" wrap="wrap" marginTop="3%" align= "flex-start" justify="flex-start">
          {
            Borders.map((border) => {
              return ( 
                <AnimatedButton 
                  key= {border.name.common}
                  marginTop="2%"
                  marginRight="2%"
                  shadow= "8"
                  style={{borderRadius: 2, shadowColor: "black", shadowRadius: 5, ...animatedComponentBackgroundColor}}
                  onPress={() => {navigation.push('DetailsScreen', {item: border});}}
                > 
                <Animated.Text  style={{fontFamily: "NunitoSans_300Light", fontSize: 15, ...animatedColorStyle}}>{border.name.common}</Animated.Text>
                </AnimatedButton>
              );
            })
          }
          </Flex>
        </ScrollView>
    </Card>
    </Animated.View>
  )
}
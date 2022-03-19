import React, { useContext } from 'react';
import { Box, Text, Flex, Card, Image, Button} from 'native-base';
import {useFonts, NunitoSans_300Light ,NunitoSans_600SemiBold, NunitoSans_800ExtraBold} from '@expo-google-fonts/nunito-sans';
import { Animated } from 'react-native';

export default function CountriesComponents  ({item, navigation, animation})  {

  let [fontsLoaded] = useFonts({NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold});
  const PopulationDots = (population) => {
    var parts = population.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }
  const AnimatedCard = Animated.createAnimatedComponent(Card);

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

  return (
    <Button justifyContent="center" marginBottom="10" backgroundColor="transparent" onPress={() => {navigation.navigate('DetailsScreen', {item: item});}}> 
      <Box height="32">
        <Image
          height="32"
          width= "64"
          alt= "CountriesImage"
          source={{
          uri: item.flags.png
          }}
        />
      </Box>
      <AnimatedCard style={{...animatedComponentBackgroundColor}} height= "48" width="64" borderTopRadius="0" borderBottomRadius="5">
        <Flex wrap= "wrap" direction="column" height= "48" width="64">
          <Animated.Text style={{width: "64%", fontSize: 20, fontFamily: "NunitoSans_800ExtraBold", ...animatedColorStyle}}>{item.name.common}</Animated.Text>
          <Flex direction="row" wrap="wrap" marginTop="5%">
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_600SemiBold", ...animatedColorStyle}} >{"Population: "}</Animated.Text>
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_300Light", ...animatedColorStyle}}>{PopulationDots(item.population)}</Animated.Text>
          </Flex>
          <Flex direction="row" wrap="wrap">
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_600SemiBold", ...animatedColorStyle}} >{"Region: "}</Animated.Text>
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_300Light", ...animatedColorStyle}}>{item.region}</Animated.Text>
          </Flex>
          <Flex direction="row" wrap="wrap">
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_600SemiBold", ...animatedColorStyle}} >{"Capital: "}</Animated.Text>
            <Animated.Text width= "64" style={{fontSize: 15, fontFamily: "NunitoSans_300Light", ...animatedColorStyle}}>{item.capital}</Animated.Text>
          </Flex>
        </Flex>
      </AnimatedCard>
      </Button>
  )
}










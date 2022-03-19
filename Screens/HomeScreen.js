import React, {useState, useMemo, useContext} from 'react';
import { Text, SearchIcon, FlatList, Box, Input} from 'native-base';
import {useFonts, NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold} from '@expo-google-fonts/nunito-sans';
import DropDownPicker from 'react-native-dropdown-picker';
import CountriesComponents from '../CountriesComponents';
import { Animated, Platform, KeyboardAvoidingView} from 'react-native';
import FlatListLoader from '../LoadingComponent/FlatListLoader';

const HomeScreen = ({navigation, animation, DarkMode, countries}) => {

  let [fontsLoaded] = useFonts({NunitoSans_300Light, NunitoSans_600SemiBold, NunitoSans_800ExtraBold});
  let [filter, setFilter] = useState([]);
  const renderItem = ({item}) => (<CountriesComponents item={item} navigation={navigation} animation={animation}/>);
  const [Search, setSearch] = useState("");
  const [Countries, setCountries] = useState([]);
  const [FilterSearch, setFilterSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setpage] = useState(0);
  const [IsFiltering, setIsFiltering] = useState(false);
  const [LoadingPending, setLoadingPending] = useState(true);
  const [items, setItems] = useState([
    {label: 'Africa', value: 'Africa'},
    {label: 'America', value: 'Americas'},
    {label: 'Asia', value: 'Asia'},
    {label: 'Europe', value: 'Europe'},
    {label: 'Oceania', value: 'Oceania'}
  ]);

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

  const animatedComponentBackgroundColor = {
    backgroundColor: ComponentBackgroundColor
  }
///////////////////////////////////////////////////////////////////////

useMemo(() => {
  let isMounted = true; 
  fetch('https://restcountries.com/v3.1/all')
  .then((response) => {
   if(!response.ok) {
     throw Error('Coundn\'t find any countries with the given name');
   }
   return response.json();
 })
 .then((json) => {
  if (isMounted){
    setLoadingPending(false); 
    setCountries(json);
 }
})
return () => { isMounted = false };
}, []);

///////////////////////////////////////////////////////////////////////

 useMemo(() => {
  if((filter.length > 0) && (Search !== "")) {
    var templist = [];
    filter.map((filterItem) => {
      Countries.filter(item => item.region === filterItem)
      .map(value => (templist.push(value)))         
    })
    
    setFilterSearch(templist.filter(item => {
      const itemData = item.name.common.toUpperCase();
      const textData = Search.toUpperCase();
      return itemData.indexOf(textData) > -1
    }));
  } else if ((Search !== "") && !(filter.length > 0)){
    setFilterSearch(Countries.filter(item => {
      const itemData = item.name.common.toUpperCase();
      const textData = Search.toUpperCase();
      return itemData.indexOf(textData) > -1
    }));
  } else if ((Search === "") && (filter.length > 0)) {
    var templist = [];
    filter.map((filterItem) => {
      Countries.filter(item => item.region === filterItem)
      .map(value => (templist.push(value)))         
    })
    setFilterSearch(templist);
  } 
   if((Search !== "") || (filter.length > 0)) {
     setIsFiltering(true);
     setpage(0)
   }
   else {
     setIsFiltering(false);
   }
 }, [Search,filter])
///////////////////////////////////////////////////////////////////////

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : ""}
      style={{flex: 1}}
    >
    <Animated.View style={{flex: 1, ...animatedBackgroundStyle}}>
      <Animated.View height="7%"
            marginTop="7%" 
            paddingLeft="5%"
            borderColor="transparent" style={{borderRadius: 5 , marginHorizontal: "3%", ...animatedComponentBackgroundColor}}>
        <Input
            placeholder="Search for a country..."
            placeholderTextColor= {DarkMode === true ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 52%)"}
            flex = "1"
            paddingLeft="8%"
            fontFamily= "NunitoSans_300Light" 
            fontSize="15"  
            backgroundColor = "transparent"
            borderColor="transparent"
            onChangeText={(text) => setSearch(text)}
            color= {DarkMode === true ? "white" : "black"}

            InputLeftElement={<SearchIcon
                color={DarkMode === true ? "white" : "hsl(0, 0%, 52%)"}
                size= "18" style={{ paddingLeft: 35}}/>}
            > 
        </Input>
      </Animated.View>

      <Animated.View style={{
              ...animatedComponentBackgroundColor,
              borderColor: 'transparent',
              borderRadius: 5,
              marginTop: '15%',
              size: '25%',
              width: '55%',
              marginLeft: '3%',
              zIndex: 999,
              flex: open === false ? 0 : 1
            }}>
        <DropDownPicker
            open={open}
            value={filter}
            items={items}
            setOpen={setOpen}
            setValue={setFilter}
            setItems={setItems}
            multiple={true}
            min={0}
            max={5}
            itemSeparator={true}
            placeholder="Filter by Region"
            style={{
              backgroundColor: "transparent",
              borderColor: 'transparent'
            }}
            dropDownContainerStyle={{
              borderColor: 'transparent',
              backgroundColor: DarkMode === true ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)"

            }}
            placeholderStyle={{
              color: DarkMode === true ? "white" : "black",
              fontFamily: "NunitoSans_300Light"
            }}
            listItemLabelStyle={{
              color: DarkMode === true ? "white" : "black",
              fontFamily: "NunitoSans_300Light"
            }}
            selectedItemContainerStyle={{
              backgroundColor: "grey"
            }}
            textStyle={{
              color: DarkMode === true ? "white" : "black"
            }}
        />
        </Animated.View>
        {LoadingPending ? <FlatListLoader/> : 
        <FlatList data={IsFiltering === false ? Countries : FilterSearch} 
        renderItem={renderItem} 
        keyExtractor={item => item.name.common}
        flex="1" 
        marginTop="10" 
        contentContainerStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text color={DarkMode === true ? "white" : "black"} textAlign="center" marginTop="30%">Could't find any countries with the given name</Text>}
        removeClippedSubviews= {true}
        initialNumToRender={5} 
        maxToRenderPerBatch={5}
        windowSize={1.75}
        updateCellsBatchingPeriod={100}
        />   }
    </Animated.View>
    </KeyboardAvoidingView>
  )
}
export default HomeScreen;
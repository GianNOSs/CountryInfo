import React from 'react';
import { Box } from 'native-base';    

import LottieView from 'lottie-react-native';

export default function FlatListLoader  ()  {
    return (
        <Box flex="1" backgroundColor="transparent" justifyContent="center" alignItems="center">
            <LottieView source={require('../assets/8675-loader.json')} autoPlay loop autoSize />
        </Box>
    )
}
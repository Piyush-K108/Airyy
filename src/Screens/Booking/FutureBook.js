import React from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/core'
const FutureBook = () => {4
 const route = useRoute()
 const {bid} = route.params 
  return (
    <View className='h-screen justify-center items-center'>
        <Text className='text-black'>
            {bid}
        </Text>
    </View>
  )
}

export default FutureBook

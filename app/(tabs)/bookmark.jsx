import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full" >    
      <Text className="text-white text-3xl">Extra Tab</Text>
    </SafeAreaView>
  )
}

export default Bookmark
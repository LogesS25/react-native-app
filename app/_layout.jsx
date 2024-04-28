import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
    //slot renders the current child component (like children prop in react)
    return (
        //react fragment - <></>
        // <> 
        //  <Text>Header</Text>
        // <Slot/>
        // <Text>Footer</Text>
        //</>
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}></Stack.Screen>
        </Stack>
    )
}

export default RootLayout


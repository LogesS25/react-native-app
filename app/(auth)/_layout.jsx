//(auth) , folder within paranthesis is a special folder in react 
//it is considered as a route group
//we can add additional pages or features inside it within a special layout

//auth pages does not display in the app so we are putting it in a seperate layout
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen
        name='sign-in'
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name='sign-up'
        options={{
          headerShown:false
        }}
      />
    </Stack>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default _layout
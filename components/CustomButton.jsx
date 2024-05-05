import { TouchableOpacity,Text} from 'react-native'
import React from 'react'

//we need to pass some special props to the custom button 
//to make it a custom reusable component

//to use all the props first destructure them
const CustomButton = ({title,handlePress, ContainerStyles,textStyles,isLoading}) => {
  return (
    //classname : dynamic template string
    <TouchableOpacity 
        onPress={handlePress}
        //this is the opacity of the button once we p   ress it 
        activeOpacity={0.7}
        className={`bg-secondary rounded-xl min-h-[62px] 
        justify-center items-center ${ContainerStyles} ${isLoading ? 'opacity-50':''}`}
        disabled={isLoading}
    >
      <Text className={`text-primary font-psemigold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
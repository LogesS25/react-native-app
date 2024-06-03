import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const {isLoading,isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn) 
    return <Redirect href="/home" />
  
  
    return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full flex justify-center items-center h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode='contain'
          />

          <View className='realtive mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Built By 
              <Text className='text-secondary-200'> Loges S</Text>
            </Text>
            <Image
            source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 -right-2'
            resizeMode='contain'
            />              
          </View>
          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Video Sharing Application
          </Text>

          <CustomButton
            title="Continue with Email"
            //not using hook for routing
            handlePress={()=> router.push('/sign-in')}
            ContainerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}



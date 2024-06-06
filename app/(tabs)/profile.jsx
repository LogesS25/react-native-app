import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import {router} from 'expo-router';

const Profile = () => {

  //we are getting the current user id from GlobalProvider
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  //we use useAppwrite to make the call to searchPosts 
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

    //console.log(query,posts);


  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')

  };

  

  return (
    <SafeAreaView className="bg-primary h-full" >
      <FlatList
        data={posts}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image source={icons.logout} resizeMethod='contain'
                className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover' />
            </View>
            <InfoBox
              title={user?.username}
              contatinerStyles='mt-5'
              titleStyles="text-lg"
            />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        //what will happen if our list is empty
        ListEmptyComponent={() => (
          //<Text className="text-white">Empty</Text>
          <EmptyState
            title="NO VIDEOS FOUND"
            subtitle="No Videos found for this search query"
          />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile
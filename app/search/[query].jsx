import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInputs from '../../components/SearchInputs';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {

  const { query } = useLocalSearchParams()

  //we use useAppwrite to make the call to searchPosts 
  const { data: posts, refetch } = useAppwrite(
    ()=> searchPosts(query)
  );

  //console.log(query,posts);

  useEffect(() => {
    refetch()
  }, [query])


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
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
             <SearchInputs initialQuery={query} />
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

export default Search
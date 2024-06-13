import { View , FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EmptyState } from '../../components/EmptyState'
import { InfoBox } from '../../components/InfoBox'
import { VideoCard } from '../../components/VideoCard'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { useAppwrite } from '../../lib/useAppwrite'

import { useGlobalContext } from '../../context/GlobalProvider'

import { icons } from '../../constants'

import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn  } = useGlobalContext()

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')
  }

  // console.log(posts.title)

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          // <Text className='text-3xl text-white'>{item.title}</Text>
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <Pressable
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </Pressable>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image 
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>
            
            <InfoBox 
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox 
                title={posts?.length || 0}
                subtitle='Posts'
                containerStyles='mr-5'
                titleStyles='text-xl'
              />
              <InfoBox 
                title="1.2k"
                subtitle="Followers"
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
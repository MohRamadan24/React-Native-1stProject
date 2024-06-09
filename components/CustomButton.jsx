import { Pressable, Text } from 'react-native'
import React from 'react'

export const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <Pressable 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
        <Text className={`text-primary font-psemibold text-l ${textStyles}`}>
          {title}
        </Text>
    </Pressable>
  )
}
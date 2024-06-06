import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity className={`bg-secondary`}>
        <Text>CustomButton</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
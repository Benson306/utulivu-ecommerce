import React from 'react'
import { Text, View } from 'react-native'

export default function Preview({route, navigation}) {
    const { id } = route.params;
  return (
    <View>
        <Text>{id}</Text>
    </View>
  )
}

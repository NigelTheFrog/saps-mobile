import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

export default function AvoidingWrapper({children, style}) {
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: style ?? '#ffffff'}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>   
  )
}
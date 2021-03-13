import React from 'react'
import { SafeAreaView } from 'react-native'
import { View,  StyleSheet } from 'react-native'
import { Header, Icon, Text, Button, Image } from 'react-native-elements'
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins'


export default function AboutScreen({navigation}) {
    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_300Light
      });
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Icon name='keyboard-backspace' onPress={() => navigation.push('HomeScreen')}/>
                <View style={{margin : 12}}>                    
                    <Text h4>Tentang</Text>
                </View>
                <Text style={{alignSelf : 'center', marginTop : 24, fontSize : 24, fontFamily : 'Poppins_500Medium', color : '#9D50BB'}}>Cek Resi App</Text>
                <Text style={{alignSelf : 'center', fontSize : 24, fontFamily : 'Poppins_300Light'}}>V 1.0</Text>            
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {     
        backgroundColor : '#FFF'   ,
        height : '100%'

      },
      
    header : {
        paddingHorizontal : 16,
        minWidth : '100%',
        height : 50,
        marginTop : 48,
        flexDirection : 'column',
        alignItems : 'flex-start'
    },
})

import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins'
import { Divider, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { History } from '../data/history';
import { TouchableOpacity } from 'react-native';

export default function HistoryScreen({navigation}) {
    
    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_300Light
      });
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='keyboard-backspace' onPress={() => navigation.push('HomeScreen')}/>
                <View style={{margin : 12}}>                    
                    <Text style={{fontFamily : 'Poppins_500Medium', fontSize : 22}}>Histori</Text>
                </View>
            </View>
            <View style={{marginTop : 32}}>
                <FlatList
                    data={History}
                    keyExtractor= {(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return(
                        <TouchableOpacity onPress={() => navigation.push('SelectCourier', {awbNum : item})}>

                            <SafeAreaView style={{margin : 16, fontSize : 16, flexDirection : 'row'}}>
                                    <Text style={{fontFamily : 'Poppins_500Medium', fontSize : 18}}>{index + 1} </Text>
                                    <Text style={{fontFamily : 'Poppins_300Light', marginStart : 16, fontSize : 18}}>{item}</Text>
                                                             
                            </SafeAreaView>   
                            <Divider style={{backgroundColor : 'black'}}/>

                        </TouchableOpacity>   
                        
                        )
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {     
        backgroundColor : '#FFF'  ,
        height: '100%' 
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

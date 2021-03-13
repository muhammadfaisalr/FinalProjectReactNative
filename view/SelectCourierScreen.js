import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { Header, Icon, Text, Button, Image } from 'react-native-elements'
import {Couriers} from '../data/couriers'
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins'
import { ScrollView } from 'react-native-gesture-handler'


export default function SelectCourierScreen({navigation, route}) {

    const {awbNum} = route.params

    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_300Light
      });
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='keyboard-backspace' onPress={() => navigation.push('HomeScreen')}/>
                <View style={{margin : 12}}>                    
                    <Text style={{fontFamily : 'Poppins_500Medium', fontSize : 22}}>Pilih Kurir</Text>
                    <Text style={{fontFamily : 'Poppins_300Light', fontSize : 16}}>No Resi : {awbNum}</Text>
                </View>
            </View>
            <View style={{marginTop : 32}}>
                <FlatList
                    data = {Couriers}
                    keyExtractor = {(item, index) => index.toString()}
                    numColumns = {3}
                    containerStyle={{flex: 1, justifyContent: 'center'}}
                    renderItem = {({item}) => {
                        return(
                            <ScrollView style={{marginBottom : 32}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.push('TrackingScreen', {
                                            courierName : item.name,
                                            courierKey : item.key,
                                            awb : awbNum
                                        })
                                    }}>

                                <View style={{margin : 12, alignItems : 'center', width: Dimensions.get('window').width * 0.27}}>
                                    <View style={styles.roundButton}>
                                        <Image style={{width : 32, height : 32}} source={{uri : item.url}}/>
                                    </View>

                                    <Text style={{fontFamily : 'Poppins_500Medium', fontSize : 14}}>{item.name}</Text>

                                </View>

                                </TouchableOpacity>
                        
                            </ScrollView>
                        )
                    }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {     
        backgroundColor : '#FFF'   

      },
      
    header : {
        paddingHorizontal : 16,
        minWidth : '100%',
        height : 50,
        marginTop : 48,
        flexDirection : 'column',
        alignItems : 'flex-start'
    },
    roundButton: {
        margin : 16,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 64,
        backgroundColor: '#FFF',
        elevation : 8
      },
})

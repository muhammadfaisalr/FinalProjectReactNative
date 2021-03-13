import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Header, Icon, Text, Button, Image } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { History } from '../data/history'
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins'
import { SafeAreaView } from 'react-native'



export default function TrackingScreen({navigation, route}) {
    
    const {courierName, courierKey, awb} = route.params
    const apiKey = 'a4217141d198d98045b69a4006bdec633e5d5931e5b78eb87f4b7b0e661c10f5'   
    const [result, setResult] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [isError, setError] = useState(false)

    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_300Light
      });

    useEffect(() => {
        axios.get(`https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${courierKey}&awb=${awb}`)
            .then(response => {
                const data = response.data.data
                setResult(data)
                setLoaded(true)
                setError(false)
                if(History.length != 0) {
                    for (let i = 0; i < History.length; i++) {
                        const element = History[i];
    
                        if (element != awb){
                            History.push(awb)
                        }
                    }
                }else{
                    History.push(awb)
                }
               

                console.log(History);
            })
            .catch(err => {
                console.log(err.message);
                setLoaded(true)
                setError(true)
            })
    }, [])

    if(isLoaded === true){
        if(result.summary == undefined){

            return(
                <View style={{height: '100%', top: '50%'}}>
                    <Text style={{alignSelf : 'center', fontSize : 22, fontFamily : 'Poppins_500Medium'}}>Data Tidak Ditemukan!</Text>
                    <Button buttonStyle={{ alignSelf : 'center', marginTop : 24, backgroundColor : '#9D50BB', fontFamily : 'Poppins_300Light'}} 
                    title='Kembali Ke Home'
                    onPress={() => navigation.push('HomeScreen')}/>
                </View>
            )
        }else{
            return ( 
                <SafeAreaView style={styles.container}>
                    
                    <View style={styles.header}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                            <Icon name='keyboard-backspace'/>
                            <Icon name='check-circle' color='#9D50BB' onPress={
                                () => navigation.push('HomeScreen')
                            }/>
                        </View>
                        <View style={{margin : 12, flexDirection: 'row'}}>                    
                            <Text style={{fontSize : 24, color : '#000', fontFamily : 'Poppins_500Medium'}}>Tracking</Text>
                            <Text h5 style={{marginLeft : 8, color : 'green', alignSelf : 'center', fontFamily: 'Poppins_500Medium'}}>[ {result.summary.status} ]</Text>
                        </View>
                    </View>
                    <View style={styles.cardInfo}>
                    
                        <Text style={styles.text12Light}>Pengirim</Text>
                        <Text style={styles.text24Medium}>{result.detail.shipper}</Text>
                        <Text style={styles.text14Light}>{result.detail.origin}</Text>
                        {/* Divider */}
                        <Text h3></Text>
                        {/* End Divider */}
                        <Text style={styles.text12Light}>Penerima</Text>
                        <Text style={styles.text24Medium}>{result.detail.receiver}</Text>
                        <Text style={styles.text14Light}>{result.detail.destination}</Text>
                    </View>
                    <Text style={{margin : 16, fontWeight : '400', fontSize :18, fontFamily : 'Poppins_500Medium'}}>Rincian</Text>
                    <FlatList
                        data = {result.history}
                        keyExtractor = {(item, index) => index.toString()}
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        renderItem = {({item, index}) => { 
                            if(index == 0){
                                return(
                                    <SafeAreaView style={{flexDirection : 'row'}}>

                                    
                                            <Image source={require('../assets/last-index-icon.png')} style={styles.indicator} />
                                            <SafeAreaView style={{flexDirection : 'column', margin : 16}}>
                                                <Text style={{fontSize : 14, fontWeight : '200', width : Dimensions.get('window').width * 0.7, fontFamily: 'Poppins_300Light'}}>{item.desc}</Text>
                                                <Text style={{fontSize : 12, fontWeight: 'bold',  fontFamily: 'Poppins_500Medium'}}>{item.date}</Text>
                                            </SafeAreaView>
                                    
                                    </SafeAreaView>

                                )
                            }else{
                                return(
                                    <SafeAreaView>
                                        <ScrollView>
                                            <View   style={{flexDirection : 'row'}}>
                                            <Image style={styles.indicator} source={require('../assets/index-icon.png')}/>
                                                <View style={{flexDirection : 'column', margin : 16}}>
                                                <Text style={{fontSize : 14, fontWeight : '200', width : Dimensions.get('window').width * 0.7, fontFamily: 'Poppins_300Light'}}>{item.desc}</Text>
                                                <Text style={{fontSize : 12, fontWeight: 'bold',  fontFamily: 'Poppins_500Medium'}}>{item.date}</Text>
                                                </View>
                                            </View>

                                            
                                        
                                        </ScrollView>
                                        
                                    </SafeAreaView>
                                )
                            }
                        }}
                    />
                
                </SafeAreaView>
            )
        }
    }else{
        return(
            <View style={{height: '100%', top: '50%', marginLeft: Dimensions.get('window').width, left: Dimensions.get('window').width * 0.5}}>
                <Text>Mengambil Data...</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {     
        backgroundColor : '#FFF' ,
        height  : '100%',  

      },
    text12Light: {
        fontFamily : 'Poppins_300Light', 
        fontSize : 12,
        color :'white'
    }, 

    text24Medium: {
        fontFamily : 'Poppins_500Medium', 
        fontSize : 24, 
        color : 'white'
    },

    
    text14Light: {
        fontFamily : 'Poppins_300Light', 
        fontSize : 14,
        color :'white'
    }, 
      
    header : {
        paddingHorizontal : 16,
        minWidth : '100%',
        height : 50,
        marginTop : 48,
        flexDirection : 'column',
        display : 'flex'
    },

    cardInfo : {
        marginTop : 32,
        borderRadius : 16,
        backgroundColor : '#9D50BB',
        padding : 16,
        marginHorizontal : 32,
        elevation : 8
    },
    roundPrimary: {
        margin : 16,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#9D50BB',
      },
      
    roundGray: {
        margin : 16,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#C4C4C4',
      },
      
      indicator : {
        width : 24,
        height : 24,
        margin : 16
      }
})

const colors = StyleSheet.create({
    white : {
        color : '#FFF'
    }
})

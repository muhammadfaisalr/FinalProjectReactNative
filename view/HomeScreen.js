import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Input, Button, Header, Text  } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { History } from '../data/history'
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins'
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default function HomeScreen({navigation}) {
    
    const [awbNum, setAwbNum] = useState('');
    const [isVisible, setVisibility] = useState(false)
    const [isNotConnected, setNotConnected] = useState(false)


var firebaseConfig = {
  apiKey: "AIzaSyCwbGVSgGInMVbIGGqo6m52ZdrnGyMvaLE",
  authDomain: "sanberapp-1af0f.firebaseapp.com",
  projectId: "sanberapp-1af0f",
  storageBucket: "sanberapp-1af0f.appspot.com",
  messagingSenderId: "447413947569",
  appId: "1:447413947569:web:defbc05dcebdb672a92690",
  measurementId: "G-JWFL34F028"
};

if  (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

    auth()
        .signInAnonymously()
        .then(() => {
            console.log('User signed in anonymously');
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
            }
            setNotConnected(true)
            console.error(error);
        });


    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_300Light
      });
    
    const move = () => {
        if  (awbNum === ''){
            alert('Kamu Belum Input Nomor Resi') 
        }else{

            navigation.push('SelectCourier', {
                awbNum : awbNum
            })
        }
    }

    return (
        <View style={{height : '100%'}}>
            <View style={styles.header}>
               
                <View style={styles.center}>

                    <Text style={{color: 'white', fontWeight : '200', fontSize : 24, fontFamily : 'Poppins_500Medium'}}>Lacak Paket Kamu</Text>
                    <Text style={{color: 'white', fontWeight : '200', fontSize : 14, marginBottom : 24, fontFamily : 'Poppins_300Light'}}>Masukkan Nomor Resi Kamu</Text>

                    <Input
                        value={awbNum}
                        style
                        inputContainerStyle={{marginTop: 16}, styles.input}
                        placeholder='Masukkan No Resi'
                        onChangeText={(value) => setAwbNum(value)}
                        leftIcon={{ type: 'font-awesome', name: 'cube' , size: 24, paddingHorizontal : 8, color : '#9D50BB'}}/>

                    <Button
                        buttonStyle={{backgroundColor : '#FFF'}}
                        containerStyle={{width: Dimensions.get('window').width * 0.8}}
                        titleStyle={{fontFamily : 'Poppins_300Light', color : '#9D50BB'}}
                        onPress={
                        move
                        }
                        title="Lacak"/>
                </View>
            </View>
            <Text style={{fontSize: 18, padding : 16, fontFamily : 'Poppins_500Medium'}}>Lainnya</Text>

            <ScrollView horizontal={true}>
                <TouchableOpacity onPress={() => { navigation.push('HistoryScreen')}}>
                    <View style={styles.cardMenu }>
                        <Image source={require('../assets/history-icon.png')}/>
                        <Text style={{marginTop : 32, fontFamily : 'Poppins_500Medium', fontSize : 20}}>Histori</Text>
                        <Text style={{fontFamily : 'Poppins_300Light', fontSize : 14}}>{History.length} Hasil</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setVisibility(true)}>
                    <View style={styles.cardMenu}>
                        <Image source={require('../assets/check-price-icon.png')}/>
                        <Text style={{marginTop : 32, fontFamily : 'Poppins_500Medium', fontSize : 20}}>Cek Ongkir</Text>
                    </View>
                </TouchableOpacity>
                
                    <View style={styles.cardMenu}>
                        <Image source={require('../assets/close-icon.png')}/>
                        <Text  style={{marginTop : 32, fontFamily : 'Poppins_500Medium', fontSize : 20}}>Menu Belum Tersedia</Text>
                    </View>
            </ScrollView>
            <TouchableOpacity>
                
                <Text style={{fontFamily: 'Poppins_500Medium', margin : 16, fontSize : 16, alignSelf : 'center'}} onPress={() => {
                    navigation.push('AboutScreen')
                }}>Build With ❤ By Faisal</Text>
            </TouchableOpacity>
            
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
                    <SafeAreaView style={{backgroundColor : '#FFF', padding : 16, borderTopEndRadius : 16, borderTopStartRadius : 16}}>
                        <Text style={{alignSelf : 'center', fontFamily : 'Poppins_500Medium', fontSize : 16}}>Ups, Fitur Ini Sedang Dalam Tahap Pengembangan</Text>
                        <Button buttonStyle={{borderRadius : 16}} containerStyle={{marginTop : 16}} title="Tutup" onPress={() => setVisibility(false)}/>
                    </SafeAreaView>
            </BottomSheet>
            
            <BottomSheet
                isVisible={isNotConnected}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
                    <SafeAreaView style={{backgroundColor : '#FFF', padding : 16, borderTopEndRadius : 16, borderTopStartRadius : 16}}>
                        <Text style={{alignSelf : 'center', fontFamily : 'Poppins_500Medium', fontSize : 16}}>Ada Sesuatu Yang Salah</Text>
                        <Button buttonStyle={{borderRadius : 16}} containerStyle={{marginTop : 16}} title="Tutup" onPress={() => setVisibility(false)}/>
                    </SafeAreaView>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        width: '100%',
        height:  Dimensions.get('window').height * 0.5,
        backgroundColor : '#9D50BB',
        borderBottomEndRadius : 16,
        borderBottomStartRadius : 16,
        alignItems : 'center',
    },

    subHeader : {
        padding : 32,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#9D50BB',
        paddingHorizontal : 18,
        justifyContent : 'space-between'
    },

    subContentHeader:{
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },

    cardMenu : {
        width : Dimensions.get('window').width * 0.35,
        marginBottom : 12,
        borderRadius : 16,
        height : 156,
        backgroundColor : '#FFF',
        padding : 16,
        marginHorizontal : 8,
        elevation : 8
    },

    title : {
        marginTop : 48,
        fontSize : 24,
        color : '#FFF',
        justifyContent : 'center'
    },

    input : {
        backgroundColor: '#FFF',
        paddingVertical : 2,
        paddingHorizontal : 8,
        width: Dimensions.get('window').width * 0.8,
        borderRadius :12
    },

    center : {
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        height: Dimensions.get('window').height * 0.5
    }
})

const colors = StyleSheet.create({
    white : {
        color : '#FFFFFF'
    },

    primaryPurple : {
        color : '#9D50BB'
    }
})

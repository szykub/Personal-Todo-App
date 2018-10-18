import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBarHeight } from 'expo';

export const Header = () => {
    let date = new Date().toLocaleDateString();
    let dateArray = date.split('/');
    let newDate = `20${dateArray[2]}-${dateArray[0]}-${dateArray[1]} (YYYY-MM-DD)`
    return(
        <View style={styles.header}>
            <Text style={styles.text}>Things you have to do</Text>
            <Text style={styles.textDate}>Today is: {newDate}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingRight: '5%',
        paddingLeft: '5%',
        marginTop: StatusBarHeight,
        backgroundColor: 'tomato',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, 
    text:{
        color: '#fff',
        fontSize: 18,
    },
    textDate:{
        color: '#fff',
        fontSize: 16,
    }
})
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBarHeight } from 'expo';

export function Header(props){
    let date = new Date().toLocaleDateString();
    let dateArray = date.split('/');
    let newDate = `20${dateArray[2]}-${dateArray[0]}-${dateArray[1]} (YYYY-MM-DD)`

    return(
        <View style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Things you have to do</Text>
                <Text style={styles.textDate}>Today is: {newDate}</Text>
            </View>
            <View style={styles.addButton}>
                {props.children}
            </View>
        </View>
    )    
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        paddingTop: '10%',
        paddingBottom: '5%',
        paddingRight: '5%',
        paddingLeft: '5%',
        marginTop: StatusBarHeight,
        backgroundColor: 'tomato',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignContent:"center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, 
    textContainer:{
        width: '85%',
        height: '100%'
    },  
    text:{
        color: '#fff',
        fontSize: 18,
    },
    textDate:{
        color: '#fff',
        fontSize: 16,
    },
    addButton:{
        height: '100%',
    }
})
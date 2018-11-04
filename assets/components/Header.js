import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { StatusBarHeight } from 'expo';

export function Header(props){
    let date = new Date().toLocaleDateString();
    let dateArray = date.split('/');
    let newDate = `20${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`

    return(
        <ImageBackground source={require("../images/header-background.jpg")} style={styles.header} opacity={0.75} resizeMode={'cover'}>
            <View style={styles.headerInsideContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Things you have to do</Text>
                    <Text style={styles.textDate}>Today is: {newDate}</Text>
                </View>
                <View style={styles.addButton}>
                    {props.children}
                </View>
            </View>
            <Text style={styles.taskText}>You have {props.itemAmount === 1 ? `${props.itemAmount} task` : `${props.itemAmount} tasks`} to complete</Text>            
        </ImageBackground>
    )    
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 190,
        paddingTop: '10%',
        paddingBottom: '5%',
        paddingRight: '5%',
        paddingLeft: '5%',
        marginTop: StatusBarHeight,
        backgroundColor: '#28f',        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, 
    headerInsideContainer:{
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignContent:"center",
    },
    textContainer:{
        width: '85%',      
    },  
    text:{
        color: '#fff',
        fontSize: 18,
    },
    textDate:{
        color: '#fff',
        fontSize: 16,
    },
    taskText:{
        color: '#fff',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        paddingTop: '15%',
    },
    addButton:{
        height: '100%',
    }
})
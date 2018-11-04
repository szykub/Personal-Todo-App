import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

export class DetailsScreen extends React.Component{
    static navigationOptions = {
        title: "Item description",
        headerStyle:{
            backgroundColor: 'tomato',            
        },
        headerTintColor: '#fff',
    };

    calculateDaysLeft = expire => {
        let today = new Date().getTime();
        let deadlineDate = new Date(expire).getTime();
        
        let output = parseInt((deadlineDate - today)/(24*3600*1000) + 1);
        if(output === 1){
            return `${output} day`
        }else{
            return `${output} days`
        } 
    }    

    render(){
        const { navigation } = this.props;
        const navigationProps = {
            title:  navigation.getParam("title", "Cant read title value"),
            description:  navigation.getParam("description", "Cant read description value"),
            added:  navigation.getParam("added", "Cant read created date"),
            expires:  navigation.getParam("expires", "Cant read deadline date"),
            priority:  navigation.getParam("priority", "Cant read priority value")
        }        

        return(
            <ImageBackground source={require("../images/background.jpg")} style={styles.container} opacity={0.6}>
                <Text style={styles.added}>Added: {navigationProps.added}</Text>
                <Text style={styles.days}>You have {this.calculateDaysLeft(navigationProps.expires)} left</Text>
                <View style={styles.roundContainer}>
                    <Text style={styles.title}>{navigationProps.title}</Text>
                </View>
                <View style={styles.divider}></View>
                <Text style={styles.descriptionText}>Description</Text>
                <Text style={styles.description}>{navigationProps.description}</Text>
                <Text style={styles.deadline}>Deadline: {navigationProps.expires}</Text>            
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    added:{
        textAlign: 'right',
        color: '#28f',
        fontSize: 14,
        paddingTop: 20,
        paddingRight: 20,
    },
    days:{
        color: 'tomato',
        fontSize: 18,
        textAlign: 'center',
        padding: 35,
    },
    roundContainer:{
        backgroundColor: 'darkblue',
        borderRadius: 100,
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    divider:{
        width: 1,
        height: 40,
        backgroundColor: 'darkblue',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    descriptionText:{
        color: '#28f',
        textAlign: 'center',
        fontSize: 18,
    },
    description:{
        fontSize: 14,
        padding: 15,
    },
    deadline:{
        color: 'tomato',
        paddingBottom: 20,
        paddingRight: 20,
        textAlign: 'right',
    }
})
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export class DetailsScreen extends React.Component{
    static navigationOptions = {
        title: "Item description",
        headerStyle:{
            backgroundColor: 'tomato',            
        },
        headerTintColor: '#fff',
    };

    

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
            <View style={styles.container}>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Title</Text>
                    <Text>{navigationProps.title}</Text>

                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Description</Text>
                    <Text>{navigationProps.description}</Text>
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Create date</Text>
                    <Text>{navigationProps.added}</Text>
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Deadline date</Text>
                    <Text>{navigationProps.expires}</Text>
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Priority</Text>
                    <Text>This item has {navigationProps.priority === true ? "high" : "normal"} priority</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff'
    },
    nestedContainer:{
        flex: 0.2,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: '#28f',
        marginTop: 10,
        marginBottom: 10,
    },
})
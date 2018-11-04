import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { asyncStorageOperation, failureCallback } from '../functions/AsyncStorageOperations';

export class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            done: false,
        }
    }

    handleDelete = () => {
        if(this.state.done){
            asyncStorageOperation("remove", 0, this.props.id)
            .then(() => {
                this.props.parentReRender()
            })
            .catch(failureCallback)
        }else{
            this.setState({
                done: true
            });
        }
    }

    handleElementView = () => {
        this.props.navigation.navigate("Details", {
            title: this.props.title,
            description: this.props.description,
            added: this.props.added,
            expires: this.props.expires,
            priority: this.props.priority,
        })
    }

    render(){
        return(
            <TouchableOpacity 
                style={[styles.container, {backgroundColor: this.state.done ? '#d7d7d7' : '#fff'}]}
                onPress={this.handleElementView}
            >
                <TouchableOpacity
                    onPress={this.handleDelete}
                >
                    <Icon 
                        containerStyle={[styles.icon, {backgroundColor: this.state.done ? 'red' : '#fff'}]}
                        size={25}
                        color='#fff'
                        reverse={true}
                        reverseColor={this.state.done ? '#fff' :'lightgreen'}                                                
                        name={this.state.done ? 'delete' : 'check'}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    {
                        this.props.description !== ""
                        ? <Text style={styles.description} numberOfLines={1}>{this.props.description}</Text>
                        : null
                    }
                </View>
                <View style={styles.dateContainer}>
                    {
                        this.props.priority 
                        ? <Icon 
                            size={25}
                            name="priority-high"
                            iconStyle={styles.priorityIcon}
                            />
                        : null
                        }
                    <Text style={styles.dateTextDeadline}>Deadline: {this.props.expires}</Text>
                </View>
            </TouchableOpacity>
        )
    }    
}

const styles = StyleSheet.create({
    container:{
        height:90,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',        
    },
    icon:{
        backgroundColor: 'lightgreen',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#28f',
    },
    titleContainer:{
        flex: 0.4
    },
    title:{
        color: "rgba(0,0,0,0.85)",
        fontFamily: 'Roboto',
        fontSize: 14,
        textAlign: 'left',      
    },    
    description:{
        color: "rgba(0,0,0,0.65)",
        fontSize: 10,
        width: "100%",
        paddingTop: 4,
    },  
    priorityIcon:{
        color: 'red'
    },
    dateContainer:{
        flex: 0.45,
        height: "80%",
        justifyContent: 'space-around',
        alignItems:'flex-end',
        flexDirection: 'column',
    },
    dateTextDeadline:{
        fontSize: 10,
        color: 'tomato'
    }
})
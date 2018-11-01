import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

import { asyncStorageOperation, failureCallback } from '../functions/AsyncStorageOperations';

export class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            done: false,
            delete: false,
        }
    }

    handleDelete = () => {
        if(this.state.done){
            asyncStorageOperation("remove", 0, this.props.id)
            .then(() => {
                this.setState({
                    delete: true
                });            
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
        if(this.state.delete) return null
        else{
            return(
                <TouchableOpacity 
                    style={[styles.container, {backgroundColor: this.state.done ? '#d7d7d7' : '#fff'}]}
                    onPress={this.handleElementView}
                >
                    <TouchableOpacity
                        onPress={this.handleDelete}
                    >
                        <Icon 
                            containerStyle={[styles.icon, {backgroundColor: this.state.done ? 'red' : 'lightgreen'}]}
                            size={35}
                            color='#fff'                            
                            name={this.state.done ? 'delete' : 'check'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Added: {this.props.added}</Text>
                        {
                            this.props.priority ? 
                            <Icon 
                                size={25}
                                name="priority-high"
                                iconStyle={styles.priorityIcon}
                            />
                            : 
                            null
                         }
                        <Text style={styles.dateTextDeadline}>Deadline: {this.props.expires}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
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
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',        
    },
    title:{
        color: '#27f',
        fontSize: 14,
        textAlign: 'left',
        flex: 0.4
    },
    icon:{
        backgroundColor: 'lightgreen',
        borderRadius: 100,
        padding: 5,
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
    dateText:{
        fontSize: 12,
        color: '#27f'
    },
    dateTextDeadline:{
        fontSize: 12,
        color: 'tomato'
    }
})
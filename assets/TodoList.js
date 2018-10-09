import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            done: false,
            delete: false,
        }
    }

    handlePress = () => {
        if(this.state.done){
            this.setState({
                delete: true
            })
        }

        this.setState({
            done: true
        });
    }

    render(){
        if(this.state.delete) return null
        else{
            return(
                <TouchableOpacity style={[styles.container, {backgroundColor: this.state.done ? '#d7d7d7' : '#fff'}]}>
                    <TouchableOpacity
                        onPress={this.handlePress}
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
                        <Text style={styles.dateTextDeadline}>Deadline: {this.props.expires}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 0.15,
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
        flex: 0.45,
    },
    icon:{
        backgroundColor: 'lightgreen',
        borderRadius: 100,
        padding: 5,
    },
    dateContainer:{
        flex: 0.45,
        height: '80%',
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
        color: 'red'
    }
})
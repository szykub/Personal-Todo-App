import React from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

import { Header } from './assets/Header';
import { TodoList } from './assets/TodoList';
import { DetailsScreen } from './assets/Details';
import { AddScreen } from './assets/Add';

export class MainScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            todoArray:[],
        }
    }   
    
    componentDidMount = () => {
        AsyncStorage.getItem('TodoList').then((array) => {
            if(array !== null){
                array = JSON.parse(array);
                if(array === this.state.todoArray){
                    return null
                }else{                
                    this.setState({
                        todoArray: array
                    })
                }
            }else{
                this.setState({
                    todoArray: new Array()
                })
            }
        })
    }

    getList = async () => {
        try {
            let array = await AsyncStorage.getItem('TodoList');            
            if(array !== null){
                array = JSON.parse(array);
                AsyncStorage.removeItem("TodoList")
                this.setState({
                    todoArray: array,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    addTodo = () => {
        this.props.navigation.navigate('Add', {
            onNavigateBack: this.getList
          });
    }

    addTodoButton = () => {
        return(
            <View style={styles.addContainer}>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={this.addTodo}
                >
                    <Icon 
                        containerStyle={styles.addButton}
                        size={45}
                        color='#fff'                            
                        name='add'                            
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />                
                {
                    this.state.todoArray.map(item => {
                        return <TodoList title={item.title} added={item.created} expires={item.expires} key={item.key}/>
                    })
                }
                <this.addTodoButton />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addContainer: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton:{
        borderRadius: 100,
        backgroundColor: 'lightgreen',
        padding: 4,
    },
});


export default createStackNavigator(
    {
        Main: MainScreen,
        Details: DetailsScreen,
        Add: AddScreen,
    },
    {
        initialRouteName: 'Main',
    }
  );
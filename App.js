import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList  } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, NavigationEvents } from 'react-navigation';

import { Header } from './assets/components/Header';
import { TodoList } from './assets/components/TodoList';
import { DetailsScreen } from './assets/components/Details';
import { AddScreen } from './assets/components/Add';

import { asyncStorageOperation, failureCallback } from './assets/functions/AsyncStorageOperations';
 
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

    componentDidMount(){
        this.getListAsync()
    }

    getListAsync = () => {
        asyncStorageOperation("read")
        .then(array => {
            this.setState({
                todoArray: array
            });            
        })
        .catch(failureCallback)        
    }

    handleAddTodoPress = () => {
        this.props.navigation.navigate('Add');
    }  

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents 
                    onWillFocus={() => {this.getListAsync();}}
                />
                <Header>
                    <TouchableOpacity
                        onPress={this.handleAddTodoPress}
                        style={styles.addButton}
                    >
                        <Icon 
                            containerStyle={styles.addButton}
                            size={25}
                            color='#fff'                            
                            name='add'                            
                        />
                    </TouchableOpacity>
                </Header>
                <FlatList    
                    style={styles.list}
                    data={this.state.todoArray}
                    renderItem={({ item }) => (
                        <TodoList 
                            title={item.title} 
                            description={item.description} 
                            added={item.created} expires={item.expires} 
                            id={item.key} 
                            priority={item.highPriority} 
                            navigation={this.props.navigation}
                        />
                    )}
                    keyExtractor = { (item) => item.key.toString() }
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight:"100%",
        backgroundColor: '#fff',
    },
    list:{
        height: "60%"
    },
    addButton:{
        borderRadius: 100,
        backgroundColor: 'lightgreen',
        width: 45,
        height: 45,    
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
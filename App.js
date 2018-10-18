import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList  } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, NavigationEvents } from 'react-navigation';

import { Header } from './assets/components/Header';
import { TodoList } from './assets/components/TodoList';
import { DetailsScreen } from './assets/components/Details';
import { AddScreen } from './assets/components/Add';

import { asyncStorageOperation } from './assets/functions/AsyncStorageOperations';
 
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
            })
        });        
    }

    handleAddTodoPress = () => {
        this.props.navigation.navigate('Add', {
            onNavigateBack: this.getListAsync
        });
    }  

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents 
                    onDidFocus={() => this.getListAsync}
                />
                <Header />
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
                    keyExtractor = { (item, index) => index.toString() }
                />
                <View style={styles.addContainer}>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={this.handleAddTodoPress}
                    >
                        <Icon 
                            containerStyle={styles.addButton}
                            size={45}
                            color='#fff'                            
                            name='add'                            
                        />
                    </TouchableOpacity>
                </View>
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
    addContainer: {
        height: "20%",
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
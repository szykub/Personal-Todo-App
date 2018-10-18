import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { asyncStorageOperation, faliureCallback } from '../functions/AsyncStorageOperations';

export class AddScreen extends React.Component{
    static navigationOptions = {
        title: "Add todo list item",
        headerStyle:{
            backgroundColor: 'tomato',            
        },
        headerTintColor: '#fff',
    };

    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            date: "No deadline",
            highPriority: false,
            isDateTimePickerVisible: false,
        }
    }

    handleTitle = (text) => {
        this.setState({
            title: text
        })
    }

    handleDescription = (text) => {
        this.setState({
            description: text
        })
    }

    handleDatePicked = (date) => {
        date = JSON.stringify(date);
        date = date.replace('"', '');
        date = date.split("T");        
        this.setState({
            date: date[0]
        })
        this.hideDateTimePicker();
    };

    showDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: true 
        });
    }

    hideDateTimePicker = () => {
        this.setState({ 
            isDateTimePickerVisible: false 
        });
    }

    handlePriority = () => {
        this.setState(prevState => ({
            highPriority: !prevState.highPriority
        }))
    }

    handleAdd = () => {
        let date = new Date().toLocaleDateString();
        let dateArray = date.split('/');
        let newDate = `20${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
        
        let newItem = {
            key: Date.now(),

            title: this.state.title,
            description: this.state.description,
            highPriority: this.state.highPriority,
            created: newDate,
            expires: this.state.date,            
        }

        asyncStorageOperation("add", newItem)
        .then(()=>{
            this.props.navigation.state.params.onNavigateBack();
            this.props.navigation.goBack();
        })
        .catch(faliureCallback)
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={50}
                        onChangeText={this.handleTitle}
                        value={this.state.title}
                        placeholder={'Item title'}
                        underlineColorAndroid = "transparent"
                    />
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Description</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={200}
                        onChangeText={this.handleDescription}
                        value={this.state.description}
                        placeholder={'Item description'}
                        underlineColorAndroid = "transparent"
                    />
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Deadline date</Text>
                    <TouchableOpacity
                        onPress={this.showDateTimePicker}
                    >
                        <TextInput
                            style={styles.input}
                            value={this.state.date}
                            editable={false}
                            underlineColorAndroid = "transparent"
                        />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
                <View style={styles.nestedContainer}>
                    <CheckBox
                        containerStyle={styles.checkbox}
                        textStyle={styles.checkboxText}                        
                        title='Is this a high priority?'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.highPriority}
                        onPress={this.handlePriority}
                    />

                </View>
                <TouchableOpacity
                    onPress={this.handleAdd}
                >
                    <Icon 
                        containerStyle={styles.icon}
                        size={35}
                        color={'#fff'}
                        name='check'
                    />                   
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    icon:{
        backgroundColor: 'lightgreen',
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    checkboxText:{
        color: '#28f',
        fontSize: 18,
        fontWeight: 'normal',
    }
})
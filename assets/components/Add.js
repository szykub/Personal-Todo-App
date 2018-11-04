import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text, TouchableOpacity } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { asyncStorageOperation, failureCallback } from '../functions/AsyncStorageOperations';

export class AddScreen extends React.Component{
    static navigationOptions = {
        title: "Add todo list item",
        headerStyle:{
            backgroundColor: '#4FA3D2',            
        },
        headerTintColor: '#fff',
    };

    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            date: "No deadline",
            priorityIndex: 0,
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

    handlePriority = (index) => {
        this.setState({
            priorityIndex: index
        })
    }

    handleAdd = () => {
        let date = new Date().toLocaleDateString();
        let dateArray = date.split('/');
        let newDate = `20${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
        
        let newItem = {
            key: Date.now(),

            title: this.state.title,
            description: this.state.description,
            highPriority: this.state.highPriority === 1 ? "high" : "normal",
            created: newDate,
            expires: this.state.date,            
        }

        asyncStorageOperation("add", newItem)
        .then(()=>{
            this.props.navigation.goBack();
        })
        .catch(failureCallback)
    }

    render(){
        const buttons = ['Normal', 'High']

        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={40}
                        onChangeText={this.handleTitle}
                        value={this.state.title}
                        placeholder={'Item title'}
                        underlineColorAndroid = "transparent"
                    />
                </View>
                <View style={styles.descriptionNestedContainer}>
                    <Text style={styles.text}>Description</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        multiline={true}
                        numberOfLines={4}
                        maxLength={150}
                        onChangeText={this.handleDescription}
                        value={this.state.description}
                        placeholder={'Item description'}
                        underlineColorAndroid = "transparent"
                    />
                </View>
                <View style={styles.nestedContainer}>
                    <Text style={styles.text}>Deadline</Text>
                    <TouchableOpacity
                        onPress={this.showDateTimePicker}
                        style={styles.dateInputContainer}
                    >
                        <TextInput
                            style={styles.dateInput}
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
                    <Text style={styles.text}>Priority</Text>
                    <ButtonGroup 
                        onPress={this.handlePriority}
                        selectedIndex={this.state.priorityIndex}
                        buttons={buttons}
                        containerStyle={{height: 35, width: 200,}}
                        selectedButtonStyle={{backgroundColor: "#4FA3D2"}}
                        selectedTextStyle={{color: "#fff"}}
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
        padding: 10,
        backgroundColor: '#fff'
    },
    nestedContainer:{
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 20,        
    },
    descriptionNestedContainer:{
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        paddingBottom: 20, 
    },
    descriptionInput:{
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
    },
    text: {
        fontSize: 16,
        color: '#28f',
    },
    dateInputContainer:{
        width: "70%",
    },
    input: {
        width: "70%",
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
    },
    dateInput:{
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
    },
    icon:{
        backgroundColor: 'lightgreen',
        padding: 5,
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
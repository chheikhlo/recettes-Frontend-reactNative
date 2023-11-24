import {Text, Button, StyleSheet, TextInput, View} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

const PutDishScreen = ({route, navigation}) => {
    const { dish } = route.params;
    const [dishNameText, setDishNameText] = useState('');
    const [dishImageText, setDishImageText] = useState('');


    const putDish = () => {
        navigation.navigate("TaskList", { updatedTask: { id: task.id, text: taskText } });
     };

     useLayoutEffect(() => {
         navigation.setOptions({
           headerTitleStyle: {
             color: 'white',
           },
           headerStyle: {
             backgroundColor: 'darkorange',
           },
         });
       }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Modifier le plat</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Modifier le nom du plat"
                    onChangeText={text => setDishNameText(text)}
                    value={dishNameText}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Modifier l'image du plat"
                    onChangeText={text => setDishImageText(text)}
                    value={dishImageText}
                />
                <Button title="Modifier" color="orange" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    inputContainer: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 16,
        width: '100%',
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white',
      },
      input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
      },
});

export default PutDishScreen;

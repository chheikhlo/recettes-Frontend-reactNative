import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImagee from '../../../assets/images/bacg.jpg';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.22.231.205:9006/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_de_passe }),
      });

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);

      navigation.navigate('DishRecipe');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
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
        <Image
            source={backgroundImagee}
            style={{ ...StyleSheet.absoluteFillObject, opacity: 0.5 }}
          />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Connectez-vous</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={mot_de_passe}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Se connecter" onPress={handleLogin} color="orange"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formContainer: {
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

export default LoginScreen;

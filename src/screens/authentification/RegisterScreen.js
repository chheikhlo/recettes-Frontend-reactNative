import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, Image, AsyncStorage, StyleSheet, Text } from 'react-native';
import backgroundImagee from '../../../assets/images/dack.jpg';

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://172.22.231.205:9006/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, prenom, telephone, email, mot_de_passe }),
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
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
        <Text style={styles.title}>Inscription</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={telephone}
          onChangeText={setTelephone}
        />
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
          onChangeText={setMotDePasse}
          secureTextEntry
        />
        <Button title="S'inscrire" onPress={handleRegister} color="orange"/>
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

export default RegisterScreen;

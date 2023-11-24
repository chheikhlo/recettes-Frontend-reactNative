import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, TextInput, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import platImage from '../../../../assets/images/tarte_aux_pommes.jpg';
import backgroundImagee from '../../../../assets/images/back.jpg';

const importedImages = {
  "tarte_aux_pommes.jpg": require('../../../../assets/images/tarte_aux_pommes.jpg'),
  "boeuf_bourguignon.jpg": require('../../../../assets/images/boeuf_bourguignon.jpg'),
  "curry_de_poulet.jpg": require('../../../../assets/images/curry_de_poulet.jpg'),
  "fajitas_poulet.jpg": require('../../../../assets/images/fajitas_poulet.jpg'),
  "lasagnes.jpg": require('../../../../assets/images/lasagnes.jpg'),
  "pates_carbonara.jpg": require('../../../../assets/images/pates_carbonara.jpg'),
  "poulet_roti.jpg": require('../../../../assets/images/poulet_roti.jpg'),
  "salade_cesar.jpg": require('../../../../assets/images/salade_cesar.jpg'),
  "sushi.jpg": require('../../../../assets/images/sushi.jpg'),
};

const HomeScreen = ({ navigation }) => {
  const [plats, setPlats] = useState({});
  const [nom, setNom] = useState('');
  const [image, setImage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAjoutPress = () => {
    setModalVisible(true);
  };

   useEffect(() => {
     const fetchPlats = async () => {
       try {
         const response = await fetch('http://172.22.231.205:9006/plats');
         const data = await response.json();
         setPlats(data);
       } catch (error) {
         console.error('Erreur lors de la récupération des plats :', error);
       }
     };

     fetchPlats();
   }, []);


  const handleValider = () => {
        try {
          const response = fetch('http://172.22.231.205:9006/user/add/plat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom, image }),
          });
          setModalVisible(false);
          navigation.navigate('DishRecipe');
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
        }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Text style={{ color: 'black' }} onPress={() => navigation.navigate('Login')}>Login </Text>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ color: 'black' }} onPress={() => navigation.navigate('Register')}>Register</Text>
          </View>
          <View style={{ marginLeft: 5 }}>
              <Text style={{ color: 'black' }} onPress={() => navigation.navigate('ManageDish')}>Mon-Espace</Text>
          </View>
        </View>
      ),
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
      <FlatList
        data={plats}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
             {item.image && importedImages[item.image] ? (
               <Image source={importedImages[item.image]} style={{ width: 120, height: 120 }} />
             ) : (
               <Text>image not found</Text>
             )}
            <View style={styles.nameRecipe}>
                <Text style={styles.nameRecip}>{item.nom}</Text>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Recette', { recetteIds: item.recette_id })}>
              <Text style={styles.buttonText}>Recettes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ajouter un plat</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom du plat *"
                    value={nom}
                    onChangeText={setNom}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Image (optionnel)"
                    value={image}
                    onChangeText={setImage}
                  />
                  <Button title="Valider" onPress={handleValider} />
                  <Button title="Annuler" onPress={() => setModalVisible(false)} color="red" />
              </View>
          </View>
      </Modal>
      <TouchableOpacity style={styles.ajoutButton} onPress={handleAjoutPress}>
          <Text style={styles.ajoutButtonText}>Ajout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 8,
  },
   ajoutButton: {
      backgroundColor: '#007BFF',
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 16,
      right: 16,
    },
    ajoutButtonText: {
      color: 'white',
      fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 4,
      },
  buttonText: {
    color: 'white',
  },
  nameRecipe: {
    backgroundColor: '#5293F0',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  nameRecip: {
      color: 'white',
  },
});

export default HomeScreen;

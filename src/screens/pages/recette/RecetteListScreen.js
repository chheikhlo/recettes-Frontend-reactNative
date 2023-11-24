import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const RecetteScreen = ({ navigation, route }) => {
  const { recetteIds } = route.params;
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    const fetchDataForRecettes = async () => {
      try {
        const promises = recetteIds.map(async (recetteId) => {
          const response = await fetch(`http://172.22.231.205:9006/recettes/${recetteId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          return data.details;
        });

        const detailsArray = await Promise.all(promises);
        const combinedDetails = detailsArray.flat();
        setRecettes(combinedDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
      }
    };

    fetchDataForRecettes();
  }, [recetteIds]);

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
    <View>
      <FlatList
        data={recettes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#ADD8E6', padding: 10, margin: 5, borderRadius: 5 }}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RecetteScreen;

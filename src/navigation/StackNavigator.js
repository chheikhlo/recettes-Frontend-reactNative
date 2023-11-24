import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from 'react-native';
import HomeScreen from "../screens/pages/home/HomeScreen";
import RecetteListScreen from "../screens/pages/recette/RecetteListScreen";
import ManageDish from "../screens/pages/dish/ManageDish";
import PutDishScreen from "../screens/pages/dish/PutDishScreen";
import LoginScreen from "../screens/authentification/LoginScreen";
import RegisterScreen from "../screens/authentification/RegisterScreen";

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"DishRecipe"}>
            <Stack.Screen name="DishRecipe" component={HomeScreen} />
            <Stack.Screen name="ManageDish" component={ManageDish} />
            <Stack.Screen name="PutDishScreen" component={PutDishScreen} />
            <Stack.Screen name="Recette" component={RecetteListScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
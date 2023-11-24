import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {

  return (
    <NavigationContainer>
        <SafeAreaView style={styles.container}>
            <StackNavigator/>
        </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

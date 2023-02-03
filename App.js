import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Form from "./components/Form";
import Home from "./components/Home";
import Clients from "./components/Clients";
import ClientProfile from "./components/ClientProfile";

//Screens the app uses - HomeScreen, Client Screen, New Client Screen

const HomeScreen = Home;

const ClientScreen = Clients;

const NewClientScreen = Form;

const ClientProfileScreen = ClientProfile;

// The screens that the app navigated to

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Clients" component={ClientScreen} />
    <Stack.Screen name="NewClient" component={NewClientScreen} />
    <Stack.Screen name="ClientProfile" component={ClientProfileScreen} />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;

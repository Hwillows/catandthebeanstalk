import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const BackgroundImage = require("../CATB.jpeg");

function Home({ navigation }) {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Cat and the Beanstalk</Text>
        <Pressable
          style={styles.button}
          onPress={() => nav.navigate("Clients")}
        >
          <Text style={styles.buttontext}>Clients</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => nav.navigate("NewClient")}
        >
          <Text style={styles.buttontext}>New Client</Text>
        </Pressable>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A6FEF5",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "grey",
  },
  buttontext: {
    fontWeight: "500",
    fontFamily: "notoserif",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
});

export default Home;
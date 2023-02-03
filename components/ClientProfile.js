import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

function ClientProfile({ route }) {
  const [client, setClient] = useState([]);
  const clientId = route.params?.id;
  const clientInfo = client[0];

  // opens database

  const db = SQLite.openDatabase("CATB");

  // route.params?.id is getting id number from client we clicked on

  useEffect(() => {
    if (route.params?.id) {
      console.log("Sent successfully.");
    }
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Clients WHERE id = ?",
        [clientId],
        (txObj, resultSet) => setClient(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    console.log(clientId);
  }, []);

  // const showNames = () => {
  //   return (
  //     <View>
  //       <Text>{clientId}</Text>
  //       <Pressable
  //         onPress={() =>
  //           client.length < 0
  //             ? console.log(client)
  //             : console.log("why you empty")
  //         }
  //       >
  //         <Text>press me</Text>
  //       </Pressable>
  //     </View>
  //   );
  // };

  const showNames = () => {
    return client.map((client, index) => {
      return (
        <View key={index}>
          <View style={styles.headingcontainer}>
            <Text style={styles.heading}>
              {client.clientname} + {client.petname}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: client.image }}
              style={{ width: 300, height: 300 }}
            />

            <Text style={styles.title}>{client.clientname}'s Address:</Text>
            <Text style={styles.paragraph}>{client.address}</Text>

            <Text style={styles.title}>{client.petname}'s Breed is:</Text>
            <Text style={styles.paragraph}>{client.breed}</Text>

            <Text style={styles.title}>{client.petname} likes to eat:</Text>
            <Text style={styles.paragraph}>{client.food}</Text>

            <Text style={styles.title}>{client.petname}'s temperament is:</Text>
            <Text style={styles.paragraph}>{client.temperament}</Text>

            <Text style={styles.title}>
              {client.petname}'s favourite toy is:
            </Text>
            <Text style={styles.paragraph}>{client.toy}</Text>

            <Text style={styles.title}>Does {client.petname} go outside:</Text>
            <Text style={styles.paragraph}>{client.outside}</Text>

            <Text style={styles.title}>{client.petname}'s vets are:</Text>
            <Text style={styles.paragraph}>{client.vets}</Text>

            <Text style={styles.title}>Emergency Contact:</Text>
            <Text style={styles.paragraph}>{client.emergencycontact}</Text>
          </View>
        </View>
      );
    });
  };

  return <ScrollView>{showNames()}</ScrollView>;
}

const styles = StyleSheet.create({
  headingcontainer: { flex: 1, alignItems: "center" },
  heading: {
    flex: 1,
    fontSize: 30,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
  title: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
  paragraph: {
    flex: 1,
    fontSize: 15,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
});

export default ClientProfile;

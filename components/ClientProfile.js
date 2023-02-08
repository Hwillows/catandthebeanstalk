import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

function ClientProfile({ route }) {
  const [client, setClient] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const clientId = route.params?.id;
  const clientInfo = client[0];

  // opens database

  const db = SQLite.openDatabase("CATB");

  const nav = useNavigation();

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

  // Delete function

  const deleteClient = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM Clients WHERE id = ?", [clientId]);
    });
    nav.navigate("Home");
  };

  const showNames = () => {
    return client.map((client, index) => {
      return (
        <View key={index}>
          {/* Modal start */}
          <View style={styles.centeredView}>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalText}>
                    Do you want to delete this client?
                  </Text>
                  <Pressable
                    onPress={() =>
                      setModalVisible(!modalVisible) & deleteClient()
                    }
                  >
                    <Text style={styles.modalText}>Yes</Text>
                  </Pressable>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.modalText}>No</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {/* Modal end */}

          <View style={styles.headingcontainer}>
            <Text style={styles.heading}>
              {client.clientname} + {client.petname}
            </Text>
          </View>
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: client.image }}
                style={{ width: 300, height: 300, borderRadius: 300 / 2 }}
              />
            </View>
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
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.text}>Delete Client?</Text>
          </Pressable>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#7fa99b" }}>{showNames()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headingcontainer: { flex: 1, alignItems: "center" },
  heading: {
    flex: 1,
    fontSize: 30,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
    color: "#394a51",
  },
  title: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
    color: "#394a51",
  },
  paragraph: {
    flex: 1,
    fontSize: 15,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#394a51",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#fbf2d5",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    padding: 10,
    fontSize: 20,
    color: "#fbf2d5",
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#394a51",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fbf2d5",
    width: "70%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    padding: 10,
    color: "#fbf2d5",
  },
});

export default ClientProfile;

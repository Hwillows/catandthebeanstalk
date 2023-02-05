import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { AsyncStorage } from "react-native";

function Clients({ navigation }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  // nav is to be able to navigate to other screens - sceeen navs set in App.js

  const nav = useNavigation();

  // open database

  const db = SQLite.openDatabase("CATB");

  // Use effect is pulling data from database

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Clients;",
        null,
        (txObj, resultSet) => setClients(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    console.log(clients);
  }, []);

  // Delete function

  const deleteClient = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Clients WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingName = [...clients].filter((name) => name.id !== id);
            setClients(existingName);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showNames = () => {
    return clients.map((client, index) => {
      return (
        <View style={{ flex: 1, padding: 30 }} key={index}>
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
                  <View>
                    <Pressable
                      onPress={() =>
                        setModalVisible(!modalVisible) & getClientId(client.id)
                      }
                    >
                      <Text>View Profile</Text>
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Text>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.row}>
            <Pressable
              style={{ flex: 4 }}
              onPress={() =>
                setModalVisible(!modalVisible) & setClientId(client.id)
              }
              // onPress={() => console.log("Modal button")}
            >
              <Text style={styles.button}>
                {client.clientname} + {client.petname}
              </Text>
            </Pressable>

            <View>
              <Pressable
                style={{ flex: 2 }}
                onPress={() => deleteClient(client.id)}
                // onPress={() => console.log(client.id)}
              >
                <Text style={styles.button}>X</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    });
  };

  // function to pass id prop to client profile screen

  const getClientId = (id) => {
    try {
      setClientId(id);

      navigation.navigate({
        name: "ClientProfile",
        params: { id: clientId },
        merge: true,
      });
    } catch {
      (error) => console.log(error);
    }
  };

  return <View>{showNames()}</View>;
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: "row",
    //  alignSelf: "flex-start",
    //width: "100%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 20,
    shadowColor: "#000",
    borderRadius: 6,
    backgroundColor: "white",
    color: "#20232a",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "stretch",
    height: 50,
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 30,
    paddingTop: 40,
    padding: 10,
    fontWeight: "600",
    fontFamily: "notoserif",
  },
});

export default Clients;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";

function Form() {
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [petName, setPetName] = useState([]);
  const [breed, setBreed] = useState([]);
  const [food, setFood] = useState([]);
  const [temperament, setTemperament] = useState([]);
  const [favouriteToy, setFavouriteToy] = useState([]);
  const [outside, setOutside] = useState([]);
  const [vets, setVets] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [imageURI, setImageURI] = useState([]);

  // open database

  const db = SQLite.openDatabase("CATB");

  // use effect creating table in database

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Clients (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, clientname TEXT, address TEXT, petname TEXT, breed TEXT, food TEXT, temperament TEXT, toy TEXT, outside TEXT, vets TEXT, emergencycontact TEXT);"
      );
    });

    // image picker
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspects: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImageURI(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets);
    }
    console.log(imageURI);
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Photos</Text>;
  }

  // function that adds information into database

  const addClient = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Clients (image, clientname, address, petname, breed, food, temperament, toy, outside, vets, emergencycontact) VALUES ('" +
          imageURI +
          "', '" +
          name +
          "', '" +
          address +
          "', '" +
          petName +
          "', '" +
          breed +
          "', '" +
          food +
          "', '" +
          temperament +
          "', '" +
          favouriteToy +
          "', '" +
          outside +
          "', '" +
          vets +
          "', '" +
          emergencyContact +
          "');",
        (txObj, resultSet) => {
          let currentName = [...name];
          currentName.push({ id: resultSet.insertId, clientname: name });
          setName(currentName);
        },
        (txObj, error) => console.log(error)
      );
      console.log(name, address, petName);
      console.log(imageURI);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* first image picker attempt */}
        <Button title="Choose Image" onPress={() => pickImage()} />
        {image && (
          <Image
            source={{ uri: image[0].uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <FormSection
          label="Client's Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <FormSection
          label="Client's Address"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <FormSection
          label="Pet Name"
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
        />
        <FormSection
          label="Breed"
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
        />
        <FormSection
          label="Pet likes to eat..."
          placeholder="What food do they eat and where is it stored"
          value={food}
          onChangeText={setFood}
        />
        <FormSection
          label="Pet's temperament is..."
          placeholder="Do they like to play? Held? Left alone?"
          value={temperament}
          onChangeText={setTemperament}
        />

        <FormSection
          label="Favourite Toy"
          placeholder="Favourite Toy"
          value={favouriteToy}
          onChangeText={setFavouriteToy}
        />
        <FormSection
          label="Do they go outside?"
          placeholder="Do you want me to let them out?"
          value={outside}
          onChangeText={setOutside}
        />
        <FormSection
          label="Vets Address"
          placeholder="Just to be on the safe side"
          value={vets}
          onChangeText={setVets}
        />
        <FormSection
          label="Emergency Contact"
          placeholder="Their name and contact number"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
        <Button
          title="Add Client"
          onPress={() => {
            addClient();
          }}
        />
      </ScrollView>
    </View>
  );
}

// Style for the new client form
function FormSection(props) {
  const { label, placeholder, value, onChangeText, secureTextEntry } = props;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ padding: 8, fontSize: 18 }}>{label}</Text>
      <TextInput
        style={{ padding: 8, fontSize: 18, backgroundColor: "#ECECED" }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4D2FF",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 8,
  },
});

export default Form;

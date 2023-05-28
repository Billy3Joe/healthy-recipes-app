import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity
 } from 'react-native';
import { useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Import de l'image de profil provisoire
import PlaceholderImage from '../assets/img-profiles/avatar.jpg';

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user's UID
    const uid = firebase.auth().currentUser.uid;
    
    // Retrieve the user document from Firestore
    firebase.firestore().collection('users').doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          // Set the user state with the retrieved data
          setUser(doc.data());
        } else {
          console.log("User document not found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user document:", error);
      });
  }, []);

  const handleEditProfileImage = () => {
    // Logic to handle editing profile image
    console.log("Edit profile image");
  };

  const handleEditName = () => {
    // Logic to handle editing name
    console.log("Edit name");
  };

  const handleEditEmail = () => {
    // Logic to handle editing email
    console.log("Edit email");
  };

  if (!user) {
    // Display a loading state or placeholder while fetching the user data
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

return (
  <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity  style={styles.backButton}>
          <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Édition de l'utilisateur</Text>
      </View>
      <Image source={PlaceholderImage} style={styles.profileImage} />
      <View style={styles.editIconContainer}>
        <Ionicons name="pencil" size={20} color="white" />
      </View>
   
    <TouchableOpacity onPress={handleEditProfileImage} style={[styles.editButton]}>
      <Ionicons name="pencil" size={20} color="white" />
    </TouchableOpacity>
    
    <View style={styles.userInfoContainer}>
      <Text style={styles.name}>{user.Name}</Text>
      <TouchableOpacity onPress={handleEditName} style={[styles.editButton]}>
        <Ionicons name="pencil" size={20} color="white" />
      </TouchableOpacity>
    </View>
    
    

    <View style={styles.emailContainer}>
      <Text style={styles.details}>EMAIL: {user.Email}</Text>
      <TouchableOpacity onPress={handleEditEmail} style={[styles.editButton]}>
          <Ionicons name="pencil" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <BottomBar namePage="Home" />
    </View>
  </View>
  
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },

title:{
  fontSize:25,
  color:'green',
},
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

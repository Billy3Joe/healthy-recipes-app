import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const CreatePost = () => {
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPost = () => {
    // Logique pour ajouter le post
    // Utilisez les valeurs de date, image, title et description pour créer le post
    // par exemple, envoyez les données au serveur ou ajoutez-les à une liste de posts

    // Réinitialisez les valeurs après l'ajout du post
    setDate('');
    setImage('');
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Contenu de votre barre de navigation */}
        <HeaderBar namePage={'CreatePost'} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={text => setDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de l'image"
          value={image}
          onChangeText={text => setImage(text)}
        />
        {image !== '' && <Image source={{ uri: image }} style={styles.image} />}
        <TextInput
          style={styles.input}
          placeholder="Titre"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <Text style={styles.buttonText}>Créer le post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navbar: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'stretch',
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'green',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'green',
    fontSize: 16,
  },
});

export default CreatePost;

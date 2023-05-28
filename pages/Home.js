import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from "../components/BottomBar";
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Récupère un instantané (snapshot) des documents dans la collection 'posts' de Firestore
      const snapshot = await firebase.firestore().collection('posts').get();
      // Initialise un tableau vide pour stocker les posts récupérés
      const fetchedPosts = [];
  
      // Parcourt chaque document dans l'instantané
      for (const doc of snapshot.docs) {
        // Récupère les données du document
        const postData = doc.data();
        // Convertit la date en objet JavaScript Date
        const date = postData.date.toDate();
  
        // Récupère un instantané des données de l'utilisateur à partir de la collection 'users' en utilisant l'ID de l'utilisateur dans le document du post
        const userSnapshot = await firebase.firestore().collection('users').doc(postData.user).get();
        // Récupère les données de l'utilisateur
        const userData = userSnapshot.data();
  
        // Vérifie si les données de l'utilisateur existent
        if (userData) {
          // Crée un objet post en combinant les données du post et les données de l'utilisateur
          const post = {
            id: doc.id,
            ...postData,
            date,
            user: {
              name: userData.Name,
              profileImage: userData.Image,
            },
          };
          // Ajoute le post au tableau des posts récupérés
          fetchedPosts.push(post);
        } else {
          console.error('Données utilisateur introuvables pour le post', doc.id);
        }
      }
  
      // Met à jour l'état avec les posts récupérés
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Erreur lors de la récupération des posts :', error);
    }
};


  const handleCommentPress = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showCommentInput: !post.showCommentInput };
        }
        return post;
      })
    );
  };

  const handleCommentChange = (postId, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comment: text };
        }
        return post;
      })
    );
  };

  const handleCommentSubmit = (postId) => {
    console.log('Comment submitted for post', postId);
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comment: '', showCommentInput: false };
        }
        return post;
      })
    );
  };

  const handleLikePress = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          // Vérifie si le post est déjà aimé, puis met à jour le nombre de likes en conséquence
          const updatedLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          // Retourne un nouvel objet post avec les likes mis à jour et inverse la valeur de isLiked
          return { ...post, likes: updatedLikes, isLiked: !post.isLiked };
        }
        // Retourne le post tel quel s'il ne correspond pas à postId
        return post;
      })
    );
};


  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };
  console.log(posts)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        {posts.map((post) => (
          <View style={styles.card} key={post.id}>
            <View style={styles.userContainer}>
              {/* <Image source={{uri: post.user.profileImage}} style={styles.profileImage} /> */}
              <Text style={styles.userName}>{post.user.name}</Text>
            </View>
            <Image source={{ uri: post.imageURL }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.date}>Publié le {post.date.toLocaleDateString()}</Text>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description}>{post.content}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => handleCommentPress(post.id)}>
                  <Ionicons name="chatbubble-outline" size={24} color="gray" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLikePress(post.id)}>
                  <Ionicons
                    name={post.isLiked ? "heart" : "heart-outline"}
                    size={24}
                    color={post.isLiked ? "red" : "gray"}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.likes}>{post.likes}</Text>
                <Ionicons name="share-outline" size={24} color="gray" style={styles.icon} />
              </View>
              {post.showCommentInput && (
                <View style={styles.commentContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Ajouter un commentaire..."
                    value={post.comment}
                    onChangeText={(text) => handleCommentChange(post.id, text)}
                  />
                  <TouchableOpacity onPress={() => handleCommentSubmit(post.id)}>
                    <Ionicons name="send" size={24} color="gray" style={styles.sendIcon} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
        
      </ScrollView>
      <BottomBar namePage="Home"/>
    </SafeAreaView>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginRight: 12,
  },
  likes: {
    fontSize: 16,
    color: 'gray',
    marginRight: 8,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  commentInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  sendIcon: {
    marginLeft: 8,
  },
});

export default Home;

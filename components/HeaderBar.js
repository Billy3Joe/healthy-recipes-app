import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HeaderBar(props) {
  const navigation = useNavigation();

  const actionNavigationHome = () => {
    navigation.navigate("Home");
  };

  
  const handlePost = () => {
    navigation.navigate("Posts");
  };


  const handleProfile = () => {
    navigation.navigate("Profile");
  };
  
  const handleLogout = () => {
    // Ajoutez ici la logique de déconnexion
    // par exemple, réinitialiser les données de l'utilisateur et rediriger vers l'écran de connexion
  };


  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text style={styles.title}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={(handlePost) => navigation.navigate('Posts')}>
      <Text style={styles.title}>Post</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={(handleProfile) => navigation.navigate('Profile')}>
      <Text style={styles.title}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.title}>Déconnexion</Text>
    </TouchableOpacity>
  </View>
  );
}
export default HeaderBar;

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', 
    paddingTop: 50,
    borderBottomWidth: 1,
    padding:12,
    borderBottomColor: '#DDDDDD',
    },
      
  title: {
    fontSize: 18,
    color:'green',
  },
});
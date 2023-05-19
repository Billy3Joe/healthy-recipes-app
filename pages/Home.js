import {Dimensions, ScrollView, StyleSheet, View } from "react-native";
import BottomBar from "../components/BottomBar";
import HeaderBar from '../components/HeaderBar';
import PictureComponent from "../components/PictureComponent";
import React from 'react';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
function Home() {
    const DisplayPictures = () => {
        let linksPictures = [
          "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg",
          "https://randomwordgenerator.com/img/picture-generator/52e1d2454e55b10ff3d8992cc12c30771037dbf852577148762c7ad2904e_640.jpg",
        ];

        let listUser = [
            "Nathan Dupont",
            "Fabio De Jesus",
            "Gérard Verre",
            "Christophe Morice",
            "Jean-Jacques Lesg",
          ];
      
          let listLocation = [
            "Paris",
            "Colombes",
            "Courbevoie",
            "Nanterre",
            "Kremlin-le-Bicêtre",
          ];

     return linksPictures.map((item, key) => {
      if (key == 0) {
        return (
          <PictureComponent
            customFirstMargin={{ marginTop: 0 }}
            uriImage={item}
            uriImageProfile={
              "https://www.adobe.com/fr/express/create/media_1bcd514348a568faed99e65f5249895e38b06c947.jpeg?width=400&format=jpeg&optimize=medium"
            }
            key={key}
            userName={listUser[getRandomInt(listUser.length - 1)]}
            location={listLocation[getRandomInt(listLocation.length - 1)]}
          />
        );
      }
      if (linksPictures.length - 1 == key) {
        return (
          <PictureComponent
            customLastMargin={{ marginBottom: 110 }}
            uriImage={item}
            uriImageProfile={
              "https://www.adobe.com/fr/express/create/media_1bcd514348a568faed99e65f5249895e38b06c947.jpeg?width=400&format=jpeg&optimize=medium"
            }
            key={key}
            userName={listUser[getRandomInt(listUser.length - 1)]}
            location={listLocation[getRandomInt(listLocation.length - 1)]}
          />
        );
      }
      return (
        <PictureComponent
          uriImage={item}
          key={key}
          uriImageProfile={
            "https://www.adobe.com/fr/express/create/media_1bcd514348a568faed99e65f5249895e38b06c947.jpeg?width=400&format=jpeg&optimize=medium"
          }
          userName={listUser[getRandomInt(listUser.length - 1)]}
          location={listLocation[getRandomInt(listLocation.length - 1)]}
        />
      );
    });
  };  
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar namePage={"Home"} />
      <ScrollView
        style={{
          backgroundColor: "green",
        }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollViewContainer}>
          <DisplayPictures /> 
        </View>
      </ScrollView>
      <BottomBar namePage={"Home"} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get("window").height,
  },
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {},
});

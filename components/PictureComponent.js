import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function PictureComponent(props) {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (props.uriImage) {
      Image.getSize(props.uriImage, (width, height) => {
        setRatio(width / height);
      });
    }
  }, [props.uriImage]);

  const ActualButonNavigation = () => {
    switch (props.picturePage) {
      case true:
        return (
          <View style={[styles.specialContainer, styles.shadowProp]}>
            <View style={{ aspectRatio: ratio, width: 350 }}>
              <Image
                style={styles.imageStyleSpecial}
                source={{
                  uri: props.uriImage,
                }}
              />
            </View>
          </View>
        );
      case false:
        return (
          <View style={[styles.specialContainer, styles.shadowProp]}>
            <View style={{ aspectRatio: ratio, width: 350 }}>
              <Image
                style={styles.imageStyleSpecial}
                source={{
                  uri: props.uriImage,
                }}
              />
            </View>
          </View>
        );
      default:
        return (
          <View
            style={[
              styles.container,
              props.customLastMargin,
              props.customFirstMargin,
              styles.shadowProp,
            ]}
          >
            <View style={[styles.profileInformations]}>
              <View>
                <Image
                  style={styles.imageProfile}
                  source={{
                    uri: props.uriImageProfile,
                  }}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
              </View>
              <View style={[styles.userInfoText]}>
                <Text style={styles.textUserName}>{props.userName}</Text>
              </View>
            </View>
            <View style={{ aspectRatio: ratio, width: 390 }}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri: props.uriImage,
                }}
              />
            </View>
          </View>
        );
    }
  };

  return <ActualButonNavigation />;
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  specialContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  imageStyle: {
    marginTop: 10,
    flex: 1,
  },
  imageStyleSpecial: {
    flex: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  imageProfile: {
    height: 40,
    width: 40,
    flex: 1,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 100,
  },
  userInfoText: {
    justifyContent: "center",
  },
  textUserName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  textLocation: {
    fontSize: 12,
    color: "white",
  },
  profileInformations: {
    flexDirection: "row",
  },
});
export default PictureComponent;

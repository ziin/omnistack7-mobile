import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import api from "../services/api";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

export default class New extends Component {
  static navigationOptions = {
    headerTitle: "Nova publicação"
  };

  state = {
    imagePreview: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleImagePicker = () => {
    ImagePicker.showImagePicker({ title: "Selecionar imagem" }, upload => {
      if (upload.error) {
        console.log("Error upload image.");
      } else if (upload.didCancel) {
        console.log("User cancelled upload image.");
      } else {
        const imagePreview = {
          uri: `data:image/jpge;base64,${upload.data}`
        };

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${new Date().getTime()}.jpg`
        };

        this.setState({
          imagePreview,
          image
        });
      }
    });
  };

  handleSubmit = async () => {
    const form = new FormData();

    form.append("image", this.state.image);
    form.append("author", this.state.author);
    form.append("place", this.state.place);
    form.append("description", this.state.description);
    form.append("hashtags", this.state.hashtags);

    await api.post("/posts", form);

    this.props.navigation.navigate("Feed");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleImagePicker}
        >
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>

        {this.state.imagePreview && (
          <Image source={this.state.imagePreview} style={styles.preview} />
        )}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da publicação"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    borderStyle: "dashed",
    height: 42,

    justifyContent: "center",
    alignItems: "center"
  },

  selectButtonText: {
    fontSize: 16,
    color: "#666"
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 4
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginTop: 10,
    fontSize: 16
  },

  shareButton: {
    backgroundColor: "#7159c1",
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: "center",
    alignItems: "center"
  },

  shareButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF"
  }
});

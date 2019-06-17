import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import api from "../services/api";

import camera from "../assets/camera.png";
import more from "../assets/more.png";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import send from "../assets/send.png";

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{
          marginRight: 10,
          padding: 5,
          paddingHorizontal: 10
        }}
        onPress={() => navigation.navigate("New")}
      >
        <Image source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await api.get("/posts");

    this.setState({
      posts
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.author}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>

                <Image source={more} />
              </View>

              <Image
                style={styles.feedImage}
                source={{ uri: `http://localhost:3333/files/${item.image}` }}
              />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes} custidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  author: {
    fontSize: 14,
    color: "#000"
  },

  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },

  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },

  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: "row"
  },

  action: {
    marginRight: 8
  },

  likes: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },

  description: {
    lineHeight: 18
  },

  hashtags: {
    color: "#7159c1"
  }
});

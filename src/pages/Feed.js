import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import api, { apiUrl } from "../services/api";
import io from "socket.io-client";

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
    this.registerToSocket();

    const { data: posts } = await api.get("/posts");

    this.setState({
      posts
    });
  }

  handleLike = async id => {
    await api.post(`/posts/${id}/like`);
  };

  registerToSocket = () => {
    const socket = io(apiUrl);

    socket.on("post", newPost => {
      this.setState(pS => ({
        posts: [newPost, ...pS.posts]
      }));
    });

    socket.on("like", likedPost => {
      this.setState(pS => ({
        posts: pS.posts.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      }));
    });
  };

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
                source={{ uri: `${apiUrl}/files/${item.image}` }}
              />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
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

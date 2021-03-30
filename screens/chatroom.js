import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import HeaderButton from "../components/HeaderButton";
import Massage from "../components/Massage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/FontAwesome";
import io from "socket.io-client";
import { useSelector ,useDispatch} from "react-redux";
import * as chatActions from "../store/actions/chat";

const chatrrom = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [inputhieght, setinputhieght] = useState({ height: "11%" });
  const [socket, setsocket] = useState();
  //let myref;
  const [massage_, setmassage] = useState();
  const userid = useSelector((state) => state.auth.userId);
  const [chats, setchats] = useState([]);
  const dispatch = useDispatch();

  const renderListItem = (itemData) => {
    return (
      <Massage
        time={new Date(itemData.item.date)}
        name={itemData.item.name}
        massage={itemData.item.massage}
        self={itemData.item.self === userid}
      />
    );
  };

  useEffect(() => {
    var socket_ = io("http://192.168.1.103:3000", {
      auth: {
        token: token,
      },
    });
  
    setsocket(socket_);
    dispatch(chatActions.setsocket(socket_))
    socket_.on("list_users", (data) => {
      dispatch(chatActions.setusers(data.clients))
      socket_.on("chats", (data) => {
        setchats((curPastGuesses) => [data, ...curPastGuesses]);
      });
    });
    socket_.on("new_user", (data) => {
      dispatch(chatActions.setonlineusers(data.connected_user))
    });
    socket_.on("disconnected_user", (data) => {
      dispatch(chatActions.removeonlineuser(data.disconnected_user))
    });
  }, []);

  const send = () => {
    setmassage("");
    socket.emit("chat-message", {
      msg: massage_,
      userid: userid,
    });
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-85}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View>
        <View style={styles.chatcontainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            ref={(ref) => {
              myref = ref;
            }}
            inverted
            style={styles.flatlist}
            data={chats}
            renderItem={renderListItem.bind(this)}
            contentContainerStyle={styles.list}
            //onContentSizeChange={()=>{myref.scrollToEnd({animated:true})}}
          />
        </View>

        <View style={{ ...styles.massageinput_container, ...inputhieght }}>
          <TextInput
            onFocus={() => {
              setinputhieght({ height: 58 });
            }}
            onBlur={() => {
              setinputhieght({ height: "11%" });
            }}
            style={styles.massage_input}
            multiline
            label="Massage ..."
            onChangeText={(msg) => {
              setmassage(msg);
            }}
            value={massage_}
            theme={{
             
              colors: {
                primary:'#0084ff',
              }}}
          />
          <Button
            style={styles.send_btn}
            onPress={() => {
              send();
            }}
            mode="text"
          >
            <Icon name="paper-plane" size={25} color="#0084ff" />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chatrrom;

const styles = StyleSheet.create({
  flatlist: {
    height: "88.1%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 10,
  },
  massageinput_container: {
    position: "relative",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  send_btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 0,
  },
  massage_input: {
    width: "80%",
    backgroundColor: "white",
    borderTopRightRadius: 0,
  },
  chatcontainer: {
    paddingBottom : 10
  }
});
export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={"md-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add" iconName={"people-outline"} onPress={() => {
          navData.navigation.navigate('onlineusers')
        }} />
      </HeaderButtons>
    ),
    
  };
};

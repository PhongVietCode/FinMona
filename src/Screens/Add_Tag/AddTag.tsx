import { Header } from "@/Components/Header/Header";
import { RootStackParamList } from "@/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList } from "native-base";
import AddIcon from "../../../assets/icons/circle-plus.svg";

import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { BottomSheet } from "react-native-btr";
import { useEffect, useState } from "react";
import { BigButton } from "@/Components/BigButton/BigButton";
import { InputItem } from "@/Components/Input/InputItem";
import {
  Tag,
  useAddTagMutation,
  useLazyGetAllRecordsQuery,
  useLazyGetAllTagsQuery,
} from "@/Services";
import { TextInput } from "react-native-paper";
import { gStyles } from "@/Theme";
import { transactionStyle } from "@/Components/TransactionItem/TransactionItem";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export const AddTag = () => {
  const initialForm: Omit<Tag, "id"> = {
    icon: "undefined",
    title: "",
    type: "Money Source",
  };
  const [showAddModal, setShowAddModal] = useState(false);

  const [formAddTag, setFormAddTag] = useState(initialForm);
  const [choosenType, setChoosenType] = useState(1);

  const [list, setList] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState(list[0]);

  const [addTag, addTagResult] = useAddTagMutation();
  const user = useSelector((state: RootState) => state.user);

  const handleSaveTag = async (event: any) => {
    setShowAddModal(false);
    if (formAddTag.title != "") {
      await addTag({
        id: user.id,
        body: {
          ...formAddTag,
          title: formAddTag.title + "_" + formAddTag.icon,
        },
      });
    }
    setFormAddTag(initialForm);
    setChoosenType(1);
    setList([]);
  };

  const [fetchTag, { data, isLoading, isFetching }] = useLazyGetAllTagsQuery();

  useEffect(() => {
    fetchTag({ id: user.id });
  }, [data]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const swipeRight = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={{
          backgroundColor: "red",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            marginLeft: "auto",
            marginRight: 50,
            fontSize: 15,
            fontWeight: "bold",
            transform: [{ scale }],
          }}
        >
          Delete Item
        </Animated.Text>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.BACKGROUND, flex: 1 }}>
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft fill={Colors.TEXT_BOLD} />
          </Pressable>
        }
        right={
          <Pressable onPress={() => setShowAddModal(!showAddModal)}>
            <AddIcon fill={Colors.GREEN_80} />
          </Pressable>
        }
        center={
          <View>
            <Text style={{ fontSize: 21, fontWeight: "700" }}>
              New Tag For You
            </Text>
          </View>
        }
      ></Header>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[gStyles.title2]}>Category: </Text>
        {isLoading ? (
          <Text>Loading Tags...</Text>
        ) : (
          <View>
            {data
              ?.filter((item) => item.type === "Category")
              .map((item, index) => {
                const style = transactionStyle(item.title.split("_")[1]);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      padding: 10,
                      alignItems: "center",
                      gap: 10,
                      backgroundColor: Colors.STROKE,
                      marginVertical: 2,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        backgroundColor: style?.backgroundIconColor,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    >
                      {style?.icon}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.title.split("_")[0]}
                    </Text>
                  </View>
                );
              })}
            {/* <FlatList
              data={data?.filter((item) => item.type === "Category")}
              renderItem={({ item, index }) => {
                const style = transactionStyle(item.title.split("_")[1]);
                return (
                  <GestureHandlerRootView>
                    <Swipeable
                      renderRightActions={swipeRight}
                      rightThreshold={-20}
                    >
                      <Animated.View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          padding: 10,
                          alignItems: "center",
                          gap: 10,
                          backgroundColor: Colors.STROKE,
                          marginVertical: 2,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            backgroundColor: style?.backgroundIconColor,
                            padding: 5,
                            borderRadius: 5,
                          }}
                        >
                          {style?.icon}
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                          {item.title.split("_")[0]}
                        </Text>
                      </Animated.View>
                    </Swipeable>
                  </GestureHandlerRootView>
                );
              }}
            /> */}
          </View>
        )}
        <Text style={[gStyles.title2]}>Money Source: </Text>
        {isLoading ? (
          <Text>Loading Tags...</Text>
        ) : (
          <View>
            {data
              ?.filter((item) => item.type === "Money Source")
              .map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    padding: 14,
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: Colors.STROKE,
                    marginVertical: 2,
                  }}
                  key={index}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {item.title.split("_")[0]}
                  </Text>
                </View>
              ))}
          </View>
          // <FlatList
          //   data={data?.filter((item) => item.type === "Money Source")}
          //   renderItem={({ item, index }) => (
          //     <GestureHandlerRootView>
          //       <Swipeable renderRightActions={swipeRight} rightThreshold={-20}>
          //         <Animated.View
          //           style={{
          //             flex: 1,
          //             flexDirection: "row",
          //             // height: 70,
          //             paddingVertical: 10,
          //             alignItems: "center",
          //             borderBottomWidth: 1,
          //             backgroundColor: Colors.STROKE,
          //             gap: 10,
          //           }}
          //         >
          //           <Text style={{ fontSize: 16, fontWeight: "600" }}>
          //             {item.title.split("_")[0]}
          //           </Text>
          //         </Animated.View>
          //       </Swipeable>
          //     </GestureHandlerRootView>
          //   )}
          // />
        )}
      </View>
      <BottomSheet
        visible={showAddModal}
        onBackdropPress={() => {
          setShowAddModal(false);
          setFormAddTag(initialForm);
          setChoosenType(1);
          setList([]);
        }}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: Colors.BACKGROUND,
            borderRadius: 20,
            padding: 10,
            gap: 10,
          }}
        >
          <ScrollView>
            <View
              style={{
                width: "20%",
                height: 5,
                backgroundColor: Colors.TEXT_LIGHT,
                borderRadius: 50,
                alignSelf: "center",
              }}
            />
            <View style={{ width: "100%", height: 100 }}>
              <InputItem
                showKeyboard={true}
                value={formAddTag.title}
                label="Tag Name"
                onChangeText={(t) => {
                  setFormAddTag({ ...formAddTag, title: t.toString() });
                }}
                placeholder="Snack for Poppy"
                right={<></>}
              />
            </View>
            <View>
              <Text style={[gStyles.title2, { fontSize: 16 }]}>Type:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginBottom: 20,
                  gap: 8,
                }}
              >
                <Pressable
                  onPress={() => {
                    setChoosenType(1);
                    setList([]);
                    setFormAddTag({ ...formAddTag, type: "Money Source" });
                  }}
                  style={{
                    backgroundColor:
                      choosenType == 1 ? Colors.PRIMARY : Colors.STROKE,
                    alignItems: "center",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: choosenType == 1 ? Colors.WHITE : Colors.TEXT_BOLD,
                      padding: 10,
                      fontSize: 16,
                    }}
                  >
                    Money Source
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setChoosenType(0);
                    setList(["Shopping", "Food", "Transport", "Party"]);
                    setActiveItem("Shopping");
                    setFormAddTag({
                      ...formAddTag,
                      icon: "Shopping",
                      type: "Category",
                    });
                  }}
                  style={{
                    backgroundColor:
                      choosenType == 0 ? Colors.PRIMARY : Colors.STROKE,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      color: choosenType == 0 ? Colors.WHITE : Colors.TEXT_BOLD,
                      fontSize: 16,
                    }}
                  >
                    Category
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {list?.map((i, index) => (
                <View
                  style={{
                    backgroundColor:
                      activeItem == i ? Colors.PRIMARY : Colors.TEXT_LIGHT,
                    borderRadius: 12,
                    margin: 4,
                  }}
                  key={index}
                >
                  <Pressable
                    onPress={() => {
                      setActiveItem(i);
                      setFormAddTag({ ...formAddTag, icon: i });
                    }}
                  >
                    <Text
                      key={index}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        color:
                          activeItem == i ? Colors.WHITE : Colors.TEXT_BOLD,
                      }}
                    >
                      {i}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
            <View style={{ paddingVertical: 10, gap: 10 }}>
              <BigButton
                text={"Add to my account"}
                backgroundColor={Colors.PRIMARY}
                textColors={Colors.WHITE}
                icon={undefined}
                onPress={(e: any) => {
                  handleSaveTag(e);
                }}
                textStyle={FontSize.REGULAR}
              ></BigButton>
              <BigButton
                text={"Cancle"}
                backgroundColor={Colors.STROKE}
                textColors={Colors.LIGHT_GRAY}
                icon={undefined}
                onPress={(e: any) => {
                  handleSaveTag(e);
                }}
                textStyle={FontSize.REGULAR}
              ></BigButton>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

import { BigButton } from "@/Components/BigButton/BigButton";
import { InputItem } from "@/Components/Input/InputItem";
import { RootStackParamList } from "@/Navigation";
import { Colors, FontSize } from "@/Theme/Variables";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import * as Sentry from "@sentry/react-native";
import { UserFeedback } from "@sentry/react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
export const FeedbackScreen = () => {
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useSelector((state:RootState) => state.user)
  const sendFeedback = () => {
    if (feedbackMsg != "") {
      const sentryId = Sentry.captureMessage(user.id);
      const userFeedback: UserFeedback = {
        event_id: sentryId,
        name: user.name ,
        email: user.email,
        comments: feedbackMsg,
      };

      Sentry.captureUserFeedback(userFeedback);
      Toast.show("Thank you for your feed back!");
      setFeedbackMsg("");
      navigation.goBack();
    } else {
      Toast.show("Your feedback is empty!");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ flexGrow: 1, paddingHorizontal: 16 }}>
        <ScrollView>
          <InputItem
            onChangeText={(val) => {
              setFeedbackMsg(val);
            }}
            label={"Your feed back:"}
            placeholder={"Type something"}
            right={undefined}
            value={feedbackMsg}
            showKeyboard={true}
          />
        </ScrollView>

        <BigButton
          text={"Send"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={() => sendFeedback()}
          textStyle={FontSize.REGULAR}
        />
        <View style={{ height: 10 }}></View>
        <BigButton
          text={"Cancle"}
          backgroundColor={Colors.TRANSPARENT}
          textColors={Colors.LIGHT_GRAY}
          icon={undefined}
          onPress={() => {
            setFeedbackMsg("");
            navigation.goBack();
          }}
          textStyle={FontSize.REGULAR}
        />
      </View>
    </SafeAreaView>
  );
};

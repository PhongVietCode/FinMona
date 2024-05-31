import { useRoute } from "@react-navigation/native";
import { LoadingScreen } from "./LoadingScreen";
import { UserLoginInfo, useLoginUserMutation } from "@/Services";
import { useEffect } from "react";

export const LoadingScreenContainer = () => {
  return <LoadingScreen/>;
};

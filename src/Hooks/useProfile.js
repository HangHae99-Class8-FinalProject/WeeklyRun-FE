import { useMutation, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const userProfile = async image => {
  return await instance.put(`/api/user/image`, image);
};

export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userProfile, {
    onSuccess: data => {
      queryClient.invalidateQueries("userData");
      queryClient.invalidateQueries(["user"]);
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};

const editNickname = async nickname => {
  return await instance.put("/api/user/nickname", { nickname });
};

export const EditNicknameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(editNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
      queryClient.invalidateQueries(["user"]);
    }
  });
};

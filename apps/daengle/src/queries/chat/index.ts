import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteChatDelete,
  getChatStart,
  getChatUserGroomerList,
  getChatUserVetList,
  getChatWith,
  postChatMessages,
} from '~/apis';
import { GetchatStartRequestParams, PostChatMessagesRequestArgs } from '~/models/chat';
import { QUERY_KEYS } from '../query-keys';

export const useGetChatUserGroomerListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CHAT_USER_GROOMER_LIST,
    queryFn: getChatUserGroomerList,
  });
};

export const useGetChatUserVetListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CHAT_USER_VET_LIST,
    queryFn: getChatUserVetList,
  });
};

export const useGetChatWithQuery = (otherId?: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.GET_CHAT_WITH, otherId],
    queryFn: () => getChatWith({ otherId: Number(otherId) }),
    enabled: !!otherId,
  });
};

export const usePostChatMessages = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST_CHAT_MESSAGES,
    mutationFn: ({ roomId, body }: PostChatMessagesRequestArgs) =>
      postChatMessages({ roomId, body }),
  });
};

export const useDeleteChatDeleteMutation = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.DELETE_CHAT_DELETE,
    mutationFn: deleteChatDelete,
  });
};

export const useGetChatStartQuery = ({
  params,
  enable,
}: {
  params: GetchatStartRequestParams;
  enable: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CHAT_START,
    queryFn: () => getChatStart(params),
    enabled: !!params.otherId && enable,
  });
};

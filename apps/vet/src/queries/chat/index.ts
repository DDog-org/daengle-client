import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteChatDelete, getChatVetList, getChatWith, postChatMessages } from '~/apis';
import { PostChatMessagesRequestArgs } from '~/models';
import { QUERY_KEYS } from '../query-keys';

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

export const useGetChatVetList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CHAT_VET_LIST,
    queryFn: getChatVetList,
  });
};
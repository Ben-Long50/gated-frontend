import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socket } from '../../socket';
import { Action } from 'src/types/action';
import { Item } from 'src/types/item';
import activateAction from './activateAction';

const useActivateActionMutation = (
  apiUrl: string,
  itemId: number,
  actionId: number,
) => {
  const queryClient = useQueryClient();

  const editProfitsMutation = useMutation({
    mutationFn: async (value: boolean) => {
      await activateAction(apiUrl, actionId, value);
    },
    onMutate: (value) => {
      queryClient.cancelQueries({ queryKey: ['item', itemId] });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        itemId,
      ]);

      queryClient.setQueryData(['item', itemId], () => ({
        ...prevItemData,
        itemLinkReference: {
          ...prevItemData?.itemLinkReference,
          actions: prevItemData?.itemLinkReference?.actions.map(
            (action: Action) =>
              action.id === actionId ? { ...action, active: !value } : action,
          ),
        },
      }));

      return { prevItemData };
    },

    onSuccess: () => {
      socket.emit('item', itemId);
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
    throwOnError: false,
  });
  return editProfitsMutation;
};

export default useActivateActionMutation;

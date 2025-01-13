import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteBookEntry from './deletePatchNote';

const useDeletePatchNoteMutation = (
  apiUrl: string,
  patchNoteId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteBookEntry(apiUrl, patchNoteId);
    },
    onSuccess: () => {
      navigate('/glam/codex');
      queryClient.invalidateQueries({
        queryKey: ['patchNote'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['patchNotes'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeletePatchNoteMutation;

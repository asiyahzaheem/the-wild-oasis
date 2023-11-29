import { useQuery } from '@tanstack/react-query';
import { getGuest } from '../../services/apiGuests';

export function useGuest() {
  const {
    isLoading,
    data: guest,
    error,
  } = useQuery({
    queryKey: ['guest'],
    queryFn: getGuest,
  });
  return { isLoading, guest, error };
}

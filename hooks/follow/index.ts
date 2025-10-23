import { useMutation, useQuery } from '@tanstack/react-query';
import { followServiceInstance } from '~/services/follow';

export function useSuggestedUsers() {
  return useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => followServiceInstance().getSuggestedUsers(),
  });
}

export function useFollowUser() {
  return useMutation({
    mutationFn: (userId: string) => followServiceInstance().followUser(userId),
  });
}

export function useUnfollowUser() {
  return useMutation({
    mutationFn: (userId: string) => followServiceInstance().unfollowUser(userId),
  });
}

export function useRemoveFollower() {
  return useMutation({
    mutationFn: (userId: string) => followServiceInstance().removeFollower(userId),
  });
}

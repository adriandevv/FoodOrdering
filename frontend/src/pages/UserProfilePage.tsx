import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";

export const UserProfilePage = () => {
  const { updateUser, isPending: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to Load user Profile</div>;
  }
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
};

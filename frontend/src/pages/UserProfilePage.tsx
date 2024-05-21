import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";


export const UserProfilePage = () => {
  const { updateUser, isPending} = useUpdateMyUser();
  const { currentUser, isLoading } = useGetMyUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <UserProfileForm onSave={updateUser} isLoading={isPending} currentUser={currentUser}   />;
};

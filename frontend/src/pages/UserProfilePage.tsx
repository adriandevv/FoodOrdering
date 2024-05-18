import { useUpdateMyUser } from "@/api/MyUserApi";
import { useToast } from "@/components/ui/use-toast";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";
import React from "react";

export const UserProfilePage = () => {
  const { updateUser, isPending} = useUpdateMyUser();


  return <UserProfileForm onSave={updateUser} isLoading={isPending} />;
};

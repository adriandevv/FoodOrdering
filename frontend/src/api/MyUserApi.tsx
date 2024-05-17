import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error creating user");
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
    isLoading
  } = useMutation({ mutationFn: createMyUserRequest });

  return {
    createUser,
    isError,
    isPending,
    isSuccess,
    isLoading
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error updating user");
    }
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    isSuccess,
    isLoading,
    reset,
  } = useMutation({ mutationFn: updateMyUserRequest });

  return {
    updateUser,
    isPending,
    isError,
    isSuccess,
    isLoading
  };
};

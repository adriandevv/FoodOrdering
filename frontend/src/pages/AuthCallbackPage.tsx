import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallbackPage = () => {
const hasCreateUser = useRef(false);
const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreateUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
        hasCreateUser.current = true;
    }
    navigate("/");
  }, [user, createUser, navigate]);
  
  return <>Loading...</>;
};

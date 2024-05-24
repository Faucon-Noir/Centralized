// Exemple de hook avec une action

import { useDataProps } from "./type";
import { useRouter } from "next/router";

function useData(): useDataProps {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("connected", "false");
    router.push('/login')
  };
  return {
    logout,
  };
}

export default useData;

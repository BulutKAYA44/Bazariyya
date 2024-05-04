/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStateStorage } from "../hooks/use-state-storage";
import { getCustomer, loginUser, refreshToken } from "../services/auth";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "./Loading";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [token, setToken, removeToken] = useStateStorage("token");
  const { addToast } = useToasts();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      refreshToken({ token: JSON.parse(localStorage.getItem("token")) }).then(
        (res) => {
          if (res.isSuccess === false) {
            removeToken("token");
            setUser(false);
          } else {
            const { email } = res.value;
            getCustomer({ email })
              .then((response) => {
                setUser(response.value);
              })
              .catch((error) => {
                removeToken("token");
                setUser(false);
                throw error;
              });
          }
        }
      );
    } else {
      setUser(false);
    }
  }, [removeToken]);

  const login = useCallback(
    (payload) => {
      showLoading();
      return loginUser(payload)
        .then((customer) => {
          if (customer?.isSuccess) {
            setToken(customer.value.token);
            setUser(customer.value);
            history.push("/");
            addToast("Giriş Başarılı", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          } else {
            addToast(customer.message, {
              appearance: "warning",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
        })
        .catch(function (err) {
          addToast(err.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        })
        .finally(() => {
          hideLoading();
        });
    },
    [setToken]
  );

  const logout = useCallback(() => {
    removeToken("token");
    setUser(false);
    history.push("/login-register");
  }, [removeToken]);

  const context = useMemo(
    () => ({ user, token, login, logout, setUser }),
    [user, token, login, logout, setUser]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

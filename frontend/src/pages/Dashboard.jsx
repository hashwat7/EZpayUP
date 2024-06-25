import axios from "axios";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useContext, useEffect, useMemo, useState } from "react";
import { NotLoggedIn } from "../components/NotLoggedIn";
import { ChangeContext } from "../context/ChangeContext";
export const Dashboard = () => {
  const { state, setState } = useContext(ChangeContext);
  const [username, setUsername] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const AuthStr = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${AuthStr}`,
        "Content-Type": "application/json",
      };
      try {
        let user = await axios.get(
          "http://localhost:3000/api/v1/user/username",
          {
            headers: headers,
          }
        );
        setUsername(user.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${AuthStr}`,
          "Content-Type": "application/json",
        };
        const balance = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: headers,
          }
        );
        setUserBalance(balance.data.balance.toFixed(2));
      } catch (e) {
        console.log(e);
      }
    };
    fetchBalance();
  }, [state]);

  return (
    <>
      {AuthStr ? (
        username && (
          <div>
            <Appbar username={username} />
            <div className="m-8">
              {userBalance && <Balance value={userBalance} />}
              <Users balance={userBalance} username={username} />
            </div>
          </div>
        )
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

function useAsyncEffect(effect, dependencies) {
  useEffect(() => {
    const executeEffect = async () => {
      try {
        await effect();
      } catch (error) {
        console.error("useAsyncEffect error:", error);
      }
    };

    executeEffect();
  }, dependencies);
}

import "./styles.css";
import React, { useCallback, useState } from "react";
import { getUser, TUser } from "services/user";
import { MainHeader } from "components/header/MainHeader";
import { UserInfo } from "components/userInfo/UserInfo";
import { Button } from "components/ui/button/Button";
import { useThrottle } from "hooks/useThrottle";
import { useCache } from "hooks/useCache";

const getRandomId = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

export default function App(): React.ReactElement {
  const [user, setUser] = useState<TUser | null>(null);
  const throttle = useThrottle();
  const cacheUserDecorator = useCache<{ id: number }, Promise<TUser>>();

  const getRandomUser = useCallback(async () => {
    const id = getRandomId();
    const getCachingUser = cacheUserDecorator(String(id), getUser);
    const cacheUser = await getCachingUser({ id });

    if (cacheUser && (!user || user.id !== cacheUser.id)) setUser(cacheUser);
  }, [user]);

  const throttledHandleGetRandomUser = useCallback(
    throttle({ fn: getRandomUser, timeout: 1500 }),
    [],
  );

  return (
    <div className="App">
      <MainHeader />
      <div className="user-block">
        <div className="user-info-wrapper">
          {user ? (
            <UserInfo name={user.name} phone={user.phone} />
          ) : (
            <div className="empty-user-container">
              <h1>Нет пользователя</h1>
            </div>
          )}
        </div>
        <Button onClick={throttledHandleGetRandomUser} text="Get Random User" />
      </div>
    </div>
  );
}

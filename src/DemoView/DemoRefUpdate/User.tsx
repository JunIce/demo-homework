import React, { useEffect, useReducer, useRef, useState } from "react";

function UserAvatar(props: any) {
  return <img src={props.src} />;
}

function Username(props: any) {
  return <span title={props.name}>{props.name}</span>;
}

function User() {
  const user: any = useRef({
    name: "Aleem Isiaka",
    avatarURL: "https://img0.baidu.com/it/u=1052183467,2208766155&fm=253&fmt=auto&app=138&f=JPG?w=500&h=554",
  });
  const [isMounted, update] = useReducer(p => p, true)
  const [, setForceUpdate] = useState(Date.now());

  console.log("Original Name", user.current.name);
  console.log("Original Avatar URL", user.current.avatarURL);

  useEffect(() => {
    setTimeout(() => {
      user.current = {
        name: "Isiaka Aleem",
        avatarURL: "https://img2.baidu.com/it/u=3578141918,1197615152&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500", // a new image
      };

      console.log(111);
      setForceUpdate(Date.now());
      
    }, 5000);
  });

  // Both children won't be re-rendered due to shallow rendering mechanism
  // implemented for useRef
  return (
    <>
        {/* <span>{user.name}</span> */}
      <Username name={user.current.name} />
      <UserAvatar src={user.current.avatarURL} />
    </>
  );
}

export { User };

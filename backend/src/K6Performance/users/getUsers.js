import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 5,
  duration: "1s",
};

export default function () {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJEYW5pZWwiLCJlbWFpbCI6ImdhbWVteTE3N0BnbWFpbC5jb20iLCJ1c2VyX2lkIjoiMTU1MjYyOWEtNjJhYS00N2Q5LWI5ZDktMDI0YTJhNjdiNDQ3IiwicHJvZmlsZUltYWdlIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P3E9ODAmdz0xNDM0JmF1dG89Zm9ybWF0JmZpdD1jcm9wJml4bGliPXJiLTQuMC4zJml4aWQ9TTN3eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCIsImZ1bGxOYW1lIjoiRGFuaWVsIEthc2VlIiwiaWF0IjoxNzAzMTUzMTM5LCJleHAiOjE3MDMyMzk1Mzl9.o-NEEXgrcFcK-I5lmSVZXwZoGYpUQCOJVAI8lBdBUS8";

  const params = {
    headers: {
          "Content-Type": "application/json",
          token: token
    },
  };

  let response = http.get("http://localhost:4201/user/", params);

  check(response, {
    "is status 200?": (res) => res.status == 200,
  });

  sleep(1);
}

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 5,
  duration: "3s",
};

export default function () {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJEYW5pZWwiLCJlbWFpbCI6ImdhbWVteTE3N0BnbWFpbC5jb20iLCJ1c2VyX2lkIjoiMTU1MjYyOWEtNjJhYS00N2Q5LWI5ZDktMDI0YTJhNjdiNDQ3IiwicHJvZmlsZUltYWdlIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgwMjAzODIxMTMtYTdlOGZjMzhlYWM5P3E9ODAmdz0xNDM0JmF1dG89Zm9ybWF0JmZpdD1jcm9wJml4bGliPXJiLTQuMC4zJml4aWQ9TTN3eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRCIsImZ1bGxOYW1lIjoiRGFuaWVsIEthc2VlIiwiaWF0IjoxNzAzMTUzMTM5LCJleHAiOjE3MDMyMzk1Mzl9.o-NEEXgrcFcK-I5lmSVZXwZoGYpUQCOJVAI8lBdBUS8";
  const body = JSON.stringify({
    created_by_user_id: "bd15993b-f1d5-4a44-8d5d-7d9f75d5d3a4",
    caption: "This is my first Post",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  };

  let response = http.post("http://localhost:4201/post", body, params);

  check(response, {
    "is status 200?": (res) => res.status == 200,
    "is successfully logged in?": (res) =>
      res.body.includes("Post created successfully"),
  });

  sleep(1);
}

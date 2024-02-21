import type { Handler } from "@netlify/functions";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../../src/utils/data";
export const handler: Handler = async (event, context) => {
  let data;
  const querySnapShot = await getDocs(collection(db, "Task-Manager"));
  querySnapShot.forEach((doc) => {
    data = doc.data();
    delete data.title;
  });
  // activated the function for header get the ID and title of the task
  return {
    body: JSON.stringify(data),
    statusCode: 201,
  };
};

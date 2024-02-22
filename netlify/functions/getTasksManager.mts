import type { Handler } from "@netlify/functions";
import { collection, getDocs } from "firebase/firestore";
import db from "../../src/utils/data";
export const handler: Handler = async (event, context) => {
  const data: { title: string; id: string }[] = [];
  const querySnapShot = await getDocs(collection(db, "Task-Manager"));
  querySnapShot.forEach((doc) => {
    data.push({ title: doc.data().title, id: doc.id });
  });
  // activated the function for header get the ID and title of the task
  return {
    body: JSON.stringify(data),
    statusCode: 200,
  };
};

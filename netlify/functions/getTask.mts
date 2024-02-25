import type { Handler } from "@netlify/functions";
import { doc, getDoc } from "firebase/firestore";
import db from "../../src/utils/data";

export const handler: Handler = async (event, context) => {
  const { docID } = JSON.parse(event.body);
  console.log(docID);
  let data;
  const docRef = doc(db, "Task-Manager", docID);
  const docSnap = await getDoc(docRef);
  data = docSnap.data();
  // activated the function for header get the ID and title of the task
  return {
    body: JSON.stringify(data.taskList),
    statusCode: 200,
  };
};

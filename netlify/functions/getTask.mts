import type { Handler } from "@netlify/functions";
import { doc, getDoc } from "firebase/firestore";
import db from "../../src/utils/data";

export const handler: Handler = async (event, context) => {
  const { docID } = JSON.parse(event.body);
  console.log(docID);
  let data;
  const docRef = doc(db, "Task-Manager", docID);
  const docSnap = await getDoc(docRef);
  data = {
    todo: docSnap.data().taskList.filter((task: any) => task.status === "todo"),
    doing: docSnap
      .data()
      .taskList.filter((task: any) => task.status === "doing"),
    done: docSnap.data().taskList.filter((task: any) => task.status === "done"),
  };
  // activated the function for header get the ID and title of the task
  return {
    body: JSON.stringify(data),
    statusCode: 200,
  };
};

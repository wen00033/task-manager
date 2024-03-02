import type { Handler } from "@netlify/functions";
import { doc, getDoc } from "firebase/firestore";
import db from "../../src/utils/data";

export const handler: Handler = async (event, context) => {
  const { docID } = JSON.parse(event.body || "{}");
  try {
    const docRef = doc(db, "Task-Manager", docID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return {
        body: JSON.stringify({ message: "Document does not exist" }),
        statusCode: 404,
      };
    }
    let data = {
      todo: docSnap
        .data()
        .taskList.filter((task: any) => task.status === "todo"),
      doing: docSnap
        .data()
        .taskList.filter((task: any) => task.status === "doing"),
      done: docSnap
        .data()
        .taskList.filter((task: any) => task.status === "done"),
    };
    return {
      body: JSON.stringify(data),
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ message: "Document does not exist" }),
      statusCode: 404,
    };
  }
};
// activated the function for header get the ID and title of the task

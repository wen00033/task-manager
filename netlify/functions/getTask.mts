import type { Handler } from "@netlify/functions";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../../src/utils/data";
// const database = getDatabase();

export const handler: Handler = async (event, context) => {
  const { docID } = JSON.parse(event.body || "{}");
  // can't return a call back function in onSnapshot,use combination of promise and onSnapshot return a promise
  return new Promise((resolve, reject) => {
    try {
      const docRef = doc(db, "Task-Manager", docID);
      const data = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
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
          resolve({
            body: JSON.stringify(data),
            statusCode: 200,
          });
        } else {
          reject({
            body: JSON.stringify({ message: "Document does not exist" }),
            statusCode: 404,
          });
        }
      });
    } catch (error) {
      return {
        body: JSON.stringify({ message: "Document does not exist" }),
        statusCode: 404,
      };
    }
  });
};
// activated the function for header get the ID and title of the task

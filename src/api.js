import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { db } from "./firebase-config";
import { DOCUMENT_PATH } from "./constants";

export const dataCollectionRef = collection(db, DOCUMENT_PATH);

/**
 * @typedef {{
 * title: String
 * description: String
 * endDate: Number
 * attachments: Array<String>
 * isFinished: Boolean
 * }} Task
 */

/**
 * Gets data from firebase
 * @param {CollectionReference<DocumentData>} dataRef
 * @returns {Task[]} parsed array of tasks
 */
export const getTasks = async dataRef => {
  const data = await getDocs(dataRef);
  const parsedData = data.docs.map(it => ({ ...it.data(), id: it.id }));

  return parsedData;
};

/**
 * Delete task
 * @param {String} id
 */
export const deleteTask = async id => {
  const taskDoc = doc(db, DOCUMENT_PATH, id);

  await deleteDoc(taskDoc);
};

/**
 * Add new task
 * @param {Task} taskData
 * @returns {String} new task id
 */
export const addTask = async taskData => {
  const task = await addDoc(dataCollectionRef, taskData);
  
  return task.id;
};

/**
 * Update existing task
 * @param {String} id 
 * @param {Task} data task data
 */
export const updateTask = async (id, data) => {
  const taskDoc = doc(db, DOCUMENT_PATH, id);

  await updateDoc(taskDoc, data);
};

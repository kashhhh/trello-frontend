import { atom } from "recoil";

export const formTaskTitleState = atom({
  key: "formTaskTitle",
  default: "",
});

export const formTaskDescriptionState = atom({
  key: "formTaskDescription",
  default: "",
});

export const formTaskStatusState = atom({
  key: "formTaskStatus",
  default: null,
});

export const formTypeState = atom({
  key: "formType",
  default: "Add",
});

export const taskMaxIdState = atom({
  key: "taskMaxId",
  default: null,
});

export const editTaskIdState = atom({
  key: "editTaskId",
  default: null,
});

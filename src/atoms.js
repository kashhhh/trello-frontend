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

import { useSetRecoilState } from "recoil";
import {
  editTaskIdState,
  formTaskDescriptionState,
  formTaskStatusState,
  formTaskTitleState,
  formTypeState,
} from "./atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "./Axios";
import { toast } from "react-toastify";

const TaskCard = ({ task_id, task_title, task_description, task_status }) => {
  const setFormType = useSetRecoilState(formTypeState);
  const setEditTaskId = useSetRecoilState(editTaskIdState);
  const setFormTitle = useSetRecoilState(formTaskTitleState);
  const setFormDescription = useSetRecoilState(formTaskDescriptionState);
  const setFormStatus = useSetRecoilState(formTaskStatusState);

  const queryClient = useQueryClient();

  const deleteTask = useMutation({
    mutationFn: async (task_id) => {
      await Axios.delete("/deleteTask", {
        params: {
          task_id,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log("Task Deleted");
      toast.success("Task Deleted");
    },
  });

  return (
    <div class="card m-2 ">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">{task_title}</h5>
          <div class="">
            <i
              class="btn bi bi-pencil"
              data-bs-toggle="modal"
              data-bs-target="#formModal"
              onClick={() => {
                setFormType("Edit");
                setEditTaskId(task_id);
                setFormTitle(task_title);
                setFormStatus(task_status);
                setFormDescription(task_description);
              }}
            ></i>
            <i
              class="btn bi bi-trash3 text-danger"
              onClick={() => {
                deleteTask.mutate(task_id);
              }}
            ></i>
          </div>
        </div>
        <p class="card-text">{task_description}</p>
      </div>
    </div>
  );
};

export default TaskCard;

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  editTaskIdState,
  formTaskDescriptionState,
  formTaskStatusState,
  formTaskTitleState,
  formTypeState,
  taskMaxIdState,
} from "./atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "./Axios";
import { toast } from "react-toastify";

const FormModal = () => {
  const [maxId, setMaxId] = useRecoilState(taskMaxIdState);
  const [editTaskId, setEditTaskId] = useRecoilState(editTaskIdState);
  const setFormTitle = useSetRecoilState(formTaskTitleState);
  const setFormDescription = useSetRecoilState(formTaskDescriptionState);
  const setFormStatus = useSetRecoilState(formTaskStatusState);
  const queryClient = useQueryClient();

  const addTask = useMutation({
    mutationFn: async (formData) => {
      await Axios.post("/submitTask", formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setMaxId(maxId + 1);
      toast.success("Task Submitted");
    },
  });

  const editTask = useMutation({
    mutationFn: async (formData) => {
      await Axios.put("/editTask", formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setFormDescription("");
      setFormTitle("");
      setEditTaskId(null);
      toast.success("Task Edited");
    },
  });

  const [title, setTitle] = useRecoilState(formTaskTitleState);
  const [description, setDescription] = useRecoilState(
    formTaskDescriptionState
  );
  const [status, setStatus] = useRecoilState(formTaskStatusState);
  const formType = useRecoilValue(formTypeState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskTitle = e.target.task_title.value;
    const taskDescription = e.target.task_description.value;
    const taskStatus = e.target.task_status.value;

    const formData = new FormData();

    formData.append("task_title", taskTitle);
    formData.append("task_description", taskDescription);
    formData.append("task_status", taskStatus);

    if (formType === "Add") {
      formData.append("task_id", maxId + 1);
      addTask.mutate(formData);
    } else if (formType === "Edit" && editTaskId) {
      formData.append("task_id", editTaskId);
      editTask.mutate(formData);
    }
  };
  return (
    <div
      class="modal fade"
      id="formModal"
      tabindex="-1"
      aria-labelledby="formModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="formModalLabel">
                {formType} Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="h6">Task Title</div>
              <input
                type="text"
                class="form-control"
                name="task_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <br />
              <div class="h6">Task Description</div>
              <textarea
                class="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="task_description"
                required
              />
              <br />
              <div class="h6">Task Status</div>
              <select
                class="form-select"
                name="task_status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected={(e) => status === e.target.value}>
                  todo
                </option>
                <option>doing</option>
                <option>done</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-primary">
                {formType} Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;

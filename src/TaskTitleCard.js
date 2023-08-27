import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import { Axios } from "./Axios";

const getTasks = async () => {
  const response = await Axios.get("/tasks");
  return response.data;
};

const TaskTitleCard = ({ title, color, status }) => {
  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
  return (
    <div class="card m-2 col-3 border-none">
      <div class={`card-body card-title-${color}`}>
        <div class="center-align">
          <h5 class="card-title">{title}</h5>
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#formModal"
          >
            + Add Task
          </button>
        </div>
      </div>
      <div class="tasks-body h-100">
        {isLoading
          ? "Loading"
          : isSuccess
          ? tasks?.map((task) => {
              console.log(status, task);
              if (task?.task_status === status)
                return (
                  <TaskCard
                    task_title={task?.task_title}
                    task_description={task?.task_description}
                    task_id={task?.task_id}
                  />
                );
            })
          : "Something went wrong"}
      </div>
    </div>
  );
};

export default TaskTitleCard;

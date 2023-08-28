import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import { useSetRecoilState } from "recoil";
import { formTaskStatusState, formTypeState, taskMaxIdState } from "./atoms";
import { useEffect } from "react";
import { Axios } from "./Axios";

const TaskTitleCard = ({ title, color, status }) => {
  const getTasks = async () => {
    const response = await Axios.get("/tasks");
    return response.data;
  };
  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
  const setMaxID = useSetRecoilState(taskMaxIdState);

  useEffect(() => {
    if (isSuccess && tasks) {
      let maxId = Math.max(...tasks.map((o) => o.task_id));
      if (isNaN(maxId)) {
        console.log(maxId);
        setMaxID(1);
      } else {
        console.log(maxId);
        setMaxID(maxId);
      }
    }
  }, [isSuccess]);

  const setFormType = useSetRecoilState(formTypeState);
  const setFormTaskStatus = useSetRecoilState(formTaskStatusState);
  return (
    <div class="card m-2 col-12  col-sm-5 col-md-3 row no-gutters">
      <div class={`card-body card-title-${color}`}>
        <div class="center-align">
          <h5 class="card-title">{title}</h5>
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#formModal"
            onClick={() => {
              setFormTaskStatus(status);
              setFormType("Add");
            }}
          >
            + Add Task
          </button>
        </div>
      </div>
      <div class="tasks-body ">
        {isLoading
          ? "Loading"
          : isSuccess
          ? tasks?.map((task) => {
              if (task?.task_status === status)
                return (
                  <TaskCard
                    task_id={task?.task_id}
                    task_title={task?.task_title}
                    task_description={task?.task_description}
                    task_status={task?.task_status}
                  />
                );
            })
          : "Something went wrong"}
      </div>
    </div>
  );
};

export default TaskTitleCard;

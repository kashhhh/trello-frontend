import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";

const TaskTitleCard = ({ title, color }) => {
  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
  });
  return (
    <div class="card m-2 col-3 border-none">
      <div class={`card-body card-title-${color}`}>
        <h5 class="card-title">{title}</h5>
      </div>
      <TaskCard />
    </div>
  );
};

export default TaskTitleCard;

const TaskCard = ({ task_title, task_description, task_id }) => {
  return (
    <div class="card m-2 ">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">{task_title}</h5>
          <div class="">
            <i class="bi bi-pencil m-3"></i>
            <i class="bi bi-trash3 text-danger"></i>
          </div>
        </div>
        <p class="card-text">{task_description}</p>
      </div>
    </div>
  );
};

export default TaskCard;

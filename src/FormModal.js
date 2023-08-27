import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  formTaskDescriptionState,
  formTaskStatusState,
  formTaskTitleState,
} from "./atoms";

const FormModal = () => {
  const [title, setTitle] = useRecoilState(formTaskTitleState);
  const [description, setDescription] = useRecoilState(
    formTaskDescriptionState
  );
  const [status, setStatus] = useRecoilState(formTaskStatusState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yes");
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
                Add/Edit Task
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
                Submit Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;

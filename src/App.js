import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskTitleCard from "./TaskTitleCard";
import FormModal from "./FormModal";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div class="app-body">
          <div class="title-div">
            <h1>Kanban Board</h1>
          </div>
          <div class="container-fluid d-flex flex-wrap justify-content-center">
            <TaskTitleCard title={"To Do"} status={"todo"} color={"red"} />
            <TaskTitleCard title={"Doing"} status={"doing"} color={"yellow"} />
            <TaskTitleCard title={"Done"} status={"done"} color={"green"} />
          </div>
          <FormModal />
          <ToastContainer theme="coloured" />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

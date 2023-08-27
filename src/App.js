import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskTitleCard from "./TaskTitleCard";

const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div class="app-body">
        <div class="title-div">
          <div class="h1">Kanban Board</div>
        </div>

        <div class="d-flex justify-content-center">
          <TaskTitleCard title={"To Do"} color={"red"} />
          <TaskTitleCard title={"Doing"} color={"yellow"} />
          <TaskTitleCard title={"Done"} color={"green"} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;

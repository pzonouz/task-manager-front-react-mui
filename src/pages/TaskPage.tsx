import { useParams } from "react-router-dom";
import TaskComponent from "../components/TaskComponent";

const TaskPage = () => {
  const { taskId } = useParams();
  return <TaskComponent id={taskId!} />;
};

export default TaskPage;

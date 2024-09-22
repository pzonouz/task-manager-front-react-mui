import { useParams } from "react-router-dom";
import TaskComponent from "./TaskComponent";

const TaskPage = () => {
  const { taskSlug } = useParams();
  return <TaskComponent slug={taskSlug} />;
};

export default TaskPage;

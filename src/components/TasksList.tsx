import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useGetTasksQuery } from "../lib/services/task-api";
import { Task } from "../lib/types/task";
import { Link } from "react-router-dom";

const TasksList = () => {
  const { data: tasks, isLoading, isError, errors } = useGetTasksQuery();
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {tasks?.map((task: Task, index) => {
        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CheckIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={`/tasks/${task.name}`}
              sx={{
                paddingY: "1rem",
                bgcolor: index % 2 ? "primary.light" : "",
              }}
              dense
            >
              <ListItemText primary={task?.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TasksList;

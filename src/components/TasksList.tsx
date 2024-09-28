import {
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  useCompleteTaskMutation,
  useGetTasksQuery,
} from "../lib/services/task-api";
import { Task } from "../lib/types/task";
import { Link } from "react-router-dom";

const TasksList = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [completeTask] = useCompleteTaskMutation();
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {tasks?.map((task: Task, index) => {
        return (
          <div key={task.id}>
            {error ? (
              <Alert severity="error">Server Error</Alert>
            ) : (
              <>
                {isLoading && (
                  <CircularProgress
                    sx={{ position: "fixed", left: "50%", top: "50%" }}
                  />
                )}
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => {
                        completeTask(task?.id);
                      }}
                    >
                      {task?.completed ? null : <CheckIcon />}
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    component={Link}
                    to={`/tasks/${task?.id}`}
                    sx={{
                      paddingY: "1rem",
                      bgcolor: index % 2 ? "grey.200" : "",
                      "&:hover": {},
                    }}
                    dense
                  >
                    <ListItemText
                      primary={task?.name}
                      sx={{
                        textDecorationLine: task?.completed
                          ? "line-through"
                          : null,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </div>
        );
      })}
    </List>
  );
};

export default TasksList;

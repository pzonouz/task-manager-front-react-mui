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
import { useGetTasksQuery } from "../lib/services/task-api";
import { Task } from "../lib/types/task";
import { Link } from "react-router-dom";

const TasksList = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
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
                    <IconButton edge="end" aria-label="comments">
                      <CheckIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    component={Link}
                    to={`/tasks/${task?.slug}`}
                    sx={{
                      paddingY: "1rem",
                      bgcolor: index % 2 ? "grey.200" : "",
                      "&:hover": {
                        // bgcolor: index % 2 ? "primary.light" : "white",
                      },
                    }}
                    dense
                  >
                    <ListItemText primary={task?.name} />
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

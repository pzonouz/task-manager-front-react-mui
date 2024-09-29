import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  useCompleteTaskMutation,
  useGetTasksQuery,
} from "../lib/services/task-api";
import { Task } from "../lib/types/task";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TasksList = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [completeTask] = useCompleteTaskMutation();
  const [order, setOrder] = useState("dueDateAsc");
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const filteredTasks = tasks?.filter((task: Task) =>
      done ? true : !task.completed
    );
    const tasksOrderByDueDate = filteredTasks?.slice().sort((a, b) => {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
    const tasksOrderByCreatedDate = filteredTasks?.slice().sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
    switch (order) {
      case "dueDateAsc":
        setTasksList(tasksOrderByDueDate || []);
        break;
      case "dueDateDesc":
        setTasksList(tasksOrderByDueDate?.reverse() || []);
        break;
      case "createdDateAsc":
        setTasksList(tasksOrderByCreatedDate || []);
        break;
      case "createdDateDesc":
        setTasksList(tasksOrderByCreatedDate?.reverse() || []);
        break;
      default:
        setTasksList(tasks || []);
    }
  }, [tasks, order, done]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            label="Order"
          >
            <MenuItem value={"dueDateAsc"}>Due Date Asc</MenuItem>
            <MenuItem value={"dueDateDesc"}>Due Date Desc</MenuItem>
            <MenuItem value={"createdDateAsc"}>Created Date Asc</MenuItem>
            <MenuItem value={"createdDateDesc"}>Created Date Desc</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setDone(e.target.checked);
                }}
              />
            }
            label="Include Completed?"
          />
        </FormControl>
      </div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasksList?.map((task: Task, index) => {
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
    </>
  );
};

export default TasksList;

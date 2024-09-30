import {
  Alert,
  Box,
  Button,
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
  Modal,
  Select,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "../lib/services/task-api";
import { Task } from "../lib/types/task";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Priority } from "../lib/types/priority";
import { Category } from "../lib/types/category";

const TasksList = ({
  priorities,
  categories,
}: {
  priorities: Priority[];
  categories: Category[];
}) => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [order, setOrder] = useState("dueDateAsc");
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [done, setDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");

  useEffect(() => {
    let filteredTask = tasks;

    if (priority !== "all") {
      filteredTask = tasks?.filter((task: Task) => task.priority == priority);
    }
    if (category !== "all") {
      filteredTask = filteredTask?.filter(
        (task: Task) => task.category == category
      );
    }
    const doneFilteredTasks = filteredTask?.filter((task: Task) =>
      done ? true : !task.completed
    );
    const tasksOrderByDueDate = doneFilteredTasks
      ?.slice()
      .sort((a: Task, b: Task) => {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      });
    const tasksOrderByCreatedDate = doneFilteredTasks
      ?.slice()
      .sort((a: Task, b: Task) => {
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
  }, [tasks, order, done, priority, category]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <FormControl variant="standard">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Categories"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            {categories?.map((category: Category) => (
              <MenuItem key={category?.id} value={category?.id}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            {priorities?.map((priority: Priority) => (
              <MenuItem key={priority?.id} value={priority?.id}>
                {priority?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasksList?.map((task: Task, index) => {
          return (
            <div key={task?.id}>
              {error ? (
                <Alert severity="error">Server Error</Alert>
              ) : (
                <>
                  {isLoading && (
                    <CircularProgress
                      sx={{ position: "fixed", left: "50%", top: "50%" }}
                    />
                  )}{" "}
                  <Modal
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    open={modalOpen}
                    onClose={() => {
                      setModalOpen(false);
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "90%",
                        minWidth: "80%",
                        Hight: "10rem",
                        rounded: "2rem",
                        padding: "1rem",
                        bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h2>Are You Sure?</h2>
                      <div style={{ display: "flex", gap: "3rem" }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            deleteTask(task?.id);
                            setModalOpen(false);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => {
                            setModalOpen(false);
                          }}
                        >
                          No
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                  <ListItem
                    secondaryAction={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "2rem",
                          marginRight: "1rem",
                        }}
                      >
                        {task?.completed ? null : (
                          <IconButton
                            sx={{
                              bgcolor: "success.main",
                              color: "white",
                              "&:hover": { bgcolor: "success.dark" },
                            }}
                            onClick={() => {
                              completeTask(task?.id);
                            }}
                          >
                            <CheckIcon />
                          </IconButton>
                        )}
                        <IconButton
                          sx={{
                            bgcolor: "error.main",
                            color: "white",
                            "&:hover": { bgcolor: "error.dark" },
                          }}
                          onClick={() => {
                            setModalOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
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

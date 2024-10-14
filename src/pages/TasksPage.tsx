import { useEffect, useState } from "react";

//MUI
import {
  Alert,
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";

//RTK Query
import { useCreateTaskMutation } from "../lib/services/task-api";

//Types
import { Category } from "../lib/types/category";
import { Priority } from "../lib/types/priority";
import { CreateTaskFormData } from "../lib/types/task";
import { Task } from "../lib/types/task";

//UseFormHook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";
import TasksList from "../components/TasksList";
import { useLoaderData } from "react-router-dom";
import { User } from "../lib/types/User";

const TasksPage = () => {
  const { priorities, categories, user } = useLoaderData() as {
    priorities: Priority[];
    categories: Category[];
    user: User;
  };
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [modalOpen, setModalOPen] = useState(false);
  const [snackbarOPen, setSnackbarOPen] = useState(false);
  const [due_dateValue, setDueDateValue] = useState(dayjs());
  const schema = z.object({
    name: z.string().min(3),
    description: z.string().min(5),
    priority: z.string(),
    category: z.string(),
    due_date: z.string(),
  });
  const {
    formState: { errors },
    setValue,
    handleSubmit,
    register,
    setError,
    resetField,
  } = useForm<Task>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setValue("due_date", due_dateValue.toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [due_dateValue]);
// FIXME: Handle 500 error and task unique error
  const submitHandler = (data: CreateTaskFormData) => {
    data.user = user?.id!;
    createTask(data)
      .unwrap()
      .then(() => {
        setSnackbarOPen(true);
        setModalOPen(false);
        resetField("name");
        resetField("description");
      })
      .catch((err) => {
        if(err.status === 500) {
          alert("server Error")
        }
        Object.keys(err.data).forEach((field) => {
          // Set error for each field using setError By ChatGPT
          setError(field as keyof Task, {
            type: "manual",
            message: err.data[field][0],
          });
        });
      });
  };
  return (
    <>
      <TasksList priorities={priorities} categories={categories} />
      <Snackbar
        sx={{
          width: "80%",
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        open={snackbarOPen}
        autoHideDuration={10000}
        onClose={() => setSnackbarOPen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setSnackbarOPen(false)}
        >
          "Successfully Created"
        </Alert>
      </Snackbar>
      <Fab
        onClick={() => setModalOPen(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={modalOpen}
        onClose={() => setModalOPen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "25rem",
            bgcolor: "white",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField
              {...register("name")}
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
            <TextField
              {...register("description")}
              multiline
              minRows={4}
              fullWidth
              id="description"
              label="Description"
              variant="outlined"
              error={!!errors?.description}
              helperText={errors?.description?.message}
            />
            <FormControl fullWidth>
              <InputLabel id="Priority">Priority</InputLabel>
              <Select
                {...register("priority")}
                aria-modal
                labelId="Priority"
                id="priority"
                label="Priority"
                defaultValue={priorities?.[0]?.id}
              >
                {priorities?.map((priority: Priority) => {
                  return (
                    <MenuItem key={priority?.id} value={priority?.id}>
                      {priority?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="Categories">Category</InputLabel>
              <Select
                {...register("category")}
                labelId="Category"
                id="category"
                label="Category"
                defaultValue={categories?.[0]?.id}
              >
                {categories?.map((category: Category) => {
                  return (
                    <MenuItem key={category?.id} value={category?.id}>
                      {category?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <DateTimePicker
              defaultValue={dayjs()}
              label="DueDateTime"
              value={due_dateValue}
              onChange={(e) => {
                setDueDateValue(e!);
              }}
            />
            <LoadingButton
              component={"button"}
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TasksPage;

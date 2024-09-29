import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEditTaskMutation, useGetTaskQuery } from "../lib/services/task-api";
import { Controller, useForm } from "react-hook-form";
import { Category } from "../lib/types/category";
import { Priority } from "../lib/types/priority";
import { LoadingButton } from "@mui/lab";
import { useGetPrioritiesQuery } from "../lib/services/priority-api";
import { useGetCategoriesQuery } from "../lib/services/category-api";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Task } from "../lib/types/task";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const TaskComponent = ({ id }: { id: string }) => {
  const { data: task, error: getTaskError, isLoading } = useGetTaskQuery(id);

  const [snackbarOPen, setSnackbarOPen] = useState(false);

  const [editTask, { isLoading: editTaskIsLoading }] = useEditTaskMutation();

  useEffect(() => {
    reset(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const schema = z.object({
    id: z.string(),
    name: z.string().min(3),
    description: z.string().min(5),
    priority: z.string(),
    category: z.string(),
    progress_percentage: z.number(),
    due_date: z.string(),
  });
  const {
    data: priorities,
    isLoading: prioritiesIsLoading,
    error: prioritiesError,
  } = useGetPrioritiesQuery();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    control,
  } = useForm<Task>({ resolver: zodResolver(schema) });

  const submitHandler = (data: Task) => {
    editTask(data)
      .unwrap()
      .then(() => {
        setSnackbarOPen(true);
      })
      .catch((err) => {
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
      {getTaskError || prioritiesError || categoriesError ? (
        <Alert severity="error">Server Error</Alert>
      ) : (
        <>
          {isLoading ||
          prioritiesIsLoading ||
          categoriesIsLoading ||
          editTaskIsLoading ? (
            <CircularProgress
              sx={{ position: "fixed", left: "50%", top: "50%" }}
            />
          ) : (
            <>
              <form
                onSubmit={handleSubmit(submitHandler)}
                style={{
                  height: "100%",
                  width: "90%",
                  margin: "2rem auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
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
                    Successfully Edited
                  </Alert>
                </Snackbar>
                <input hidden {...register("id")} />
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
                    value={getValues("priority") || ""}
                    aria-modal
                    labelId="Priority"
                    id="priority"
                    label="Priority"
                    defaultValue={task?.priority}
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
                    value={getValues("category") || ""}
                    labelId="Category"
                    id="category"
                    label="Category"
                    defaultValue={task?.category}
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
                  defaultValue={dayjs(task?.due_date)}
                  label="DueDateTime"
                  value={dayjs(getValues("due_date"))}
                  onChange={(e: Dayjs | null) => {
                    if (!e) {
                      setValue("due_date", "");
                      return;
                    }
                    setValue("due_date", e.toISOString(), {
                      shouldDirty: true,
                    });
                  }}
                />
                <Controller
                  name="progress_percentage"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      aria-label="Temperature"
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      value={getValues("progress_percentage") ?? 0}
                      onChange={(_, newValue: number | number[]) => {
                        console.log(newValue);
                        if (Array.isArray(newValue)) {
                          return;
                        }
                        setValue("progress_percentage", newValue, {
                          shouldDirty: true,
                        });
                      }}
                    />
                  )}
                />
                <LoadingButton
                  type="submit"
                  component={"button"}
                  color="primary"
                  variant="contained"
                  disabled={!isDirty}
                  loading={isLoading}
                  onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </LoadingButton>
                <Button type="button" variant="contained" color="error">
                  Delete
                </Button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TaskComponent;

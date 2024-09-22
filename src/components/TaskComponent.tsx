import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGetTaskQuery } from "../lib/services/task-api";
import { useForm } from "react-hook-form";
import { Category } from "../lib/types/category";
import { Priority } from "../lib/types/priority";
import { LoadingButton } from "@mui/lab";
import { useGetPrioritiesQuery } from "../lib/services/priority-api";
import { useGetCategoriesQuery } from "../lib/services/category-api";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Task } from "../lib/types/task";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const TaskComponent = ({ slug }: { slug: string | undefined }) => {
  const { data: task, error, isLoading } = useGetTaskQuery(slug as string);

  useEffect(() => {
    reset(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const schema = z.object({
    name: z.string().min(3),
    description: z.string().min(5),
    priority: z.string(),
    category: z.string(),
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

  const submitHandler = () => {};
  const {
    formState: { errors, isDirty, dirtyFields },
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<Task>({ resolver: zodResolver(schema) });

  return (
    <>
      {error || prioritiesError || categoriesError ? (
        <Alert severity="error">Server Error</Alert>
      ) : (
        <>
          {isLoading || prioritiesIsLoading || categoriesIsLoading ? (
            <CircularProgress
              sx={{ position: "fixed", left: "50%", top: "50%" }}
            />
          ) : (
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{
                height: "100%",
                width: "80%",
                margin: "2rem auto",
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
                helperText={errors?.name?.message?.toString()}
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
                helperText={errors?.description?.message?.toString()}
              />
              <FormControl fullWidth>
                <InputLabel id="Priority">Priority</InputLabel>
                <Select
                  {...register("priority")}
                  aria-modal
                  labelId="Priority"
                  id="priority"
                  label="Priority"
                  defaultValue={task?.priority.toString()}
                >
                  {priorities?.map((priority: Priority) => {
                    return (
                      <MenuItem
                        key={priority?.id}
                        value={priority?.id.toString()}
                      >
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
                  defaultValue={task?.category.toString()}
                >
                  {categories?.map((category: Category) => {
                    return (
                      <MenuItem
                        key={category?.id}
                        value={category?.id.toString()}
                      >
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
                  setValue("due_date", e.toISOString());
                }}
              />
              <LoadingButton
                component={"button"}
                type="submit"
                color="primary"
                variant="contained"
                disabled={!isDirty}
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default TaskComponent;

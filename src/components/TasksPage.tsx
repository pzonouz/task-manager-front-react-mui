import { useEffect, useState } from "react";

//MUI
import {
  Alert,
  Box,
  CircularProgress,
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
import { useGetPrioritiesQuery } from "../lib/services/priority-api";
import { useGetCategoriesQuery } from "../lib/services/category-api";
import { useCreateTaskMutation } from "../lib/services/task-api";

//Types
import { Category } from "../lib/types/category";
import { Priority } from "../lib/types/priority";
import { CreateTaskFormData } from "../lib/types/task";

//UseFormHook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";

const TasksPage = () => {
  const { data: priorities, isLoading: prioritiesIsLoading } =
    useGetPrioritiesQuery();
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetCategoriesQuery();
  const [createTask, { isLoading, isError, error }] = useCreateTaskMutation();

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
  } = useForm<CreateTaskFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setValue("due_date", due_dateValue.toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [due_dateValue]);

  const submitHandler = (data: CreateTaskFormData) => {
    data.user = "1";
    createTask(data)
      .unwrap()
      .then(() => setSnackbarOPen(true))
      .catch((err) => alert(JSON.stringify(err.data)))
      .finally();
  };
  return (
    <>
      <Snackbar
        sx={{
          width: "80%",
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        open={snackbarOPen}
        // autoHideDuration={10000}
        onClose={() => setSnackbarOPen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setSnackbarOPen(false)}
        >
          Successfully Created
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
      {(prioritiesIsLoading || categoriesIsLoading) && (
        <CircularProgress sx={{ position: "fixed", left: "50%", top: "50%" }} />
      )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOPen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
                defaultValue={priorities?.[0]?.id}
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
                defaultValue={categories?.[0]?.id.toString()}
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

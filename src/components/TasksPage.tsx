import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetPrioritiesQuery } from "../lib/store/priority-api";

const TasksPage = () => {
  const {
    data: priorities,
    // isLoading,
    // isError,
    // error,
  } = useGetPrioritiesQuery();
  const [modalOpen, setModalOPen] = useState(false);
  return (
    <>
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
      <div>TasksPage</div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOPen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "80%",
            bgcolor: "white",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <form
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField fullWidth id="name" label="Name" variant="outlined" />
            <TextField
              multiline
              minRows={4}
              fullWidth
              id="description"
              label="Description"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="Priority">Priority</InputLabel>
              <Select labelId="Priority" id="priority" label="Priority">
                {priorities?.map((priority) => {
                  console.log(priority);
                  return (
                    <MenuItem value={priority?.id}>{priority?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TasksPage;

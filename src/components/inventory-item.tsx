import { Box, Typography, Stack, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

interface InventoryItemProps {
  item: string;
  quantity: number;
  removeItem: (item: string) => void;
  addItem: (item: string) => void;
  editOpen: () => void;
}

const InventoryItem = ({
  item,
  quantity,
  removeItem,
  addItem,
  editOpen,
}: InventoryItemProps) => {
  return (
    <Box
      width="80%"
      height="auto"
      display="flex"
      justifyContent="space-between"
      gap={2}
      sx={{
        border: "1px solid black",
        borderRadius: "10px",
        flexDirection: {
          xs: "row",
          sm: "row",
          md: "column",
          lg: "column",
          xl: "column",
        },
        paddingY: {
          xs: "5px",
          sm: "5px",
          md: "10px",
          lg: "10px",
          xl: "15px",
        },
        paddingX: {
          xs: "10px",
          sm: "10px",
          md: "10px",
          lg: "10px",
          xl: "15px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {item}
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
        }}
      >
        {quantity}
      </Typography>
      <Stack direction="row" spacing={2}>
        <AddIcon onClick={() => addItem(item)} />
        <RemoveIcon onClick={() => removeItem(item)} />
        <EditIcon onClick={() => editOpen()} />
      </Stack>
    </Box>
  );
};

export default InventoryItem;

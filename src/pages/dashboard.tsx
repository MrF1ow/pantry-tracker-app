import type { NextPage } from "next";
import { useState, useEffect, SetStateAction, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAppSelector } from "@/redux/store";

import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import NavBar from "@/components/nav-bar";
import InventoryItem from "@/components/inventory-item";
import { nanoid } from "nanoid";

const Dashboard: NextPage = () => {
  // List of inventory items
  const [inventory, setInventory] = useState<
    {
      id: string;
      name: string;
      quantity: number;
    }[]
  >([]);
  // List of inventory item names
  const [inventoryNames, setInventoryNames] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const [itemEdit, setItemEdit] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState<number | "">("");

  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState<number | "">("");

  const [filteredInventory, setFilteredInventory] = useState<
    { id: string; name: string; quantity: number }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Reference to modal
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
        handleItemEditClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentUserUID = useAppSelector((state) => state.auth.user.uid);
  if (!currentUserUID) return;

  const firestore = getFirestore();

  const updateInventory = async () => {
    const inventoryCollection = collection(firestore, "inventory");
    const inventoryQuery = query(
      inventoryCollection,
      where("userUID", "==", currentUserUID)
    );
    const snapshot = await getDocs(inventoryQuery);

    const inventoryList: { id: string; name: string; quantity: number }[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      inventoryList.push({
        id: doc.id,
        name: data.name,
        quantity: data.quantity || 0,
      });
    });
    setInventory(inventoryList);
    setInventoryNames(inventoryList.map((item) => item.name));
  };

  useEffect(() => {
    updateInventory();
  }, []);

  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, inventory]);

  const addItem = async (itemName: string) => {
    if (!itemName) return;

    const inventoryCollection = collection(firestore, "inventory");
    const inventoryQuery = query(
      inventoryCollection,
      where("name", "==", itemName),
      where("userUID", "==", currentUserUID)
    );
    const snapshot = await getDocs(inventoryQuery);

    if (!snapshot.empty) {
      const docRef = doc(inventoryCollection, snapshot.docs[0].id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      let newQuantity;
      if (itemQuantity !== "" && itemQuantity !== 0) {
        newQuantity = (data.quantity || 0) + 1;
      } else {
        newQuantity = data.quantity || 0;
      }
      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      const newId = nanoid();
      await setDoc(doc(inventoryCollection, newId), {
        name: itemName,
        quantity: itemQuantity || 1,
        userUID: currentUserUID,
      });
    }
    await updateInventory();
  };

  const removeItem = async (itemName: string) => {
    if (!itemName) return;

    const inventoryCollection = collection(firestore, "inventory");
    const inventoryQuery = query(
      inventoryCollection,
      where("name", "==", itemName),
      where("userUID", "==", currentUserUID)
    );
    const snapshot = await getDocs(inventoryQuery);

    if (!snapshot.empty) {
      const docRef = doc(inventoryCollection, snapshot.docs[0].id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      const newQuantity = (data.quantity || 0) - 1;
      if (newQuantity <= 0) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, { quantity: newQuantity });
      }
    }

    await updateInventory();
  };

  const updateItem = async () => {
    if (!editItemId) return;

    const inventoryCollection = collection(firestore, "inventory");
    const docRef = doc(inventoryCollection, editItemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newQuantity =
        editItemQuantity === "" || editItemQuantity <= 0 ? 0 : editItemQuantity;
      if (newQuantity === 0) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, {
          name: editItemName,
          quantity: newQuantity,
        });
      }
    } else {
      console.log("Document does not exist.");
    }
    setItemName(editItemName);
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleItemEditOpen = (id: string, name: string, quantity: number) => {
    setEditItemId(id);
    setEditItemName(name);
    setEditItemQuantity(quantity);
    setItemEdit(true);
  };
  const handleItemEditClose = () => setItemEdit(false);

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "auto",
    backgroundColor: 'text.primary',
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        boxShadow={3}
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          width: {
            xs: "100%",
            sm: "100%",
            md: "90%",
            lg: "80%",
            xl: "75%",
          },
          height: {
            xs: "100%",
            sm: "100%",
            md: "90%",
            lg: "80%",
            xl: "75%",
          },
          padding: {
            xs: "10px",
            sm: "20px",
            md: "30px",
            lg: "40px",
            xl: "50px",
          },
          color: "text.secondary",
        }}
      >
        <NavBar
          inventoryItems={inventoryNames}
          onSearch={(query) => setSearchQuery(query)}
        />
        <Typography variant="h4" fontWeight="bold" paddingY="10px">
          Your Pantry
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />
        <Box width="100%">
          <Grid container spacing={2}>
            {filteredInventory.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
                <InventoryItem
                  item={item.name}
                  quantity={item.quantity}
                  removeItem={() => removeItem(item.name)}
                  addItem={() => addItem(item.name)}
                  editOpen={() =>
                    handleItemEditOpen(item.id, item.name, item.quantity)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Modal
          component={Box}
          open={open}
          onClose={handleClose}
          sx={modalStyle}
        >
          <Box
            ref={modalRef}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography variant="h4">Add Item</Typography>
            <Stack width="100%" direction={"column"} spacing={2}>
              <Typography variant="h6">Item Name</Typography>
              <TextField
                variant="outlined"
                value={itemName}
                fullWidth
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setItemName(e.target.value)
                }
              />
              <Typography variant="h6">Item Quantity</Typography>
              <TextField
                variant="outlined"
                type="number"
                value={itemQuantity}
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setItemQuantity(Number(e.target.value))
                }
              />
              <Button
                variant="contained"
                sx={{
                  width: "20%",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => {
                  addItem(itemName);
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Modal
          component={Box}
          open={itemEdit}
          onClose={handleItemEditClose}
          sx={modalStyle}
        >
          <Box
            ref={modalRef}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography variant="h4">Edit Item</Typography>
            <Stack width="100%" direction={"column"} spacing={2}>
              <Typography variant="h6">Item Name</Typography>
              <TextField
                variant="outlined"
                value={editItemName}
                fullWidth
                onChange={(e) => setEditItemName(e.target.value)}
              />
              <Typography variant="h6">Item Quantity</Typography>
              <TextField
                variant="outlined"
                type="number"
                value={editItemQuantity}
                fullWidth
                onChange={(e) =>
                  setEditItemQuantity(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => {
                  if (editItemId && editItemQuantity !== "" && editItemName) {
                    updateItem();
                  }
                  handleItemEditClose();
                }}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            width: "20%",
            marginTop: "auto",
          }}
        >
          Add Item
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;

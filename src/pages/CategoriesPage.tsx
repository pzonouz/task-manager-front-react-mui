import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useGetCategoriesQuery } from "../lib/services/category-api";
import { Category } from "../lib/types/category";

const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {categories?.map((category: Category) => (
        <ListItem
          key={category?.id}
          secondaryAction={<div>fff</div>}
          disablePadding
        >
          <ListItemButton sx={{ paddingY: "1rem" }}>
            <ListItemText primary={category?.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoriesPage;

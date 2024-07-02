import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategory,
  deleteCategory,
  getAllCategories,
} from "@/store/features/Categories/CategoriesSlice";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [inputValues, setInputValues] = useState({});
  const categoriesState = useSelector((state) => state.categories);
  const categories = categoriesState.categories.Categories; // Corrected access
  const status = categoriesState.status;
  const error = categoriesState.error;
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
    dispatch(AddCategory(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setInputValues({});
          dispatch(getAllCategories());
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  const handleDelete = (slug) => {
    dispatch(deleteCategory(slug))
    .unwrap()
    .then((response) => {
      if (response?.success == true) {
        toast.success(response?.message, { autoClose: 2000 });
        setInputValues({});
        dispatch(getAllCategories());
      } else {
        toast.error(response?.message, { autoClose: 2000 });
      }
    })
    .catch((error) => {
      toast.error(error, { autoClose: 2000 });
    });
  }
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Categories....</p>
      </div>
    );
  }

  if (error == "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Categories....</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add Categories </CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  id="name"
                  type="text"
                  placeholder="Category Name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
                <Button>Add Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell  className="capitalize">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {moment(category.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                          <button onClick={()=>{
                              navigate(`/admin/categories/update/${category.slug}`)
                            }}>
                              Edit
                            </button>
                            </DropdownMenuItem>
                          <DropdownMenuItem>
                           
                            <button onClick={()=>{handleDelete (category.slug)}}>Delete</button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No categories found</TableCell>
                </TableRow>
              )
            
            }
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Categories;

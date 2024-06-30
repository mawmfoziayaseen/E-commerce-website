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
import { useDispatch } from "react-redux";
import { AddCategory, getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function Categories() {
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

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
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  // if (status == "loading") {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <p>Loading Categories....</p>
  //     </div>
  //   );
  // }

  // if (error == "error") {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <p>Error while fetching Categories....</p>
  //     </div>
  //   );
  // }

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
                  placeholder="categories Name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
                <Button>Add Categories</Button>
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
            <TableRow>
              <TableCell >Category Number</TableCell>
              <TableCell >Category Name</TableCell>
              <TableCell >Category Slug</TableCell>
              <TableCell >Category Date</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

 
           
           
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Categories;

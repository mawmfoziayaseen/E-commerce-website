import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import moment from "moment";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/store/features/products/productSlice";
import { Image, MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Products() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  // this is use Effect
  useEffect(() => {
    dispatch(getAllProducts()); // get all product function
  }, [dispatch]);
  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Products....</p>
      </div>
    );
  }

  if (error == "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Products....</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Product</h2>
        <Link to="/admin/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.products &&
              products.products.map((product, index) => {
                return (
                  <>
                    <TableRow key={product._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                       <img src={product.picture.secure_url} height="50px" width="50px" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.title}
                      </TableCell>
                      <TableCell className="font-medium">{product.description}</TableCell>
                      <TableCell className="font-medium">{product.price}</TableCell>
                      <TableCell className="font-medium">{product.category.name}</TableCell>
                      <TableCell className="font-medium">{product.user.name}</TableCell>
                      <TableCell className="font-medium">{moment(product.createdAt).format("DD-MM-YYYY")}</TableCell>
                  
                      
                   
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Products;

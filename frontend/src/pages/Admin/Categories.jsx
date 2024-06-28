import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddCategory } from "@/store/features/Categories/CategoriesSlice";
import { toast } from "react-toastify";



function Categories() {
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues(values => ({ ...values, [name]: value }));
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
        })


  };
  return (
    <>
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
              <Input id="name"
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
    </>
  )
}

export default Categories;
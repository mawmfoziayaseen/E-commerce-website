import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

function UpdateCategory() {
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(getAllCategories());
    // console
    //   .log(inputValues)
    //   .unwrap()
    //   .then((response) => {
    //     if (response?.success == true) {
    //       toast.success(response?.message, { autoClose: 2000 });
    //       setInputValues({});

    //     } else {
    //       toast.error(response?.message, { autoClose: 2000 });
    //     }
    //   });
  };
  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Update Category </CardTitle>
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
                <Button>Update Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default UpdateCategory;

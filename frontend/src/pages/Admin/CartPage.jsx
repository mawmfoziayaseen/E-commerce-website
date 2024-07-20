import {
  removeFromCart,
  updateQuantity,
} from "@/store/features/cart/cartSlice";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatNumber from "format-number";
import { toast } from "react-toastify";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleChangeQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };
  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Item Removed from cart successfully", { autoClose: 1500 });
  };

  // total amount function
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link to="/shop" className="text-blue-500 hover:text-blue-600">
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto py-5">
        <h1 className="text-4xl text-center font-semibold py-5">Your Cart</h1>
        <div className="flex flex-col space-y-4">
          {/* Single product Box */}
          {cartItems.map((item) => {
            return (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
              >
                <img
                className="w-32 h-32 object-contain rounded"
                 src={item.pictureUrl} alt={item.title} />
                <div className="flex-1 px-4">
                  <h2 className="text-x1 font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    Price :{" "}
                    <span className="font-semibold">
                      {formatNumber()(item.price)}
                    </span>
                    {""}
                    <span
                      className="text-gray-400"
                      style={{ fontSize: "14px" }}
                    >
                      PKR
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Total :{" "}
                    <span className="font-semibold">
                      {formatNumber()(item.price * item.quantity)}
                    </span>
                    {""}
                    <span
                      className="text-gray-400"
                      style={{ fontSize: "14px" }}
                    >
                      PKR
                    </span>
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => {
                        handleChangeQuantity(item.productId, item.quantity - 1);
                      }}
                      className=" text-gray-600 px-2 py-1 rounded
                        hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      className="w-12 text-center mx-2"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        handleChangeQuantity(
                          item.productId,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                    <button
                      onClick={() => {
                        handleChangeQuantity(item.productId, item.quantity + 1);
                      }}
                      className="  px-2 py-1 rounded
                        hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-400"
                  onClick={() => {
                    handleRemoveCart(item.productId);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-2x1 font-semibold">
            Total: {" "}
              <span className="font-semibold">
                {formatNumber()(totalAmount.toFixed(2))}
              </span>
              {""}
              <span className="text-gray-400" style={{ fontSize: "14px" }}>
                PKR
              </span>
            
            </h2>
            <Link
              className="bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-500"
              to="/checkout"
            >
              Porceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;



function ProductDetails() {
  return (
    <div className="container py-5">
      <h1 className="text-center text-5xl py-7 font-semibold">
        Product Details
      </h1>
      <div className="flex py-5">
        <div className="w-1/2 left-portion"> image
        {/* <img src={pictuce.secure_url} alt={picture.title} /> */}
        </div>
        <div className="w-1/2">
        <h2 className="text-3xl mb-3 *:font-semibold">Product title</h2>
          <p className="capitalize mb-3">
            Price:
            <span className="font-semibold">Price</span>
            {""}
            <span className="text-gray-400" style={{ fontSize: "14px" }}>
              PKR/Item
            </span>
          </p>
          <p className="capitalize mb-3">Category
            <span className="font-semibold">category</span>
          </p>
          <p className="capitalize mb-3">description</p>
          <div>
            <button className="px-2 py-1 bg-gray-300 rounded">-</button>
            <input type="number" className="w-10 border"/>
            <button className="px-2 py-1 bg-gray-300 rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

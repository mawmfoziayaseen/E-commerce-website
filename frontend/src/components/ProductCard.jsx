import { Link } from "react-router-dom";
import { Card, CardContent} from "./ui/card";
import formatNumber from 'format-number';

function ProductCard({product}) {
  return (
    <Link>
      <Card className="rounded-lg shadow w-full">
        <CardContent className="grid gap-3">
          <img
            src={product.picture.secure_url}
            alt={product.title}
            className="px-8 py-4 rounded-t-lg h-64 bg-gray-100 mx-auto object-contain"
          />
          <div className="p-3">
            <h5 className="text-2xl mb-4 font-samibold tracking-tight text-gray-900">
              {product.title}
            </h5>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold text-gray-900" > 
                {formatNumber() (product.price)}
                <span style={{fontSize:"16px"}}>PKR</span>
                </span>
                <button className="bg-orange-400 px-4 py-2 rounded-md">Add to Cart</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;

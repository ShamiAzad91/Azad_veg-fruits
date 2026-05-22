import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast";

const ProductCard = ({ product, showHomeButton = false }) => {
//context
const [cart,setCart] = useCart();

  const isOut = product?.stock === 0 || !product?.isAvailable;

  const navigate = useNavigate();

  //cart

const handleAddToCart = () => {
  const exist = cart.find(item => item._id === product._id);

  if (exist) {
    toast.error("Item already in cart");
    return;
  }

  setCart([...cart, product]);
  localStorage.setItem("cart",JSON.stringify([...cart, product]))
  toast.success("Item added to cart");
};
  return (
    <Badge.Ribbon text={`${product?.sold || 0} sold`} color="red">
      <Badge.Ribbon
        text={
          isOut ? "Out of stock" : `${product?.stock} in stock`
        }
        placement="start"
        color={isOut ? "gray" : "green"}
      >
        <div className="product-card shadow-sm">
          {/* Image */}
          <div className="img-wrapper">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Content */}
          <div className="card-body">
            <h6 className="title">{product.name}</h6>

            <p className="quantity">
              {product.quantity}/{product.unit}
            </p>

            {/* <p className="price">₹{product.price}</p> */}
            <p className="price">₹{product.price.toLocaleString("en-IN")}</p>

            {showHomeButton ? (
              <button className="btn btn-success w-100" disabled={isOut}>
                {isOut ? "Unavailable" : "Order Now"}
              </button>
            ) : (
              <>
                <button className="btn view-btn w-100 mb-2" onClick={()=>navigate(`/product/${product.slug}`)}>
                  👁 View Product
                </button>
                <button
  className="btn btn-success w-100"
  disabled={isOut}
  onClick={handleAddToCart}
>
  {isOut ? "Out of Stock" : "Add To Cart"}
</button>
              </>
            )}
          </div>
        </div>
      </Badge.Ribbon>
    </Badge.Ribbon>
  );
};

export default ProductCard;

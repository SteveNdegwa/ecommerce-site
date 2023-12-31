import { useDispatch, useSelector } from "react-redux"
import { CartProduct, decreaseProductItems, increaseProductItems, removeFromCart } from "../store"

export function Cart(){
    const dispatch = useDispatch();

    const productsList =  useSelector((state:any)=> state.cart);
    

    return(
        <div className="cart">
            {productsList.map((product: CartProduct)=>{
                return (
                    <div className="product">
                        <h1>Id: {product.productId}</h1>
                        <h1>Name: {product.productName}</h1>
                        <h1>Number: {product.noOfProducts}</h1>
                        <h1>Total price: {product.noOfProducts * product.productPrice}</h1>
                        <button onClick={()=> dispatch(increaseProductItems(product.productId))}>+</button>
                        <button onClick={()=> dispatch(decreaseProductItems(product.productId))}>-</button>
                        <button onClick={()=> dispatch(removeFromCart(product.productId))}>X</button>
                    </div>
                )
            })}
        </div>
    )
}
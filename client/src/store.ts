import {configureStore, createSlice} from "@reduxjs/toolkit"


export interface CartProduct{
    productId: number;
    productName: string;
    noOfProducts: number;
    productPrice: number;
    productStock: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState:[],
    reducers:{
        addToCart:(state: any, action)=>{
            let productPresent = false;
            state.map((product: CartProduct)=>{
                if(product.productId == action.payload.productId) productPresent = true;
            })
            productPresent ? alert("The product is already added to the cart") : state.push(action.payload);
        },
        removeFromCart:(state, action)=>{
            state.filter((product:CartProduct) => product.productId !== action.payload)
            console.log(state); 
        },
        clearCart:(state)=>{
            state = []
        },
        increaseProductItems:(state, action)=>{
            state.map((product:CartProduct)=>{
                if(product.productId == action.payload){
                    let newNoOfProducts = product.noOfProducts + 1;
                    if(newNoOfProducts <= product.productStock) return product.noOfProducts = newNoOfProducts;
                }
                return product;
            })
        },
        decreaseProductItems:(state, action)=>{
            state.map((product:CartProduct)=>{
                if(product.productId == action.payload){
                    let newNoOfProducts = product.noOfProducts - 1;
                    if(newNoOfProducts > 0 ) return product.noOfProducts = newNoOfProducts;
                }
                return product;
            })
        }

    }
})

export const { addToCart, removeFromCart, clearCart, increaseProductItems, decreaseProductItems } = cartSlice.actions;

export const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
    },
})
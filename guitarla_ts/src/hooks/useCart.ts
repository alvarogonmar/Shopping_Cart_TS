import { useState, useEffect } from "react"
import type { Guitar, CartItem } from "../types"

export const useCart = () => {
    
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 10

    useEffect (() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function removeFromCart(id: Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // Filtrar y "traer" las guitarras diferente a la del id que estoy quitando
    }

    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id : Guitar['id']){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > 1 && item.quantity <= MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart () {
        setCart([])
    }

    return {
        cart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart
    }
}
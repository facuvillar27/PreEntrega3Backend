import {Router} from 'express';
import { passportCall } from '../utils.js';
import { getUsers, createUser, addProductToCart, emptyCart } from "../controller/users.controller.js"

const router = Router();


// get all users
router.get('/', getUsers);

// agregar un producto al carrito del usuario
router.put('/product/:pid', passportCall("jwt"), addProductToCart)

// vaciar carrito de un usuario
router.put('/empty-cart', passportCall("jwt"), emptyCart)

export default router;
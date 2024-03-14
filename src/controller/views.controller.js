import DAO from "../dao/index.js";

const userServices = new DAO.User();
const productServices = new DAO.Product();

const getUsersAndRender = async (req, res) => {
    let users = await userServices.getUsers();
    console.log(users)
    res.render('users', { users });
}

const getProductsAndRender = async (req, res) => {
    let products = await productServices.getAllProducts();
    res.render('products', { products });
}

const getProfile = async (req,res) => {
    let user = await userServices.getBy({ "email": req.user.email });
    let product = await productServices.getAllProducts();
    let cartProducts = user.cart.products;
    res.render("perfil", {
        user,
        product,
        cartProducts,
    })
}

const getCart = async (req,res) => {
    let user = await userServices.getBy({ "email": req.user.email });
    let cartProducts = user.cart.products;
    let total = 0;
    cartProducts.forEach(product => {
        total += product.product.price * product.quantity;
    });
    res.render("cart", {
        cartProducts,
        total
    })
}


export { getUsersAndRender, getProductsAndRender, getProfile, getCart};
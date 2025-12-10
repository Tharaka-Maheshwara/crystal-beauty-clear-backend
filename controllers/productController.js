import Product  from "../models/product.js";

export async function createProduct(req, res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })

        return;
    }

if(req.user.role != "admin"){
    res.status(403).json({
    message : "You are not authorized to create product"
    })

    return;
}


const product = new Product(req.body);

try {
    await product.save()
    res.json({
        message : "Product created successfully"
    })
} catch (err) {
    res.status(500).json({
        message : "Product creation failed",
        
    })
}



}

export function getProducts(req, res){
    Product.find().then((products)=>{
        res.json(products)
    }
).catch((err)=>{
    res.status(500).json({
        message: "Products not found"
    })
})
}


export function deleteProduct(req, res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
    })
    return;
}

if(req.user.role != "admin"){
    res.status(403).json({
        message : "You are not authorized to delete product"
    })
    return;
}
Product.findOneAndDelete({
    productId : req.params.productId
}).then(()=>{
    res.json({
        message : "Product deleted successfully"
    })
}).catch((err)=>{
    res.status(500).json({
        message : "Product Not Deleted"
    })          
})
}




export function updateProduct(req, res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
    })
    return;
}

if(req.user.role != "admin"){
    res.status(403).json({
        message : "You are not authorized to update product"
    })
    return;
}

Product.findOneAndUpdate({
    productId : req.params.productId
},req.body).then(()=>{
    res.json({
        message : "Product update successfully"
    })
}).catch((err)=>{
    res.status(500).json({
        message : "Product Not Updatted"
    })          
})
}
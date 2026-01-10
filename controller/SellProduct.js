export const sellProduct = async (req,res)=>{
    const {user_id} = req.params
    const {productImage,productTitle,productDescription,productCategory,productPrice} = req.body
    productCategory.create({
        productImage,productTitle,productDescription,productCategory,productPrice,user_id
    })
}

res.send()
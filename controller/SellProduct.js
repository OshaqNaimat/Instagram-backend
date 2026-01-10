export const sellProduct = async (req,res)=>{
    const {user_id} = req.params
    const {productImage,productTitle,productDescription,productCategory,productPrice} = req.body
}
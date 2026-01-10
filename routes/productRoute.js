import express from "express"
import { Productsell } from "../controller/SellProduct.js";
export const sellProduct = express.Router();

sellProduct.post("/sellproduct/:user_id",Productsell)
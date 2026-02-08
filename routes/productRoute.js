import express from "express";
import { getProducts } from "../controller/SellProduct.js";
export const sellProduct = express.Router();

sellProduct.post("/sellproduct/:user_id", sellProduct);

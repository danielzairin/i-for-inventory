import { createRequestHandler } from "@/api";
import { db } from "@/core/db";
import { Products } from "@/core/models/products";

const products = new Products(db);

const handler = createRequestHandler("/api", products);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;

import { createRequestHandler } from "@/api";
import { db } from "@/core/db";
import { Products } from "@/core/models/products";
import { Users } from "@/core/models/users";

const products = new Products(db);
const users = new Users(db);

const handler = createRequestHandler("/api", products, users);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;

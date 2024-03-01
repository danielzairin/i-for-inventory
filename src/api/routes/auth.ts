import { Hono } from "hono";
import { Variables } from "..";
import { validator } from "hono/validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

if (!process.env.JWT_SECRET) {
  throw Error("missing environment variable: JWT_SECRET");
}

export const auth = new Hono<{ Variables: Variables }>().post(
  "/login",
  validator("json", (value, c) => {
    const parsed = z
      .object({
        username: z.string(),
        password: z.string(),
      })
      .safeParse(value);

    if (!parsed.success) {
      throw new HTTPException(400, { message: parsed.error.message });
    }

    return parsed.data;
  }),
  async (c) => {
    const { m } = c.var;
    const data = c.req.valid("json");

    const authenticated = await m.users.authenticate(
      data.username,
      data.password
    );

    if (!authenticated) {
      throw new HTTPException(401, { message: "Invalid credentials." });
    }

    const permissions = await m.users.getPermissions(data.username);
    const jwt = await sign(
      { username: data.username, permissions },
      process.env.JWT_SECRET!,
      "HS256"
    );

    setCookie(c, "jwt", jwt, { secure: true });

    return c.json({ jwt });
  }
);

import * as argon2 from "argon2";
import { DB } from "../db";

export class Users {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    const privateData = await this.db.query.privateData.findFirst({
      where: (u, { eq }) => eq(u.username, username),
    });

    if (!privateData) {
      return false;
    }

    return argon2.verify(privateData.hashedPassword, password);
  }

  async getPermissions(username: string): Promise<number> {
    const privateData = await this.db.query.privateData.findFirst({
      where: (u, { eq }) => eq(u.username, username),
    });

    if (!privateData) {
      throw Error("User does not exist");
    }

    return privateData.permissions;
  }
}

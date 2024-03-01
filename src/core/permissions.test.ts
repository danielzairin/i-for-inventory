import { test, expect } from "vitest";
import { PERMISSION, hasPermission } from "./permissions";

test("Product permissions", () => {
  const permissions = PERMISSION.CREATE_PRODUCT + PERMISSION.READ_PRODUCT;
  expect(hasPermission(permissions, PERMISSION.CREATE_PRODUCT)).toBe(true);
  expect(hasPermission(permissions, PERMISSION.READ_PRODUCT)).toBe(true);
  expect(hasPermission(permissions, PERMISSION.UPDATE_PRODUCT)).toBe(false);
  expect(hasPermission(permissions, PERMISSION.DELETE_PRODUCT)).toBe(false);
});

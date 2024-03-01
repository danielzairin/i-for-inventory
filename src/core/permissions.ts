// Permission codes
export const PERMISSION = {
  CREATE_PRODUCT: 0b1000,
  READ_PRODUCT: 0b0100,
  UPDATE_PRODUCT: 0b0010,
  DELETE_PRODUCT: 0b0001,
} as const;

export function hasPermission(curr: number, want: number): boolean {
  return (curr & want) === want;
}

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export type DeepNull<T> = {
  [P in keyof T]: T[P] | null;
};

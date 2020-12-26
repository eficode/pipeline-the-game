type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T>;

/**
 * Type to extract the union of all the nested paths (in "."-notation).
 *
 * Example:
 *
 * The object:
 * {
 *    "a":  {
 *            "a1": "valuea1"
 *          },
 *    "b":  {
 *            "b1": "valueb1"
 *          }
 * }
 *
 * results in the possible paths:
 * a.a1 | b.b1
 */
export type Path<T> = PathImpl2<T> extends string | keyof T
  ? PathImpl2<T>
  : keyof T;

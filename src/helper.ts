export function zipWith<T, R>(a1: T[], a2: T[], f: (v1: T, v2: T) => R): R[] {
  const length = Math.min(a1.length, a2.length)
  const result: R[] = []

  for (let i = 0; i < length; i++) result[i] = f(a1[i], a2[i])

  return result
}

export function add(a: number, b: number) {
  return a + b
}

export function multiply(a: number, b: number) {
  return a * b
}

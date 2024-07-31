const apiRoutes = {
  // TODO: We must write shared api urls here
} as const

function findRoute(obj: object, path: string): string | never {
  return path.split('.').reduce((a: any, b) => {
    if (!a[b]) {
      throw new Error('Can not find the route')
    }

    return a[b]
  }, obj)
}

// Prefix can help us to have different path on apis
export const Prefix = { base: 'api' }

/* RecursiveKeyOf creates a union of property names and all possibilities of nested property names by separating
them with object dot notation.*/
export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]:
  TObj[TKey] extends any[]
    ?
    `${TKey}`
    :
    TObj[TKey] extends object
      ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
      : `${TKey}`;
}[keyof TObj & (string | number)];

export const getApiRoute = (slug: RecursiveKeyOf<typeof apiRoutes>, UrlPrefix = Prefix.bff, ...args: (string | number)[]) => {
  let route: string = findRoute(apiRoutes, slug)

  route = `${UrlPrefix}${route}`
  for (let i = 0; i < args.length; i++) {
    route = route.replace(`{${i}}`, String(args[i]))
  }

  return route
}

export default apiRoutes

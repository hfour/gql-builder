// type Field<Name, Type> = {
//   _type: 'field';
//   readonly name: string;
//   type: Type;
// };

// type Row<Name, Type> = {
//   _type: 'type';
//   readonly name: string;
//   type: Type;
// };

// type ExtractType<K> = K extends Row<any, infer T>
//   ? T extends (infer A)[]
//     ? ExtractType<A>[]
//     : {
//         [key in keyof T]: ExtractType<T[key]>;
//       }
//   : K extends Field<any, infer Type>
//   ? Type
//   : {
//       [key in keyof K]: ExtractType<K[key]>;
//     };

// type Callbackify<V, O extends ArrayKeyOf<V>> = (p: Callback<V, O>) => any;

// type ExtractRecursiveName<K> = {
//   [key in keyof K]: K[key] extends Row<any, infer A>
//     ? A extends (infer O)[]
//       ? Callbackify<O, ArrayKeyOf<O>>
//       : Callbackify<A, ArrayKeyOf<A>>
//     : K[key] extends Field<infer Name, any>
//     ? Name
//     : never;
// };

// type ExtractName<K> = K extends Row<any, infer T> ? ExtractRecursiveName<T> : ExtractRecursiveName<K>;

// type Filter<T, K> = Pick<T, { [key in keyof T]: T[key] extends K ? key : never }[keyof T]>;
// type Callback<I, O extends ArrayKeyOf<I>> = (u: ExtractName<I>) => O;

// type toSumType<A extends any[]> = A[number];
// type ArrayKeyOf<T> = (keyof T)[];

// type CallbackReturnType<T, K extends ArrayKeyOf<T>> = ExtractType<Pick<T, toSumType<K>>>;

// const mkCallback = function<T>(type: ExtractName<T>) {
//   return function<K extends ArrayKeyOf<T>>(u: Callback<T, K>) {
//     const result = u(type);

//     const tResult = (result as unknown) as CallbackReturnType<T, K>;

//     return tResult;
//   };
// };

// // the following needs to generated

// type Product = {
//   id2: Field<'id2', number>;
//   name2: Field<'name2', string>;
// };

// type User = {
//   id: Field<'id', number>;
//   name: Field<'name', string>;
//   products: Row<'products', Product[]>;
// };

// const product = { id2: 'id2', name2: 'name2' } as const;

// const products = mkCallback<Product>(product);

// const user = {
//   id: 'id',
//   name: 'name',
//   products: products,
// } as const;

// const f = user.products(p => [p.id2]);

// type Query = {
//   products: <K extends ArrayKeyOf<Product>>(p: any, c: Callback<Product, K>) => CallbackReturnType<Product, K>;
//   users: <K extends ArrayKeyOf<User>>(p: any, c: Callback<User, K>) => CallbackReturnType<User, K>;
// };

// let query: Query = {
//   products: (p, callback) => {
//     return mkCallback<Product>(product)(callback);
//   },
//   users: (params, callback) => {
//     return mkCallback<User>(user)(callback);
//   },
// };

// // usage
// // the next example works
// const result1 = query.users({}, u => {
//   return [u.name];
// });

// // the next example doesn't work
// const result2 = query.users({}, u => {
//   return [u.name, u.products(p => [p.id2])];
// });

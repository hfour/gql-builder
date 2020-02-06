// type Field<Name extends string, Type> = {
//   name: Name;
//   type: Type;
// };

// type TupleUnion<C extends any[]> = C[number];

// type FieldNames<C extends Field<any, any>[]> = TupleUnion<
//   { [K in keyof C]: C[K] extends Field<infer Name, any> ? Name : never }
// >;

// type ExtractType<Name extends string, K> = K extends Field<Name, infer V> ? V : never;

// type FindFieldWithName<Name extends string, C extends Field<any, any>[]> = TupleUnion<
//   { [K in keyof C]: ExtractType<Name, C[K]> }
// >;

// type RowOf<Fields extends Field<any, any>[]> = { [K in FieldNames<Fields>]: FindFieldWithName<K, Fields> };

// type Product = {
//   id2: Field<'id2', number>;
//   name2: Field<'name2', string>;
// };

// type User = {
//   id: Field<'id', number>;
//   name: Field<'name', string>;
//   products: Field<'products', Product[]>;
// };

// type b = Pick<{ a: 'a' }, 'a'>;
// declare let u: User;
// declare let p: Product;

// declare function toFields<Fs extends any[]>(fields: Fs): RowOf<Fs>;

// const mkCallback = function<T>(type: T) {
//   return <K extends any[]>(u: (t: T) => K) => {
//     const result = u(type);

//     return toFields(result);
//   };
// };

// const users = mkCallback(u);
// const products = mkCallback(p);
// const a = users(u => {
//   return [u.id, u.name, u.products];
// });

// // a.

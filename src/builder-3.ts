export type Field<Name extends string | symbol | number, Type> = {
  name: Name;
  type: Type;
};

type Method<Name extends string | symbol | number, ArgsType, ReturnType> = {
  name: Name;
  args: ArgsType;
  returns: ReturnType;
};

type GQObject<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return ? Method<K, Args, Return> : Field<K, T[K]>;
};

type TupleUnion<C extends any[]> = C[number];

type FieldNames<C extends Field<any, any>[]> = TupleUnion<
  { [K in keyof C]: C[K] extends Field<infer Name, any> ? Name : never }
>;

type ExtractType<Name extends string, K> = K extends Field<Name, infer V> ? V : never;

type FindFieldWithName<Name extends string, C extends Field<any, any>[]> = TupleUnion<
  { [K in keyof C]: ExtractType<Name, C[K]> }
>;

type RowOf<Fields extends Field<any, any>[]> = { [K in FieldNames<Fields>]: FindFieldWithName<K, Fields> };

type Product = GQObject<{
  id2: number;
  name2: string;
}>;

type ToArray<T, K extends keyof T = keyof T> = [T[K]][];

type A = ToArray<Product>;

type User = GQObject<{
  id: Field<'id', number>;
  name: Field<'name', string>;
  products: () => Product[];
}>;

declare let u: User;
declare let p: Product;

declare function toFields<Fs extends any[]>(fields: Fs): RowOf<Fs>;

type Callback<T extends any[]> = (c: (u: T) => RowOf<T>) => any;

type Callbackable<T> = { [K in keyof T]: T[K] extends Method<any, infer Args, infer Returns> ? Callback<Args> : T[K] };

declare function toCallbackable<T>(fields: T): Callbackable<T>;

const mkCallback = function<T>(type: T) {
  return <K extends any[]>(u: (t: Callbackable<T>) => K) => {
    const result = u(toCallbackable(type));

    return toFields(result);
  };
};

const users = mkCallback(u);
const products = mkCallback(p);
const a = users(u => {
  return [u.id, u.name];
});

a.id;

// a.

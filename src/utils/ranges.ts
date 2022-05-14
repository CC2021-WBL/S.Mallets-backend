type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Ranges<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type HeadDiameterTypes = Ranges<30, 50>;
export type StickLengthTypes =
  | 35
  | 35.5
  | 36
  | 36.5
  | 37
  | 37.5
  | 38
  | 38.5
  | 39;
export type WeightTypes = Ranges<29, 38>;

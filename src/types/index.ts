export interface RekeningOption {
  value: string;
  label: string;
}

export interface RekeningData {
  banks: RekeningOption[];
  ewallets: RekeningOption[];
}

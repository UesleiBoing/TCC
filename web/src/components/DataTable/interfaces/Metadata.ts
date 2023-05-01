export default interface Metadata {
	prop: string;
  label: string;
  numeric?: boolean;
  primaryKey?: boolean;
  mask?: (value: any) => string;
}

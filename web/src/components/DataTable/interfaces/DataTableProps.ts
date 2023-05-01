import Metadata from "./Metadata";

interface DefaultProps {
	metadata: Metadata[];

	title?: string;
  dense?: boolean;
  selectable?: boolean;
  toolbar?: boolean;
  denseButton?: boolean;
  checkbox?: boolean;
  pagination?: boolean;
  haveActions?: boolean;
  actions?: (row: any) => JSX.Element;
}

interface WithData extends DefaultProps {
	data: any[];
  url?: undefined;
}

interface WithApi extends DefaultProps {
	url: string;
  data?: undefined;
}

type DataTableProps = WithData | WithApi;

export default DataTableProps;
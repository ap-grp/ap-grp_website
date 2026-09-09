declare module "react-simple-maps" {
  import type { ReactNode, CSSProperties } from "react";

  interface ProjectionConfig {
    center?: [number, number];

    scale?: number;

    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projection?: string;

    projectionConfig?: ProjectionConfig;

    width?: number;

    height?: number;

    style?: CSSProperties;

    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;

    children: (props: { geographies: any[] }) => ReactNode;
  }

  interface GeographyProps {
    geography: any;

    key?: string;

    fill?: string;

    stroke?: string;

    strokeWidth?: number;

    tabIndex?: number;

    style?: CSSProperties;

    [key: string]: any;
  }

  interface MarkerProps {
    coordinates: [number, number];

    children?: ReactNode;

    [key: string]: any;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  export function Geographies(props: GeographiesProps): JSX.Element;

  export function Geography(props: GeographyProps): JSX.Element;

  export function Marker(props: MarkerProps): JSX.Element;
}

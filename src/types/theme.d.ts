export interface AppTheme {
  colors: {
    primary: string;
    background: string;
    shape: string;
    text: string;
    placeholder: string;
    success: string;
    danger: string;
    border: string;
  };
  spacing: {
    none: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    heading: {
      fontSize: number;
      fontWeight: string | number;
    };
    body: {
      fontSize: number;
      fontWeight: string | number;
    };
    caption: {
      fontSize: number;
      fontWeight: string | number;
    };
  };
  radius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
}

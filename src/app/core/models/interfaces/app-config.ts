import { ColorScheme } from "../types/color-scheme";
import { MenuMode } from "../types/menu-mode";

export interface AppConfig {
    inputStyle: string;
    colorScheme: ColorScheme;
    componentTheme: string;
    ripple: boolean;
    menuMode: MenuMode;
    scale: number;
    menuTheme: string;
    topbarTheme: string;
    menuProfilePosition: string;
}
import 'styled-components/native';
import { Theme } from '../theme/index';

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme { }
}
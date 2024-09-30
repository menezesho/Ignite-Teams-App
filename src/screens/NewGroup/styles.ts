import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 16px;
`;

export const Center = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
    size: 60,
    color: theme.COLORS.GREEN_500,
}))`
    align-self: center;
`;
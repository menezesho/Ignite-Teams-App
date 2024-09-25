import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    /* Remover futuramente */
    padding-top: 20px;
`;

export const Logo = styled.Image`
    width: 46px;
    height: 55px;
`;

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`;

export const BackIcon = styled(MaterialIcons).attrs({
    name: 'arrow-back-ios',
    size: 24,
})`
    color: ${({ theme }) => theme.COLORS.WHITE};
`;
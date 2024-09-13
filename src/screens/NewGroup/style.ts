import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 16px;
`;

export const Center = styled.View`
    flex: 1;
    justify-content: center;
`;
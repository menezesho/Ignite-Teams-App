import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 24px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Form = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;
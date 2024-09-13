import { Header } from "@components/Header";
import { Center, Container } from "./style";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

export function NewGroup() {
    const { COLORS } = useTheme();

    return (
        <Container>
            <Header showBackButton />


            <Center>
                <Feather
                    name="users"
                    color={COLORS.GREEN_500}
                    size={60}
                    alignSelf='center'
                />

                <Highlight
                    title='Nova turma'
                    subtitle='Crie a turma para adicionar os integrantes'
                />

                <Input
                    placeholder='Nome da turma'
                />

                <Button
                    title='Criar'
                    style={{ marginTop: 20 }}
                />
            </Center>
        </Container>
    );
}
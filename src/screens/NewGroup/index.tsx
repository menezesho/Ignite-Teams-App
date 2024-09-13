import { Header } from "@components/Header";
import { Container } from "./style";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function NreGroup() {
    return (
        <Container>
            <Header showBackButton />

            <Input
                placeholder='Nome da turma'
            />

            <Button
                title='Criar'
                style={{ marginTop: 16 }}
            />
        </Container>
    );
}
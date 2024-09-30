import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Center, Container, Icon } from "./styles";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";

export function NewGroup() {
    const [group, setGroup] = useState('');
    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('players', { group });
    }

    return (
        <Container>
            <Header showBackButton />

            <Center>
                <Icon
                    name='groups'
                />

                <Highlight
                    title='Nova turma'
                    subtitle='Crie a turma para adicionar os integrantes'
                />

                <Input
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                />

                <Button
                    title='Criar'
                    style={{ marginTop: 20 }}
                    onPress={handleNewGroup}
                />
            </Center>
        </Container>
    );
}
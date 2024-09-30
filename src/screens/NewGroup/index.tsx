import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Center, Container, Icon } from "./styles";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { groupCreate } from "@storage/group/groupCreate";

export function NewGroup() {
    const [group, setGroup] = useState('');
    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch (error) {
            console.log(error);
        }
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
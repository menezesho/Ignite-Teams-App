import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Center, Container, Icon } from "./styles";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
    const [group, setGroup] = useState('');
    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            if (group.trim().length === 0) {
                Alert.alert('Nova turma', 'Informe o nome da turma');
                return;
            }
            await groupCreate(group.trim());
            navigation.navigate('players', { group });
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova turma', error.message);
                return;
            }
            Alert.alert('Nova turma', 'Não foi possível criar a turma');
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
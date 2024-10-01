import { Alert, FlatList, Keyboard, type TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListyEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import type { PlayerStorageDTO } from "@storage/player/dtos/PlayerStorageDTO";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";

import { AppError } from "@utils/AppError";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
    group: string;
}

export function Players() {
    const route = useRoute();
    const navigation = useNavigation();
    const newPlayerNameRef = useRef<TextInput>(null);

    const { group } = route.params as RouteParams;

    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            Alert.alert('Carregar pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa que deseja adicionar.');
        }

        const newPlayer: PlayerStorageDTO = {
            name: newPlayerName,
            team: team
        };

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameRef.current?.blur();
            Keyboard.dismiss();

            setNewPlayerName('');
            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                return Alert.alert('Nova pessoa', error.message);
            }
            Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa.');
            console.log(error);
        }
    }

    async function removePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa.');
            console.log(error);
        }
    }

    async function handleRemovePlayer(playerName: string) {
        Alert.alert(
            'Remover pessoa',
            `Deseja remover ${playerName} da lista?`, [
            { text: 'Sim', onPress: async () => removePlayer(playerName) },
            { text: 'Não', style: 'cancel' },
        ], { cancelable: true });
    }

    async function removeGroup() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            Alert.alert('Remover turma', 'Não foi possível remover a turma.');
            console.log(error);
        }
    }

    async function handleRemoveGroup() {
        Alert.alert(
            'Remover turma',
            `Deseja remover a turma ${group}?`, [
            { text: 'Sim', onPress: removeGroup },
            { text: 'Não', style: 'cancel' },
        ], { cancelable: true });
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    inputRef={newPlayerNameRef}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => handleRemovePlayer(item.name)}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <ListyEmpty
                                message="Não há pessoas nesse time"
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            players.length === 0 && { flex: 1 }
                        ]}
                    />
            }

            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    );
}
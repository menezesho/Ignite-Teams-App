import { useState, useCallback } from 'react';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { FlatList } from 'react-native';

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListyEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
    const [groups, setGroups] = useState<string[]>(['Primeiro grupo de teste']);

    const navigation = useNavigation();

    async function fetchGroups() {
        try {
            const data = await groupsGetAll();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group });
    }

    function handleNewGroup() {
        navigation.navigate('new');
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

    return (
        <Container>
            <Header />

            <Highlight
                title='Turmas'
                subtitle='Jogue com a sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => <ListyEmpty message='Que tal criar a primeira turma?' />}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

            <Button
                title='Criar turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}
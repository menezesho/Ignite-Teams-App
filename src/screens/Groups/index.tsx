import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native';

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListyEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
    const [groups, setGroups] = useState<string[]>(['Primeiro grupo de teste']);

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new');
    }

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
                    <GroupCard title={item} />
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
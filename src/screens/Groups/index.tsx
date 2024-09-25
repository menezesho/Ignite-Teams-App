import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListyEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
    const [groups, setGroups] = useState<string[]>(['Primeiro grupo de teste']);

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
            />

            <Button
                title='Criar turma'
                onPress={() => { }}
            />
        </Container>
    );
}
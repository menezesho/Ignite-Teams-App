import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(group: string) {
    try {
        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(group);

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com este nome');
        }

        const storage = JSON.stringify([...storedGroups, group]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
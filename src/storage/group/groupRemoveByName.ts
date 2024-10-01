import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupRemoveByName(name: string) {
    try {
        const storedGroups = await groupsGetAll();

        const groups = storedGroups.filter(group => group !== name);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

        await AsyncStorage.removeItem(`${GROUP_COLLECTION}-${name}`);
    } catch (error) {
        throw error;
    }
}
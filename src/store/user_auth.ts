import { writable } from "svelte/store";
import type {User} from "firebase/auth"


export let authUser = writable(null)


export const setAuthUser = (user:User) => {
    authUser.set(user);
}
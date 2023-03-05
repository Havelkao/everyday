import { createPinia, storeToRefs as _storeToRefs } from "pinia";
import { _useAuthStore } from "./_auth";
import { _useDataStore } from "./_data";

export const pinia = createPinia();
export const storeToRefs = _storeToRefs;
export const useAuthStore = _useAuthStore;
export const useDataStore = _useDataStore;

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const userService = {
    register,
    login,
    logout,
};

async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    return { data, error };
}

async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { data, error };
}

async function logout() {
    const { error } = await supabase.auth.signOut();

    return { error };
}

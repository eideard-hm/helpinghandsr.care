import type { User } from '@supabase/supabase-js';

import { catchError } from '@/lib/promise';
import { supabaseServerClient } from '@/lib/supabase/server';

export async function getUser(): Promise<User | null> {
    const [supabaseServer, err] = await catchError(supabaseServerClient());
    if (err || !supabaseServer) return null;

    const [data, err2] = await catchError(supabaseServer.auth.getUser());
    if (err2 || !data) return null;

    return data.data.user;
}
import { createClient ***REMOVED*** from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Create a user profile for a verified user
 * This is a workaround for RLS permission issues during email verification
 */
export async function createUserProfile(userId, name, email, role = 'user') {
  // First try with the normal client
  try {
    const { data, error ***REMOVED*** = await supabase
      .from('profiles')
      .insert({
        id: userId,
        name: name || 'User',
        email: email,
        role: role
      ***REMOVED***)
      .select()
      .single();
    
    if (error) throw error;
    return { data, error: null ***REMOVED***;
  ***REMOVED*** catch (error) {
    console.error('Error in normal profile creation:', error);
    
    // Use a custom function call as a fallback
    try {
      // This fallback uses a server-side RPC function that should be created
      // in your Supabase dashboard
      const { data: functionData, error: functionError ***REMOVED*** = await supabase.rpc(
        'create_user_profile',
        { 
          user_id: userId,
          user_name: name || 'User',
          user_email: email,
          user_role: role
        ***REMOVED***
      );
      
      if (functionError) throw functionError;
      return { data: functionData, error: null ***REMOVED***;
    ***REMOVED*** catch (functionError) {
      console.error('Error in function profile creation:', functionError);
      return { data: null, error: functionError ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
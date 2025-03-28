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

/**
 * Helper function to check and verify if a user has admin role
 * @param {string***REMOVED*** userId - The user ID to check
 * @returns {Promise<boolean>***REMOVED*** - True if user is admin, false otherwise
 */
export async function checkAndVerifyAdminRole(userId) {
  try {
    // Fetch the user profile
    const { data, error ***REMOVED*** = await supabase
      .from('profiles')
      .select('*')  // Get all fields for better debugging
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking admin role:', error);
      
      // Try checking with RPC as a fallback (bypasses RLS)
      try {
        console.log('Trying RPC fallback for role check...');
        const { data: rpcData, error: rpcError ***REMOVED*** = await supabase.rpc(
          'get_user_role',
          { user_id: userId ***REMOVED***
        );
        
        if (rpcError) {
          console.error('RPC role check failed:', rpcError);
          return false;
        ***REMOVED***
        
        if (rpcData && typeof rpcData === 'string') {
          const normalizedRpcRole = rpcData.toString().trim().toLowerCase();
          console.log('RPC role check result:', normalizedRpcRole);
          return normalizedRpcRole === 'admin';
        ***REMOVED***
      ***REMOVED*** catch (rpcError) {
        console.error('Exception in RPC role check:', rpcError);
      ***REMOVED***
      
      return false;
    ***REMOVED***
    
    // Log exact data for debugging
    console.log('User profile data for admin check:', data);
    
    // Additional safety checks
    if (!data) {
      console.error('No profile data found for user:', userId);
      return false;
    ***REMOVED***
    
    if (!data.role) {
      console.error('No role field found for user:', userId);
      return false;
    ***REMOVED***
    
    // Check role type
    console.log('Role type:', typeof data.role);
    console.log('Role value length:', data.role.length);
    console.log('Role value:', JSON.stringify(data.role)); // Shows hidden whitespace
    
    // Use normalized comparison for better reliability
    const normalizedRole = data.role.toString().trim().toLowerCase();
    console.log('Normalized role:', normalizedRole);
    console.log('Is admin check result:', normalizedRole === 'admin');
    
    // We know from user's previous message the role had whitespace
    // Auto-fix the role if needed
    if (normalizedRole === 'admin' && normalizedRole !== data.role) {
      console.log('Auto-fixing admin role with whitespace...');
      const { error: updateError ***REMOVED*** = await supabase
        .from('profiles')
        .update({ role: 'admin' ***REMOVED***)
        .eq('id', userId);
      
      if (updateError) {
        console.error('Error auto-fixing role:', updateError);
      ***REMOVED*** else {
        console.log('Successfully fixed admin role');
      ***REMOVED***
    ***REMOVED***
    
    return normalizedRole === 'admin';
  ***REMOVED*** catch (error) {
    console.error('Exception checking admin role:', error);
    return false;
  ***REMOVED***
***REMOVED***

// For testing/development - can be used to set a user as admin
export async function setUserAsAdmin(userId) {
  try {
    const { data, error ***REMOVED*** = await supabase
      .from('profiles')
      .update({ role: 'admin' ***REMOVED***)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    console.log('User set as admin:', data);
    return { success: true, data ***REMOVED***;
  ***REMOVED*** catch (error) {
    console.error('Error setting user as admin:', error);
    return { success: false, error ***REMOVED***;
  ***REMOVED***
***REMOVED***
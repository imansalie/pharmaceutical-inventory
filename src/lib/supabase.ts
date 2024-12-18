import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = 'https://ftvqlgzphpjnyufkfrnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dnFsZ3pwaHBqbnl1Zmtmcm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzgwODksImV4cCI6MjA1MDAxNDA4OX0.yHlOiKuBNaUXRclMbXPzD5_FfUu_MIBVazAioH0hOgg'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
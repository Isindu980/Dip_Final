import { createClient } from '@supabase/supabase-js'




const supabaseUrl = 'https://aecjyhulcqqleudcokba.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlY2p5aHVsY3FxbGV1ZGNva2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNTQzNDYsImV4cCI6MjAxMzYzMDM0Nn0.UxxuH5_SBH0Se_ZN-LwkIRkFQ4SKoN3ER_uCTp2yMd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase; 
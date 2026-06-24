'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addTodo(name: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('todos')
    .insert([{ name }])
    .select()

  if (error) {
    console.error('Error adding todo:', error)
    throw new Error(error.message)
  }

  // Revalidate the page so the new todo shows up immediately
  revalidatePath('/')
  
  return data
}

export async function updateTodo(id: number, name: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('todos')
    .update({ name })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating todo:', error)
    throw new Error(error.message)
  }

  revalidatePath('/')
  
  return data
}

export async function deleteTodo(id: number) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting todo:', error)
    throw new Error(error.message)
  }

  revalidatePath('/')
  
  return { success: true }
}

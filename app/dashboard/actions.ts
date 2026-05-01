"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function deleteWaitlistEntry(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("waitlist")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Delete waitlist error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/supabase";
import PromotionsCarousel from "./PromotionsCarousel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePromotions() {
  noStore();

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("commercial_notices")
    .select("id,title,slug,image_url,image_alt")
    .eq("status", "published")
    .or(`start_at.is.null,start_at.lte.${today}`)
    .or(`end_at.is.null,end_at.gte.${today}`)
    .order("sort_order")
    .limit(10);

  if (error) {
    console.error("Error loading home promotions:", error);
  }

  return <PromotionsCarousel items={data ?? []} />;
}

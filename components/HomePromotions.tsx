import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/supabase";
import PromotionsCarousel from "./PromotionsCarousel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PROMOTIONS_TIMEOUT_MS = 2500;

export default async function HomePromotions() {
  noStore();

  const today = new Date().toISOString().slice(0, 10);

  try {
    const promotionsQuery = supabase
      .from("commercial_notices")
      .select("id,title,slug,image_url,image_alt")
      .eq("status", "published")
      .or(`start_at.is.null,start_at.lte.${today}`)
      .or(`end_at.is.null,end_at.gte.${today}`)
      .order("sort_order")
      .limit(10)
      .abortSignal(AbortSignal.timeout(PROMOTIONS_TIMEOUT_MS));

    const { data, error } = await promotionsQuery;

    if (error) {
      console.error("Error loading home promotions:", error);
      return null;
    }

    if (!data?.length) {
      return null;
    }

    return <PromotionsCarousel items={data} />;
  } catch (error) {
    console.error("Home promotions unavailable; rendering homepage without promotions:", error);
    return null;
  }
}

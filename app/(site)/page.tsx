import { HomeSections } from "@/components/sections/HomeSections";
import { getHomeData } from "@/lib/content-queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getHomeData();
  return <HomeSections data={data} />;
}

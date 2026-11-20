import { connection } from "next/server";
import { HomeSections } from "@/components/sections/HomeSections";
import { getHomeData } from "@/lib/content-queries";
import { isDatabaseConfigured } from "@/lib/prisma";

export default async function Home() {
  // Database mode renders per request (see the site layout); static mode prerenders.
  if (isDatabaseConfigured) await connection();
  const data = await getHomeData();
  return <HomeSections data={data} />;
}

import { fetchAnime } from "../app/action";
import LoadMore from "@/components/LoadMore";
import TabPanel from "@/components/TabPanel";

async function Home() {
  const data = await fetchAnime(1);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10 bg-[#0A0023] justify-center items-center">
      <h2 className="text-3xl font-bold">Explore Anime</h2>
      <div className="w-full flex justify-center items-center"></div>
      <TabPanel className="w-full" index={0} value={0} key={0}>
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 sm:c">
          {data}
        </section>
      </TabPanel>
      <LoadMore />
    </main>
  );
}

export default Home;

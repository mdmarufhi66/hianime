import AnimeList from "@/components/AnimeList";

function Home() {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10 bg-gradient-to-b from-[#25221e] to-[#8c1105] justify-center items-center">
      <h2 className="text-3xl font-bold">
        Explore <span className="red-gradient">Anime</span>
      </h2>
      <AnimeList />
    </main>
  );
}

export default Home;

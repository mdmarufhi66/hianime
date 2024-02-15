import AnimeList from "@/components/AnimeList";

function Home() {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10 bg-zinc-950 justify-center items-center">
      <h2 className="text-3xl font-bold">Explore Anime</h2>
      <AnimeList />
    </main>
  );
}

export default Home;

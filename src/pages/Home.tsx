import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Additional sections will go here */}
      <div className="p-6 md:p-8">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Trending Now</h2>
          {/* Movie grid will go here */}
        </section>
      </div>
    </>
  );
}

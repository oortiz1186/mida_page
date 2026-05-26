export default function Hero() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        text-center
        /* Cambiamos el degradado para usar tus colores oficiales */
        bg-gradient-to-br
        from-mida-primary
        to-mida-deep
        text-white
        px-6
      "
    >
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Tecnología que <br />
          <span className="opacity-90">impulsa empresas</span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl font-light text-mida-gray/80">
          Consultoría • CONTPAQi • Equipamiento
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="
              bg-white
              text-mida-primary
              hover:bg-mida-gray
              transition-all
              duration-300
              px-10
              py-4
              rounded-full
              font-bold
              shadow-lg
            "
          >
            Solicitar asesoría
          </button>

          <button
            className="
              border-2
              border-white/30
              hover:border-white
              hover:bg-white/10
              transition-all
              px-10
              py-4
              rounded-full
              font-bold
            "
          >
            Ver servicios
          </button>
        </div>
      </div>
    </section>
  );
}

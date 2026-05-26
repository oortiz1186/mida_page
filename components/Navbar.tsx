import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logotipo Oficial Azul */}
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image 
            src="/logo/Logotipo-mida-azul.svg" 
            alt="MIDA Logo" 
            width={130} 
            height={40} 
            priority
          />
        </a>
        
        {/* Menú de Navegación */}
        <div className="hidden md:flex gap-8 font-semibold text-mida-deep items-center">
          <a href="/" className="hover:text-mida-light transition-colors">Inicio</a>
          <a href="/servicios" className="hover:text-mida-light transition-colors">Servicios</a>
          <a href="/contpaqi" className="hover:text-mida-light transition-colors">CONTPAQi</a>
          <a href="/equipamiento" className="hover:text-mida-light transition-colors">Equipamiento</a>
          <a href="/contacto" className="bg-mida-primary text-white px-5 py-2.5 rounded-full hover:bg-mida-deep transition-all shadow-md hover:shadow-lg">
            Contacto
          </a>
        </div>
      </nav>
    </header>
  );
}
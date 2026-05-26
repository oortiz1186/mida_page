import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-mida-deep text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logotipo Oficial Blanco */}
        <div className="flex flex-col gap-2">
          <Image 
            src="/logo/Logotipo-mida-blanco.svg" 
            alt="MIDA Logo Blanco" 
            width={110} 
            height={35} 
          />
          <p className="text-mida-gray/60 text-xs mt-2">
            Tecnología con precisión. Todos los derechos reservados &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex gap-6 text-sm text-mida-gray/80">
          <a href="/nosotros" className="hover:text-white transition-colors">Nosotros</a>
          <a href="/contacto" className="hover:text-white transition-colors">Soporte</a>
          <a href="/privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
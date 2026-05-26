import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Es vital que se mantenga el "export default function" exactamente así
export default function GraciasPage() {
  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-grow flex items-center justify-center pt-40 pb-24 px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center space-y-6">
          
          {/* Círculo con palomita animada */}
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-mida-deep">¡Mensaje Recibido!</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Agradecemos tu interés en nuestras soluciones. Un consultor especializado analizará tus requerimientos y se pondrá en contacto contigo a la brevedad.
            </p>
          </div>

          <div className="pt-4">
            <a 
              href="/" 
              className="inline-block bg-mida-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm w-full text-center"
            >
              Volver al Inicio
            </a>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
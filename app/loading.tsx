export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
      {/* Spinner animado con tu color primario MIDA */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-mida-primary rounded-full animate-spin" />
      <p className="text-mida-deep font-bold text-xs uppercase tracking-widest animate-pulse">
        Cargando Infraestructura MIDA...
      </p>
    </div>
  );
}
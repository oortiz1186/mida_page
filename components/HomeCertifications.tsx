import Image from "next/image";
import Link from "next/link";

const systems = [
  { title: "CONTPAQi Contabilidad", description: "Contabilidad electrónica, pólizas, estados financieros y obligaciones fiscales.", href: "/contpaqi-contabilidad", logo: "/images/productos/contabilidad.png" },
  { title: "CONTPAQi Bancos", description: "Control de cuentas bancarias, flujo de efectivo y conciliaciones.", href: "/contpaqi-bancos", logo: "/images/productos/bancos-2026.png" },
  { title: "CONTPAQi Nóminas", description: "Cálculo de nómina, timbrado de recibos y obligaciones laborales.", href: "/contpaqi-nominas", logo: "/images/productos/nominas.png" },
  { title: "CONTPAQi Comercial Premium", description: "Administración comercial, inventarios, compras, ventas y facturación.", href: "/contpaqi-comercial-premium", logo: "/images/productos/comercial_premium.png" },
  { title: "CONTPAQi Comercial Pro", description: "Gestión comercial, ventas, compras, clientes e inventarios.", href: "/contpaqi-comercial-pro", logo: "/images/productos/comercial_pro.png" },
  { title: "CONTPAQi Factura Electrónica", description: "Emisión, timbrado y administración de CFDI.", href: "/contpaqi-factura-electronica", logo: "/images/productos/factura_electronica.png" },
];

export default function HomeCertifications() {
  return (
    <section aria-labelledby="certificaciones-titulo" className="bg-slate-50 py-20 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-mida-primary">Preparación que respalda nuestro servicio</p>
            <h2 id="certificaciones-titulo" className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Asesores certificados en soluciones CONTPAQi</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Nuestro equipo cuenta con certificaciones en soluciones CONTPAQi para acompañar a tu empresa con atención especializada.</p>
          </div>
          <Link href="/certificaciones" className="inline-flex w-fit items-center justify-center rounded-full bg-mida-primary px-6 py-3 font-semibold text-white hover:bg-mida-deep transition-colors">Conoce nuestras certificaciones <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, index) => (
            <Link key={system.title} href={system.href} aria-label={`Conocer más sobre ${system.title}`} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm group block hover:border-mida-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between gap-4"><Image src={system.logo} alt={`Logotipo de ${system.title}`} width={160} height={88} className="h-16 w-auto max-w-[180px] object-contain object-left" /><span className="text-xs font-bold text-mida-primary/60">{String(index + 1).padStart(2, "0")}</span></div>
              <h3 className="mt-4 text-lg font-bold text-mida-deep group-hover:text-mida-primary transition-colors">{system.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{system.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-mida-primary">Conocer sistema <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

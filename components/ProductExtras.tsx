import Link from "next/link";
import type { SeoPage } from "@/lib/seoPages";
import { getSeoPage } from "@/lib/seoPages";

export default function ProductExtras({page}:{page:SeoPage}){
 const faqs=page.faqs??[];
 const related=(page.relatedProducts??[]).map(getSeoPage).filter((x):x is SeoPage=>Boolean(x));
 if(!related.length&&!faqs.length)return null;
 const faqJsonLd=faqs.length?{"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(x=>({"@type":"Question","name":x.question,"acceptedAnswer":{"@type":"Answer","text":x.answer}}))}:null;
 return <>
  {related.length>0&&<section className="bg-white px-6 py-20"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><span className="text-xs font-bold uppercase tracking-widest text-mida-primary">Ecosistema CONTPAQi®</span><h2 className="mt-3 text-3xl font-black text-mida-deep">Complementa tu solución</h2><p className="mt-4 text-gray-600">Conoce otras soluciones que pueden complementar la operación de {page.h1}.</p></div><div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{related.map(x=><Link key={x.slug} href={`/${x.slug}`} className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="text-xs font-bold uppercase tracking-widest text-mida-primary">{x.eyebrow}</span><h3 className="mt-2 text-xl font-black text-mida-deep">{x.h1}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{x.intro}</p><span className="mt-5 inline-block font-bold text-mida-primary">Conocer solución →</span></Link>)}</div></div></section>}
  {faqs.length>0&&<section className="border-y border-gray-100 bg-slate-50 px-6 py-20"><div className="mx-auto max-w-4xl"><div className="text-center"><span className="text-xs font-bold uppercase tracking-widest text-mida-primary">Resolvemos tus dudas</span><h2 className="mt-3 text-3xl font-black text-mida-deep">Preguntas frecuentes sobre {page.h1}</h2></div><div className="mt-10 space-y-3">{faqs.map(x=><details key={x.question} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><summary className="cursor-pointer list-none pr-8 font-bold text-mida-deep">{x.question}<span className="float-right text-mida-primary group-open:rotate-45">+</span></summary><p className="mt-4 leading-7 text-gray-600">{x.answer}</p></details>)}</div></div></section>}
  {faqJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}}/>}
 </>;
}
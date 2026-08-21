"use client";

import { FormEvent, useMemo, useState } from "react";

type Vehicle = {
  id: number; title: string; brand: string; year: number; km: number;
  price: number; city: string; image: string; body: string; fuel: string;
  gearbox: string; featured?: boolean; verified?: boolean;
};

const vehicles: Vehicle[] = [
  { id: 1, title: "Jeep Compass Longitude T270", brand: "Jeep", year: 2023, km: 31200, price: 147900, city: "Rio de Janeiro, RJ", body: "SUV", fuel: "Flex", gearbox: "Automático", featured: true, verified: true, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=88" },
  { id: 2, title: "Toyota Corolla Altis Hybrid", brand: "Toyota", year: 2022, km: 42800, price: 154990, city: "São Paulo, SP", body: "Sedã", fuel: "Híbrido", gearbox: "Automático", featured: true, verified: true, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=88" },
  { id: 3, title: "Volkswagen T-Cross Highline", brand: "Volkswagen", year: 2024, km: 17800, price: 156500, city: "Belo Horizonte, MG", body: "SUV", fuel: "Flex", gearbox: "Automático", verified: true, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=88" },
  { id: 4, title: "Chevrolet Onix Premier Turbo", brand: "Chevrolet", year: 2021, km: 53900, price: 82900, city: "Curitiba, PR", body: "Hatch", fuel: "Flex", gearbox: "Automático", featured: true, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=88" },
  { id: 5, title: "Fiat Toro Volcano 2.0 4x4", brand: "Fiat", year: 2022, km: 61500, price: 139900, city: "Goiânia, GO", body: "Picape", fuel: "Diesel", gearbox: "Automático", verified: true, image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=88" },
  { id: 6, title: "Honda Civic Touring 1.5 Turbo", brand: "Honda", year: 2020, km: 68400, price: 132900, city: "Niterói, RJ", body: "Sedã", fuel: "Gasolina", gearbox: "Automático", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=88" },
];

const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const number = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

export default function Home() {
  const [brand, setBrand] = useState("Todas");
  const [body, setBody] = useState("Todos");
  const [year, setYear] = useState("2018");
  const [maxPrice, setMaxPrice] = useState("200000");
  const [sort, setSort] = useState("relevance");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [sellOpen, setSellOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const results = useMemo(() => {
    const list = vehicles.filter((item) =>
      (brand === "Todas" || item.brand === brand) &&
      (body === "Todos" || item.body === body) &&
      item.year >= Number(year) && item.price <= Number(maxPrice));
    return [...list].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "newest" ? b.year - a.year : Number(!!b.featured) - Number(!!a.featured));
  }, [brand, body, year, maxPrice, sort]);

  function toggleFavorite(id: number) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function clearFilters() {
    setBrand("Todas"); setBody("Todos"); setYear("2018"); setMaxPrice("200000");
  }

  function sendVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSent(true);
  }

  const brands = ["Todas", "Chevrolet", "Fiat", "Honda", "Jeep", "Toyota", "Volkswagen"];

  return <main>
    <div className="top-note"><span>Comprar e vender veículos ficou mais simples.</span><a href="#seguranca">Negocie com segurança →</a></div>
    <header className="site-header">
      <a className="brand-logo" href="#inicio" aria-label="AutoNexo, início"><b>AN</b><span>Auto<strong>Nexo</strong></span></a>
      <nav aria-label="Navegação principal"><a href="#ofertas">Comprar</a><button onClick={() => setSellOpen(true)}>Vender</button><a href="#lojas">Para lojas</a><a href="#seguranca">Como funciona</a></nav>
      <div className="header-actions"><button className="favorites">♡ <span>Favoritos</span><i>{favorites.length}</i></button><button className="login">Entrar</button><button className="announce" onClick={() => setSellOpen(true)}>+ Anunciar veículo</button></div>
    </header>

    <section className="hero" id="inicio">
      <div className="orb one"/><div className="orb two"/>
      <div className="hero-inner">
        <span className="eyebrow">O seu próximo carro começa aqui</span>
        <h1>Encontre o veículo certo para o seu momento.</h1>
        <p>Ofertas de particulares e lojas em uma busca rápida, transparente e feita para você.</p>
        <div className="search-box">
          <div className="tabs"><button className="active">Comprar carro</button><button>Comprar moto</button></div>
          <div className="search-fields">
            <label><span>Marca</span><select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label><span>Modelo</span><select><option>Todos os modelos</option></select></label>
            <label><span>Localização</span><select><option>Brasil</option><option>Rio de Janeiro</option><option>São Paulo</option></select></label>
            <a href="#ofertas">Buscar veículos <b>→</b></a>
          </div>
        </div>
        <div className="quick"><span>Buscas populares:</span><a href="#ofertas">Até R$ 60 mil</a><a href="#ofertas">SUV automático</a><a href="#ofertas">Zero km</a><a href="#ofertas">Picapes</a></div>
      </div>
    </section>

    <section className="trust">
      <div><b>✓</b><p><strong>Anúncios verificados</strong><small>Mais confiança para escolher</small></p></div>
      <div><b>⌖</b><p><strong>Ofertas perto de você</strong><small>Busca por cidade e região</small></p></div>
      <div><b>↗</b><p><strong>Negociação direta</strong><small>Converse com quem anuncia</small></p></div>
      <div><b>◎</b><p><strong>Preço de mercado</strong><small>Compare antes de decidir</small></p></div>
    </section>

    <section className="shell categories">
      <Heading kicker="Comece pelo seu estilo" title="Que tipo de carro você procura?" />
      <div className="category-grid">
        {[["Hatch","Compacto e econômico","▰"],["Sedã","Conforto para viajar","▱"],["SUV","Espaço e versatilidade","▰"],["Picape","Força para todo terreno","▰"],["Elétrico","Tecnologia e economia","ϟ"]].map(([name, copy, icon]) =>
          <button key={name} className={body === name ? "selected" : ""} onClick={() => setBody(name)}><i>{icon}</i><strong>{name}</strong><small>{copy}</small></button>)}
      </div>
    </section>

    <section className="catalog" id="ofertas"><div className="shell">
      <div className="heading row"><div><span>Escolhidos para você</span><h2>Ofertas em destaque</h2></div><div className="sort"><button onClick={() => setMobileFilters(!mobileFilters)}>Filtros</button><label>Ordenar: <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="relevance">Mais relevantes</option><option value="newest">Mais novos</option><option value="price-low">Menor preço</option><option value="price-high">Maior preço</option></select></label></div></div>
      <div className="catalog-layout">
        <aside className={mobileFilters ? "filters open" : "filters"}>
          <div className="filter-title"><strong>Filtrar resultados</strong><button onClick={clearFilters}>Limpar</button></div>
          <Filter label="Marca"><select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <Filter label="Carroceria"><select value={body} onChange={(e) => setBody(e.target.value)}>{["Todos","Hatch","Sedã","SUV","Picape"].map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <Filter label="Ano a partir de"><select value={year} onChange={(e) => setYear(e.target.value)}>{[2010,2015,2018,2020,2022].map((item) => <option key={item}>{item}</option>)}</select></Filter>
          <Filter label="Preço máximo"><select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}><option value="60000">R$ 60.000</option><option value="100000">R$ 100.000</option><option value="150000">R$ 150.000</option><option value="200000">R$ 200.000</option><option value="500000">Sem limite</option></select></Filter>
          <div className="checks"><strong>Opcionais</strong><label><input type="checkbox"/> Câmbio automático</label><label><input type="checkbox"/> Único dono</label><label><input type="checkbox"/> Com garantia</label></div>
          <button className="apply" onClick={() => setMobileFilters(false)}>Ver {results.length} ofertas</button>
        </aside>
        <div><div className="result-count"><p><strong>{results.length}</strong> veículos encontrados</p><span>Dados demonstrativos</span></div>
          {results.length ? <div className="vehicle-grid">{results.map((vehicle) =>
            <article className="vehicle-card" key={vehicle.id}>
              <div className="photo"><img src={vehicle.image} alt={vehicle.title}/>{vehicle.featured && <em>Destaque</em>}<button className={favorites.includes(vehicle.id) ? "heart active" : "heart"} onClick={() => toggleFavorite(vehicle.id)}>{favorites.includes(vehicle.id) ? "♥" : "♡"}</button><small>▣ 8 fotos</small></div>
              <div className="vehicle-copy"><div className="place"><span>{vehicle.city}</span>{vehicle.verified && <b>✓ Verificado</b>}</div><h3>{vehicle.title}</h3><div className="specs"><span>{vehicle.year}</span><span>{number(vehicle.km)} km</span><span>{vehicle.gearbox}</span><span>{vehicle.fuel}</span></div><div className="price"><p><small>A partir de</small><strong>{money(vehicle.price)}</strong></p><button onClick={() => setSelected(vehicle)}>Ver detalhes</button></div></div>
            </article>)}</div> : <div className="empty"><b>⌕</b><h3>Nenhum veículo com esses filtros</h3><p>Tente aumentar o preço ou alterar o ano.</p><button onClick={clearFilters}>Limpar filtros</button></div>}
        </div>
      </div>
    </div></section>

    <section className="shell sell-banner"><div><span>Venda sem complicação</span><h2>Seu carro pode encontrar um novo dono hoje.</h2><p>Crie um anúncio completo em poucos minutos e fale diretamente com pessoas interessadas.</p><button onClick={() => setSellOpen(true)}>Anunciar meu veículo</button></div><div className="steps"><Step n="01" title="Informe os dados" copy="Marca, modelo, ano e versão"/><Step n="02" title="Adicione boas fotos" copy="Mostre todos os detalhes"/><Step n="03" title="Receba contatos" copy="Negocie com interessados"/></div></section>

    <section className="shell safety" id="seguranca"><div><span>Negocie com tranquilidade</span><h2>Informação para fazer uma escolha melhor.</h2><p>Dados claros do anúncio, histórico do vendedor e orientações de segurança em cada etapa.</p><a href="#inicio">Conheça nossas dicas →</a></div><div className="safety-grid"><Info n="01" title="Compare ofertas"/><Info n="02" title="Confira os dados"/><Info n="03" title="Faça uma vistoria"/><Info n="04" title="Negocie com cuidado"/></div></section>

    <section className="dealers" id="lojas"><div className="shell"><div><span>AutoNexo para lojas</span><h2>Seu estoque na frente de quem quer comprar.</h2><p>Planos profissionais, gestão de anúncios e mais visibilidade para sua loja.</p></div><button>Conhecer planos profissionais</button></div></section>
    <footer><div className="shell footer-grid"><div><a className="brand-logo" href="#inicio"><b>AN</b><span>Auto<strong>Nexo</strong></span></a><p>O ponto de encontro entre quem tem um veículo e quem procura o próximo.</p></div><div><strong>Comprar</strong><a href="#ofertas">Carros usados</a><a href="#ofertas">Carros novos</a><a href="#ofertas">Motos</a></div><div><strong>Vender</strong><button onClick={() => setSellOpen(true)}>Criar anúncio</button><a href="#seguranca">Como funciona</a><a href="#lojas">Planos para lojas</a></div><div><strong>AutoNexo</strong><a href="#seguranca">Segurança</a><a href="#inicio">Ajuda</a><a href="#inicio">Termos</a></div></div><div className="shell copyright">© 2026 AutoNexo — projeto demonstrativo.</div></footer>

    {selected && <div className="backdrop" onMouseDown={() => setSelected(null)}><section className="detail-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt={selected.title}/><div><span>{selected.city}</span><h2>{selected.title}</h2><div className="detail-specs"><p><small>Ano</small><b>{selected.year}</b></p><p><small>Quilometragem</small><b>{number(selected.km)} km</b></p><p><small>Câmbio</small><b>{selected.gearbox}</b></p><p><small>Combustível</small><b>{selected.fuel}</b></p></div><div className="detail-price"><small>Preço anunciado</small><b>{money(selected.price)}</b></div><div className="detail-buttons"><button>Tenho interesse</button><button onClick={() => toggleFavorite(selected.id)}>{favorites.includes(selected.id) ? "♥ Salvo" : "♡ Favoritar"}</button></div><p className="warning">Nunca antecipe pagamentos antes de confirmar a procedência do veículo e a identidade do anunciante.</p></div></section></div>}

    {sellOpen && <div className="backdrop" onMouseDown={() => setSellOpen(false)}><section className="sell-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}><button className="close" onClick={() => setSellOpen(false)}>×</button>{!sent ? <><span>Anuncie na AutoNexo</span><h2>Conte sobre o seu veículo</h2><p>Comece pelos dados principais. Você poderá revisar antes de publicar.</p><form onSubmit={sendVehicle}><div className="form-grid"><Field label="Tipo"><select required><option>Carro</option><option>Moto</option><option>Utilitário</option></select></Field><Field label="Marca"><select required defaultValue=""><option value="" disabled>Selecione</option>{brands.slice(1).map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Modelo"><input required placeholder="Ex.: Compass"/></Field><Field label="Ano"><input required type="number" min="1950" max="2027" placeholder="2022"/></Field><Field label="Quilometragem"><input required type="number" min="0" placeholder="45000"/></Field><Field label="Preço"><input required type="number" min="0" placeholder="89000"/></Field></div><Field label="Cidade"><input required placeholder="Cidade, UF"/></Field><label className="upload">Fotos do veículo<input type="file" accept="image/*" multiple/><small>Mostre frente, traseira, laterais e interior.</small></label><button className="continue" type="submit">Continuar anúncio →</button></form></> : <div className="success"><b>✓</b><h2>Dados recebidos!</h2><p>Na versão completa, o próximo passo será revisar as fotos e publicar.</p><button onClick={() => {setSent(false);setSellOpen(false)}}>Voltar para o início</button></div>}</section></div>}
  </main>;
}

function Heading({kicker, title}: {kicker: string; title: string}) { return <div className="heading"><span>{kicker}</span><h2>{title}</h2></div>; }
function Filter({label, children}: {label: string; children: React.ReactNode}) { return <label className="filter"><span>{label}</span>{children}</label>; }
function Field({label, children}: {label: string; children: React.ReactNode}) { return <label className="field"><span>{label}</span>{children}</label>; }
function Step({n,title,copy}: {n:string;title:string;copy:string}) { return <div><b>{n}</b><p><strong>{title}</strong><small>{copy}</small></p></div>; }
function Info({n,title}: {n:string;title:string}) { return <article><span>{n}</span><h3>{title}</h3><p>Veja informações importantes antes de fechar negócio.</p></article>; }

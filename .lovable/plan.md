# Novo site — Pousada Curitiba Budget

Site institucional/conversão de página única (com rotas próprias para as seções principais), construído do zero, mobile-first, com foco em levar o visitante ao WhatsApp.

## O que encontrei nos arquivos enviados

Do ZIP enviado (22 arquivos):

- **5 fotos reais utilizáveis**: fachada com estacionamento, vista do pátio/estacionamento de cima, quarto com beliches (2 beliches), quarto amplo com cama de casal + TV + ar-condicionado + beliche, quarto com cama de casal + TV + poltrona + armário.
- **4 artes antigas geradas por IA** (café da manhã, Wi-Fi, estacionamento, ar-condicionado) — serão usadas apenas como referência de conteúdo, não entram no site.
- **13 capturas de tela do site atual** — referência de conteúdo, não entram como imagens.

Consequência prática: a galeria e os cards de acomodação serão construídos com essas 5 fotos reais. Nada de banco de imagens nem foto gerada. Se depois você enviar mais fotos, elas entram nos mesmos arrays sem refazer nada.

Da tabela do site atual confirmo as distâncias: Parque Barigui 5,6 km · Centro 5,8 km · Jardim Botânico 7,5 km · Ópera de Arame 11,8 km. Palladium e ParkShoppingBarigüi entram como "aprox." conforme seu briefing.

## Identidade visual

- Verde floresta profundo como cor institucional, ouro/mostarda como destaque, fundo creme off-white, texto grafite. Verde WhatsApp restrito aos botões de reserva.
- Tipografia: Manrope (títulos) + Inter (texto), carregadas via `<link>` no root.
- Cantos suaves, sombras discretas, muito respiro. Sem gradiente forte, sem bloco amarelo gigante, sem emoji.
- Tokens em `src/styles.css` (oklch), nada de cor hardcoded nos componentes.

## Estrutura da home

1. Header sticky (transparente sobre o hero, compacto e sólido ao rolar) + menu lateral mobile acessível.
2. Hero com foto real da fachada, overlay sutil, eyebrow/H1/subtítulo, 4 selos (estacionamento, Wi-Fi, café, ar-condicionado) e 2 CTAs.
3. Mini motor de consulta (check-in, check-out, hóspedes, tipo de estadia) que monta a mensagem e abre o WhatsApp com texto codificado.
4. Barra de confiança com 4 diferenciais + nota do Google vinda de um arquivo de dados editável.
5. "Sua estadia em Curitiba" — layout editorial com foto real + lista de comodidades.
6. Acomodações — cards com foto real, categorias neutras baseadas no que as fotos mostram (casal, família/misto, beliches para grupos), cada um com botão de consulta no WhatsApp. Sem preços.
7. Galeria — mosaico no desktop, swipe no mobile, lightbox acessível em tela cheia.
8. Diferenciais — 6 cards com ícones Lucide.
9. Empresas e grupos — seção em verde escuro com benefícios e CTA de orçamento com mensagem estruturada.
10. Avaliações — nota, estrelas e cards. **Entram como placeholders marcados no arquivo de dados até você me passar as avaliações reais** (não vou inventar depoimentos).
11. Localização — embed oficial do Google Maps (modo sem chave de API, não repete o erro atual), endereço, botão de rota.
12. Perto de tudo — cards por categoria com distância aproximada e botão de rota.
13. FAQ em accordion; check-in/check-out e pets redigidos orientando confirmação pelo WhatsApp.
14. CTA final sobre foto real + footer completo + botão flutuante de WhatsApp.

## Detalhes técnicos

- TanStack Start. Home reescrita em `src/routes/index.tsx`; rotas próprias para `/acomodacoes`, `/estrutura`, `/localizacao`, `/avaliacoes`, `/empresas` e `/contato`, cada uma com `head()` próprio (title, description, og, canonical). Nav do header aponta para as rotas; dentro da home o scroll é por âncora.
- Componentes em `src/components/site/`: Header, Hero, BookingInquiry, TrustBar, About, AccommodationCards, Gallery, Lightbox, Amenities, CorporateStay, Testimonials, Location, NearbyPlaces, FAQ, FinalCTA, Footer, WhatsAppFab.
- Conteúdo centralizado em `src/data/pousada.ts` (contato, comodidades, acomodações, distâncias, FAQ, avaliações, redes sociais) — tudo editável em um lugar.
- Fotos publicadas via Lovable Assets (ponteiros em `src/assets`), com `loading="lazy"` exceto o hero, `alt` descritivo em português e `object-cover` com proporção fixa.
- WhatsApp: helper único que monta `https://wa.me/5541996725894?text=` com `encodeURIComponent`.
- SEO: title/description do briefing, JSON-LD `LodgingBusiness` com nome, endereço, telefone e comodidades confirmadas (sem geo), sitemap, robots, favicon, manifest.
- Acessibilidade: HTML semântico, foco visível, `aria-label` nos ícones, accordion e lightbox navegáveis por teclado, `prefers-reduced-motion` respeitado.
- Sem backend nesta versão — nenhum formulário sem destino, nenhum link `#`.

## Pendências que dependem de você (ficam marcadas, não inventadas)

- Avaliações reais do Google (nota, quantidade e 3 a 4 trechos com nomes).
- URLs de Instagram e Facebook.
- Confirmação de horários de check-in/check-out, política de pets e quais quartos têm banheiro privativo.
- Mais fotos reais (banheiro, café da manhã, área comum) enriqueceriam bastante a galeria.

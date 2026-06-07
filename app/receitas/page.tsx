'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const RECIPES = [
  {
    id: 1,
    title: 'Matapa',
    titleTs: 'Matapa',
    time: '90 min',
    difficulty: 'Médio',
    img: 'https://tse2.mm.bing.net/th/id/OIP.hTp5LYR6hq81-L5O9tyUtAHaJC?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3',
    ingredients: ['Folhas de mandioca', 'Amendoim (500g)', 'Leite de coco (400ml)', 'Alho (4 dentes)', 'Camarão ou caranguejo', 'Sal a gosto'],
    steps: [
      'Pila ou processa as folhas de mandioca até ficarem bem finas.',
      'Coloca a matapa numa panela com água (suficiente para cobrir) e cozinha em lume médio até a água desaparecer totalmente (45–60 min). A matapa tem de ficar bem sequinha.',
      'Adiciona o amendoim moído e mistura bem.',
      'Incorpora o leite de coco e o marisco. Cozinha em lume brando por mais 30 min, mexendo frequentemente.',
      'Tempera com sal e alho esmagado. Serve com arroz ou xima.',
    ],
  },
  {
    id: 2,
    title: 'Caril de Peixe',
    titleTs: 'Carili ya Nsomi',
    time: '45 min',
    difficulty: 'Fácil',
    img: 'https://amazingfoodanddrink.com/wp-content/uploads/2025/03/Best-Fish-Curry-Recipe-with-Coconut-or-Spicy-Variations.jpeg',
    ingredients: ['Peixe fresco (1kg)', 'Leite de coco (400ml)', 'Cebola (2)', 'Alho (3 dentes)', 'Tomate (3)', 'Caril em pó (2 col. sopa)', 'Coentros', 'Limão', 'Sal'],
    steps: [
      'Tempera o peixe com sumo de limão e sal. Deixa repousar 15 min.',
      'Refoga a cebola e alho em azeite até ficarem dourados.',
      'Adiciona o tomate picado e o caril. Cozinha por 5 min.',
      'Incorpora o leite de coco e deixa levantar fervura.',
      'Adiciona o peixe e cozinha em lume brando por 15–20 min.',
      'Finaliza com coentros frescos. Serve com arroz.',
    ],
  },
  {
    id: 3,
    title: 'Xima com Frango',
    titleTs: 'Ximu na Hohomu',
    time: '60 min',
    difficulty: 'Fácil',
    img: 'https://tse4.mm.bing.net/th/id/OIP.MGSCtqRHmhWqX4Q0MkRJRgHaGK?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3',
    ingredients: ['Farinha de milho (500g)', 'Frango (1 kg)', 'Cebola', 'Tomate', 'Alho', 'Piri-piri', 'Sal', 'Água (1.5L)'],
    steps: [
      'Para a xima: ferve a água com uma pitada de sal. Adiciona a farinha aos poucos, mexendo sem parar.',
      'Cozinha em lume baixo por 20–25 min, mexendo frequentemente até ficar espessa e homogénea.',
      'Para o frango: tempera com alho, piri-piri e sal. Frita até dourar.',
      'Adiciona cebola e tomate e deixa apurar por 20 min.',
      'Serve a xima com o frango e o molho.',
    ],
  },
];

export default function Receitas() {
  const [selected, setSelected] = useState<typeof RECIPES[0] | null>(null);
  const { t, language } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter border-l-4 border-[#ff9800] pl-4">
          {t('recipesTagline')}
        </h1>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 pl-5">
          {RECIPES.length} receitas tradicionais
        </p>
      </div>

      {selected ? (
        <article className="bg-white shadow-xl border-t-4 border-[#004d40] rounded-sm" aria-label={`Receita: ${selected.title}`}>
          {/* Image */}
          <div className="h-56 md:h-72 overflow-hidden">
            <img
              src={selected.img}
              className="w-full h-full object-cover"
              alt={`Prato: ${selected.title}`}
            />
          </div>

          <div className="p-6 md:p-10">
            <button
              onClick={() => setSelected(null)}
              className="text-[#ff9800] font-black uppercase text-[10px] mb-6 hover:text-[#004d40] focus:outline-none focus:underline transition-colors flex items-center gap-1"
              aria-label="Voltar à lista de receitas"
            >
              {t('back')}
            </button>

            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black text-[#004d40] uppercase tracking-tighter">{selected.title}</h2>
                {language === 'ts' && selected.titleTs !== selected.title && (
                  <p className="text-[11px] font-bold text-gray-400 uppercase mt-1">{selected.titleTs}</p>
                )}
              </div>
              <div className="flex gap-3 shrink-0">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full">⏱ {selected.time}</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full">{selected.difficulty}</span>
              </div>
            </div>

            {/* Gestalt: proximity — ingredients grouped separately from steps */}
            <div className="grid md:grid-cols-2 gap-8">
              <section aria-labelledby="ingredients-heading">
                <h3 id="ingredients-heading" className="font-black uppercase text-[10px] tracking-widest text-[#ff9800] mb-3">Ingredientes</h3>
                <ul className="space-y-2" role="list">
                  {selected.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004d40] mt-2 shrink-0" aria-hidden="true"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="steps-heading">
                <h3 id="steps-heading" className="font-black uppercase text-[10px] tracking-widest text-[#ff9800] mb-3">Modo de Preparação</h3>
                <ol className="space-y-3" role="list">
                  {selected.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-black text-[#004d40] text-sm shrink-0 w-5">{i + 1}.</span>
                      <p className="text-sm font-medium text-gray-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </article>
      ) : (
        <ul role="list" className="grid gap-5">
          {RECIPES.map((r) => (
            <li key={r.id}>
              <article className="bg-white border border-gray-100 hover:border-[#ff9800] hover:shadow-lg transition-all flex flex-col sm:flex-row overflow-hidden group rounded-sm">
                <div className="w-full sm:w-40 h-40 sm:h-auto overflow-hidden shrink-0" aria-hidden="true">
                  <img
                    src={r.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-1">
                  <div>
                    <h2 className="text-xl font-black uppercase text-[#004d40] tracking-tight">{r.title}</h2>
                    {language === 'ts' && r.titleTs !== r.title && (
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{r.titleTs}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-1 rounded-full">⏱ {r.time}</span>
                      <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-1 rounded-full">{r.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(r)}
                    className="shrink-0 bg-[#ff9800] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#004d40] focus:outline-none focus:ring-2 focus:ring-[#ff9800] focus:ring-offset-2 transition-colors rounded-sm"
                    aria-label={`Ver receita: ${r.title}`}
                  >
                    {t('viewRecipe')}
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

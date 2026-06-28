import { ref } from "vue";

export default {
  setup() {
    // Wrapped the array correctly in a Vue 3 reactive ref
    const hotels = ref([
      {
        id: 1,
        name: "The Azure Boutique",
        rating: 4.9,
        location: "1st Arrondissement, Paris",
        description:
          "Experience ultimate Parisian luxury with breathtaking views of the Eiffel Tower and premium amenities.",
        price: 450,
        badge: { label: "Top Rated", style: "bg-amber-400 text-slate-900" },
        wishlisted: true,
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
      },
      {
        id: 2,
        name: "Le Marais Maison",
        rating: 4.7,
        location: "Le Marais, Paris",
        description:
          "Charming boutique stay tucked away in a historic district with cobblestone streets and artisan cafés.",
        price: 310,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=500&q=80",
      },
      {
        id: 3,
        name: "L'Étoile Grand Resort",
        rating: 4.8,
        location: "Champs-Élysées, Paris",
        description:
          "Unrivalled elegance near the Arc de Triomphe. Features an indoor pool, spa, and rooftop bar.",
        price: 590,
        badge: { label: "Pool Access", style: "bg-teal-800 text-white" },
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
      },
      {
        id: 4,
        name: "Canal Saint-Martin Loft",
        rating: 4.6,
        location: "10th Arrondissement, Paris",
        description:
          "Live like a local in this sun-drenched industrial loft overlooking the iconic canal.",
        price: 275,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&q=80",
      },
      {
        id: 5,
        name: "Seine View Residence",
        rating: 4.9,
        location: "Quai d'Orsay, Paris",
        description:
          "Wake up to the sounds of the Seine. A rare riverside gem with private terrace and butler service.",
        price: 520,
        badge: null,
        wishlisted: true,
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
      },
      {
        id: 6,
        name: "Montmartre Heights",
        rating: 4.5,
        location: "Montmartre, Paris",
        description:
          "Perched high on the hill of Montmartre, offering the best sunset views over the Paris skyline.",
        price: 385,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80",
      },
      {
        id: 7,
        name: "Palais Royal Suites",
        rating: 4.8,
        location: "1st Arrondissement, Paris",
        description:
          "Steps from the Louvre, this palatial hotel blends 18th-century charm with modern luxury.",
        price: 680,
        badge: { label: "New", style: "bg-emerald-500 text-white" },
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
      },
      {
        id: 8,
        name: "Saint-Germain Studio",
        rating: 4.6,
        location: "6th Arrondissement, Paris",
        description:
          "Bohemian chic meets Parisian elegance in this beautifully styled studio near the Luxembourg Gardens.",
        price: 340,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
      },
      {
        id: 9,
        name: "Bastille Urban Hotel",
        rating: 4.4,
        location: "11th Arrondissement, Paris",
        description:
          "A vibrant, design-led hotel in the heart of the trendy Bastille neighbourhood.",
        price: 220,
        badge: { label: "Best Value", style: "bg-blue-500 text-white" },
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80",
      },
      {
        id: 10,
        name: "Opéra Prestige",
        rating: 4.7,
        location: "9th Arrondissement, Paris",
        description:
          "Grand Belle Époque interiors and a rooftop terrace overlooking the iconic Opéra Garnier.",
        price: 475,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
      },
      {
        id: 11,
        name: "Trocadéro Tower View",
        rating: 4.9,
        location: "16th Arrondissement, Paris",
        description:
          "Iconic Eiffel Tower views from every room. The most photographed hotel balcony in all of Paris.",
        price: 720,
        badge: { label: "Top Rated", style: "bg-amber-400 text-slate-900" },
        wishlisted: true,
        image:
          "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&q=80",
      },
      {
        id: 12,
        name: "Pigalle Boutique Inn",
        rating: 4.3,
        location: "18th Arrondissement, Paris",
        description:
          "Artsy and eclectic, this boutique inn sits in the creative heart of Pigalle.",
        price: 195,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&q=80",
      },
      {
        id: 13,
        name: "Invalides Heritage House",
        rating: 4.6,
        location: "7th Arrondissement, Paris",
        description:
          "A refined retreat steps from the golden dome of Les Invalides, perfect for history lovers.",
        price: 430,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80",
      },
      {
        id: 14,
        name: "République Modern Stay",
        rating: 4.5,
        location: "3rd Arrondissement, Paris",
        description:
          "A sleek, contemporary hotel for the design-conscious traveller seeking a central Paris base.",
        price: 295,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=500&q=80",
      },
      {
        id: 15,
        name: "Île Saint-Louis Retreat",
        rating: 4.8,
        location: "4th Arrondissement, Paris",
        description:
          "A hidden gem on the tranquil Île Saint-Louis, surrounded by the Seine on all sides.",
        price: 560,
        badge: { label: "Hidden Gem", style: "bg-purple-500 text-white" },
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=500&q=80",
      },
      {
        id: 16,
        name: "Bois de Boulogne Lodge",
        rating: 4.4,
        location: "16th Arrondissement, Paris",
        description:
          "A peaceful forest-adjacent retreat for those who want nature and city in perfect balance.",
        price: 265,
        badge: null,
        wishlisted: false,
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80",
      },
    ]);

    return {
      hotels,
    };
  },
};

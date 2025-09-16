// Données des profils de colocataires et d'appartements
const profiles = [
    {
        id: 1,
        type: 'coloc', // Profil de colocataire
        name: 'Sophie',
        age: 24,
        location: 'Paris, 11ème',
        images: [
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg'
        ],
        budget: '500 - 700€',
        availability: 'Dès maintenant',
        compatibility: 92,
        description: "Bonjour ! Je suis Sophie, étudiante en dernière année de master en design graphique. Je cherche une colocation sympa dans Paris. J'aime cuisiner, les soirées films et les expos. Je suis calme en semaine mais j'aime aussi sortir le weekend. Je m'adapte facilement et j'ai déjà vécu en coloc pendant 3 ans !",
        preferences: ['Calme', 'Créative', 'Non-fumeuse', 'Chat friendly', 'Quartier vivant'],
        housing: 'Cherche un appartement'
    },
    {
        id: 2,
        type: 'appart', // Profil d'appartement
        name: 'Appartement lumineux',
        location: 'Lyon, Croix-Rousse',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
        ],
        budget: '450€/mois/pers',
        availability: 'À partir du 1er juillet',
        compatibility: 87,
        description: "Magnifique T4 de 85m² dans le quartier de la Croix-Rousse à Lyon. Recherche 2 nouveaux colocataires pour rejoindre Maxime (28 ans, ingénieur). Appartement entièrement meublé avec cuisine équipée et grand salon. Chaque chambre fait environ 12m². Charges comprises (eau, électricité, internet fibre).",
        preferences: ['Étudiant ou jeune actif', 'Non-fumeur', 'Ambiance conviviale', 'Respect des espaces communs'],
        housing: 'T4 de 85m²'
    },
    {
        id: 3,
        type: 'coloc', 
        name: 'Thomas',
        age: 26,
        location: 'Bordeaux, Centre',
        images: [
            'confident-man-standing-nature-smiling-camera-generated-by-artificial-intelligence.jpg',
            'confident-man-standing-nature-smiling-camera-generated-by-artificial-intelligence.jpg'
        ],
        budget: '600 - 800€',
        availability: 'Dans 2 mois',
        compatibility: 78,
        description: "Salut ! Je m'appelle Thomas, je suis développeur web en freelance et je cherche une colocation dans le centre de Bordeaux. J'aime faire du vélo, jouer aux jeux vidéo et sortir boire des verres avec des amis. Je suis quelqu'un de sociable mais qui respecte l'intimité des autres. Je cherche une coloc avec une bonne ambiance !",
        preferences: ['Sociable', 'Sportif', 'Geek', 'Sorties', 'Propre'],
        housing: 'Cherche une chambre'
    },
    {
        id: 4,
        type: 'appart',
        name: 'Duplex moderne',
        location: 'Montpellier, Beaux-Arts',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        ],
        budget: '550€/mois/pers',
        availability: 'Dès maintenant',
        compatibility: 94,
        description: "Superbe duplex de 110m² dans le quartier des Beaux-Arts à Montpellier. Une chambre se libère dans cette colocation de 3 personnes. Vous rejoindrez Julie (25 ans, architecte) et Marc (27 ans, prof de yoga). Chambre de 15m² avec salle de bain privative. Terrasse de 20m² avec barbecue, idéale pour les soirées d'été !",
        preferences: ['Entre 23 et 30 ans', 'Ambiance détendue', 'Participation aux repas communs', 'Écolo'],
        housing: 'Duplex 110m²'
    },
    {
        id: 5,
        type: 'coloc',
        name: 'Alex',
        age: 23,
        location: 'Nantes, Centre',
        images: [
            'teenager-having-fun-with-friends.jpg',
            'teenager-having-fun-with-friends.jpg'
        ],
        budget: '400 - 600€',
        availability: 'Dès maintenant',
        compatibility: 85,
        description: "Étudiant en master de droit à Nantes, je cherche une colocation proche de l'université. Je suis quelqu'un de dynamique, j'aime faire du sport, sortir avec des amis mais aussi me poser tranquillement avec un bon film. Je suis organisé, propre et je respecte la vie en communauté. J'ai déjà vécu en colocation pendant 2 ans.",
        preferences: ['Étudiant', 'Dynamique', 'Organisé', 'Proche université', 'Pet friendly'],
        housing: 'Cherche colocation'
    },
    {
        id: 6,
        type: 'appart',
        name: 'Loft industriel',
        location: 'Paris, 20ème',
        images: [
            'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        ],
        budget: '700€/mois/pers',
        availability: 'Dans 1 mois',
        compatibility: 89,
        description: "Ancien atelier réhabilité en loft de 120m² dans le 20ème arrondissement de Paris. 2 chambres se libèrent dans cette colocation de 4 personnes. Espace atypique avec poutres apparentes, grande hauteur sous plafond et baies vitrées. Cuisine ouverte entièrement équipée, espace de coworking et petit jardin commun.",
        preferences: ['Créatif', 'Ouvert d\'esprit', 'Respectueux', 'Bonne entente', 'Pas de fêtards'],
        housing: 'Loft 120m²'
    },
    {
        id: 7,
        type: 'coloc',
        name: 'Emma',
        age: 25,
        location: 'Toulouse, Carmes',
        images: [
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg'
        ],
        budget: '500 - 650€',
        availability: 'Dans 3 semaines',
        compatibility: 91,
        description: "Bonjour ! Je suis Emma, jeune ingénieure en aéronautique à Toulouse. Je suis à la recherche d'une colocation sympa dans le centre. J'aime cuisiner, faire du yoga et les randonnées le weekend. Je suis quelqu'un de calme, organisée et sociable. J'ai vécu en colocation pendant mes études et j'ai adoré l'expérience !",
        preferences: ['Calme', 'Sportive', 'Gourmande', 'Voyages', 'Cinéphile'],
        housing: 'Cherche chambre en coloc'
    },
    {
        id: 8,
        type: 'appart',
        name: 'Maison avec jardin',
        location: 'Lille, Vieux-Lille',
        images: [
            'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2UlMjB3aXRoJTIwZ2FyZGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        ],
        budget: '480€/mois/pers',
        availability: 'Dès maintenant',
        compatibility: 82,
        description: "Grande maison de ville de 140m² dans le Vieux-Lille avec jardin. Recherche 1 coloc pour rejoindre Lucas et Chloé (28 ans). Maison sur 3 niveaux avec cuisine équipée, grand salon, 2 salles de bain et buanderie. Chambre meublée de 14m² au 1er étage. Colocation conviviale avec repas partagés et bonne ambiance !",
        preferences: ['25-35 ans', 'CDI ou fonctionnaire', 'Bonne entente', 'Participation vie commune'],
        housing: 'Maison 140m²'
    }
];

// Fonction pour filtrer les profils selon le type d'utilisateur
function getFilteredProfiles(userType) {
    // 'seeker' = chercheur de logement (voit des appartements)
    // 'owner' = propriétaire (voit des colocataires)
    // Peut être étendu avec d'autres types selon les besoins
    
    if (userType === 'seeker') {
        // Un chercheur voit uniquement des appartements
        return profiles.filter(profile => profile.type === 'appart');
    } else if (userType === 'owner') {
        // Un propriétaire voit uniquement des colocataires
        return profiles.filter(profile => profile.type === 'coloc');
    }
    
    // Par défaut, retourner tous les profils
    return profiles;
}

// Données de l'utilisateur actuel
const currentUser = {
    id: 999,
    name: 'Vous',
    image: 'profile-picture.png',
    preferences: {
        budget: {
            min: 400,
            max: 750
        },
        location: ['Paris', 'Lyon', 'Bordeaux'],
        type: ['Appartement', 'Maison', 'Studio']
    }
};

// Données des messages
const messages = [
    {
        id: 1,
        profileId: 1,
        profileName: 'Sophie',
        profileImage: 'beautiful-woman-street.jpg',
        lastMessage: 'Salut ! Ton profil m\'intéresse, je cherche aussi un appart dans le 11ème.',
        timestamp: 'Il y a 1h',
        unread: true
    },
    {
        id: 2,
        profileId: 3,
        profileName: 'Thomas',
        profileImage: 'confident-man-standing-nature-smiling-camera-generated-by-artificial-intelligence.jpg',
        lastMessage: 'Super ! J\'ai une visite prévue jeudi, ça te dirait de venir ?',
        timestamp: 'Hier',
        unread: true
    },
    {
        id: 3,
        profileId: 5,
        profileName: 'Alex',
        profileImage: 'teenager-having-fun-with-friends.jpg',
        lastMessage: 'Merci pour les infos sur la coloc, j\'ai hâte d\'en discuter avec les autres !',
        timestamp: 'Mar 15 mai',
        unread: false
    }
];

// Données des favoris
const favorites = [2, 4, 7]; 
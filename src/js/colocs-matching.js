// Données des colocataires potentiels qui ont liké le même appartement
const potentialRoommates = [
    {
        id: 1,
        name: 'Sophie',
        age: 24,
        occupation: 'Étudiante en design',
        location: 'Paris, 11ème',
        images: [
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg'
        ],
        compatibility: 92,
        description: "Bonjour ! Je suis Sophie, étudiante en dernière année de master en design graphique. Je cherche une colocation sympa dans Paris. J'aime cuisiner, les soirées films et les expos. Je suis calme en semaine mais j'aime aussi sortir le weekend. Je m'adapte facilement et j'ai déjà vécu en coloc pendant 3 ans !",
        preferences: ['Calme', 'Créative', 'Non-fumeuse', 'Chat friendly', 'Quartier vivant'],
        budget: '500 - 700€'
    },
    {
        id: 3,
        name: 'Thomas',
        age: 26,
        occupation: 'Développeur web',
        location: 'Bordeaux, Centre',
        images: [
            '360_F_11308914_K0fbiJgfgk3XoDS9pLFxWUJTJK1UzZqA.jpg',
            '360_F_11308914_K0fbiJgfgk3XoDS9pLFxWUJTJK1UzZqA.jpg'
        ],
        compatibility: 78,
        description: "Salut ! Je m'appelle Thomas, je suis développeur web en freelance et je cherche une colocation dans le centre de Bordeaux. J'aime faire du vélo, jouer aux jeux vidéo et sortir boire des verres avec des amis. Je suis quelqu'un de sociable mais qui respecte l'intimité des autres. Je cherche une coloc avec une bonne ambiance !",
        preferences: ['Sociable', 'Sportif', 'Geek', 'Sorties', 'Propre'],
        budget: '600 - 800€'
    },
    {
        id: 5,
        name: 'Alex',
        age: 23,
        occupation: 'Étudiant en droit',
        location: 'Nantes, Centre',
        images: [
            'teenager-having-fun-with-friends.jpg',
            'teenager-having-fun-with-friends.jpg'
        ],
        compatibility: 85,
        description: "Étudiant en master de droit à Nantes, je cherche une colocation proche de l'université. Je suis quelqu'un de dynamique, j'aime faire du sport, sortir avec des amis mais aussi me poser tranquillement avec un bon film. Je suis organisé, propre et je respecte la vie en communauté. J'ai déjà vécu en colocation pendant 2 ans.",
        preferences: ['Étudiant', 'Dynamique', 'Organisé', 'Proche université', 'Pet friendly'],
        budget: '400 - 600€'
    },
    {
        id: 7,
        name: 'Emma',
        age: 25,
        occupation: 'Ingénieure en aéronautique',
        location: 'Toulouse, Carmes',
        images: [
            'beautiful-woman-street.jpg',
            'beautiful-woman-street.jpg'
        ],
        compatibility: 91,
        description: "Bonjour ! Je suis Emma, jeune ingénieure en aéronautique à Toulouse. Je suis à la recherche d'une colocation sympa dans le centre. J'aime cuisiner, faire du yoga et les randonnées le weekend. Je suis quelqu'un de calme, organisée et sociable. J'ai vécu en colocation pendant mes études et j'ai adoré l'expérience !",
        preferences: ['Calme', 'Sportive', 'Gourmande', 'Voyages', 'Cinéphile'],
        budget: '500 - 650€'
    },
    {
        id: 9,
        name: 'Lucas',
        age: 27,
        occupation: 'Architecte',
        location: 'Lyon, Croix-Rousse',
        images: [
            '360_F_11308914_K0fbiJgfgk3XoDS9pLFxWUJTJK1UzZqA.jpg',
            '360_F_11308914_K0fbiJgfgk3XoDS9pLFxWUJTJK1UzZqA.jpg'
        ],
        compatibility: 88,
        description: "Architecte passionné, je cherche une colocation dans le quartier de la Croix-Rousse à Lyon. Je suis quelqu'un de créatif, ouvert d'esprit et très sociable. J'apprécie l'art, la musique et les sorties culturelles. Je suis respectueux, organisé et j'aime cuisiner pour mes amis. Idéalement, je recherche une ambiance conviviale et dynamique.",
        preferences: ['Créatif', 'Sociable', 'Culture', 'Cuisine', 'Musique'],
        budget: '500 - 800€'
    }
];

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentIndex = 0;
    let currentDetailIndex = 0;
    let likedRoommates = [];
    let dislikedRoommates = [];
    let selectedApartment = null;
    let selectedApartmentData = null;
    
    // Récupérer l'ID de l'appartement sélectionné depuis localStorage
    const selectedApartmentId = parseInt(localStorage.getItem('selectedApartment'));
    
    // Récupérer les données de l'appartement sélectionné
    if (selectedApartmentId) {
        // Trouver l'appartement dans les profils
        selectedApartmentData = profiles.find(profile => profile.id === selectedApartmentId && profile.type === 'appart');
    }
    
    // Si pas d'appartement sélectionné, rediriger vers la page principale
    if (!selectedApartmentData) {
        // Rediriger vers la page principale si aucun appartement n'est sélectionné
        // window.location.href = 'index.html';
        // Pour éviter de potentielles redirections infinies, nous utilisons juste un avertissement pour l'exemple
        console.warn('Aucun appartement sélectionné');
    }
    
    // Filtrer les colocataires potentiels en fonction de l'appartement sélectionné
    // Dans une vraie application, cette logique serait basée sur des critères de compatibilité
    // Pour cet exemple, nous utilisons une logique simplifiée
    const filteredRoommates = potentialRoommates.filter(roommate => {
        // Vérifier si le budget du colocataire correspond à celui de l'appartement
        if (selectedApartmentData) {
            // Extraire le prix de l'appartement du format "450€/mois/pers"
            const apartmentPrice = parseInt(selectedApartmentData.budget.match(/\d+/)[0]);
            
            // Extraire la fourchette de budget du colocataire (format "500 - 700€")
            const budgetRange = roommate.budget.match(/\d+/g);
            const minBudget = parseInt(budgetRange[0]);
            const maxBudget = parseInt(budgetRange[1] || minBudget);
            
            // Vérifier si le prix de l'appartement est dans la fourchette de budget du colocataire
            return apartmentPrice >= minBudget && apartmentPrice <= maxBudget;
        }
        
        // Si pas d'appartement sélectionné, retourner tous les colocataires
        return true;
    });

    // Éléments DOM
    const cardStack = document.getElementById('cardStack');
    const likeBtn = document.getElementById('likeBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const infoBtn = document.getElementById('infoBtn');
    const backBtn = document.getElementById('backBtn');
    const likeOverlay = document.getElementById('likeOverlay');
    const nopeOverlay = document.getElementById('nopeOverlay');
    const emptyState = document.getElementById('emptyState');
    
    // Modaux
    const matchModal = document.getElementById('matchModal');
    const matchName = document.getElementById('matchName');
    const matchImg = document.getElementById('matchImg');
    const userImg = document.getElementById('userImg');
    const keepSwipingBtn = document.getElementById('keepSwipingBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    const detailModal = document.getElementById('detailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const imageSlider = document.getElementById('imageSlider');
    const sliderDots = document.getElementById('sliderDots');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const detailName = document.getElementById('detailName');
    const detailOccupation = document.getElementById('detailOccupation');
    const detailLocation = document.getElementById('detailLocation');
    const compatibilityMeter = document.getElementById('compatibilityMeter');
    const compatibilityValue = document.getElementById('compatibilityValue');
    const detailDescription = document.getElementById('detailDescription');
    const detailPreferences = document.getElementById('detailPreferences');
    const detailLikeBtn = document.getElementById('detailLikeBtn');
    const detailRejectBtn = document.getElementById('detailRejectBtn');
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    
    // Initialisation
    updateApartmentInfo();
    initCards();
    addEventListeners();
    
    // Fonction pour mettre à jour les informations de l'appartement
    function updateApartmentInfo() {
        if (selectedApartmentData) {
            // Mettre à jour les informations de l'appartement dans l'interface
            const apartmentImage = document.querySelector('.apartment-image img');
            const apartmentTitle = document.querySelector('.apartment-details h1');
            const apartmentLocation = document.querySelector('.apartment-details .location');
            const apartmentDescription = document.querySelector('.apartment-description p');
            const apartmentFavoriteBtn = document.getElementById('apartmentFavoriteBtn');
            
            // Mettre à jour les détails spécifiques (taille, prix, etc.)
            const infoTags = document.querySelectorAll('.info-tag');
            
            // Mettre à jour l'image
            if (apartmentImage) {
                apartmentImage.src = selectedApartmentData.images[0];
                apartmentImage.alt = selectedApartmentData.name;
            }
            
            // Mettre à jour le titre
            if (apartmentTitle) {
                apartmentTitle.textContent = selectedApartmentData.name;
            }
            
            // Mettre à jour l'emplacement
            if (apartmentLocation) {
                apartmentLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${selectedApartmentData.location}`;
            }
            
            // Mettre à jour la description
            if (apartmentDescription) {
                apartmentDescription.textContent = selectedApartmentData.description;
            }
            
            // Mettre à jour le bouton de favoris
            if (apartmentFavoriteBtn) {
                // Vérifier si l'appartement est dans les favoris
                const storedFavorites = localStorage.getItem('favorites');
                const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
                
                // S'assurer que le bouton affiche l'état correct
                if (favorites.includes(selectedApartmentData.id)) {
                    apartmentFavoriteBtn.classList.add('active');
                    apartmentFavoriteBtn.querySelector('i').className = 'fas fa-star';
                } else {
                    apartmentFavoriteBtn.classList.remove('active');
                    apartmentFavoriteBtn.querySelector('i').className = 'far fa-star';
                }
                
                // Ajouter l'écouteur d'événement pour le toggle des favoris
                apartmentFavoriteBtn.addEventListener('click', function() {
                    toggleApartmentFavorite(selectedApartmentData.id, this);
                });
            }
            
            // Mettre à jour les tags d'information
            if (infoTags && infoTags.length >= 3) {
                // Premier tag: type de logement
                infoTags[0].innerHTML = `
                    <i class="fas fa-home"></i>
                    ${selectedApartmentData.housing}
                `;
                
                // Deuxième tag: budget
                infoTags[1].innerHTML = `
                    <i class="fas fa-euro-sign"></i>
                    ${selectedApartmentData.budget}
                `;
                
                // Troisième tag: places disponibles
                // Extraire le nombre de places disponibles de l'objet
                const places = selectedApartmentData.housing.includes('T') ? 
                    parseInt(selectedApartmentData.housing.match(/T(\d+)/)[1]) - 1 : 
                    2; // Valeur par défaut
                
                infoTags[2].innerHTML = `
                    <i class="fas fa-user"></i>
                    ${places} places dispo
                `;
            }
        }
    }
    
    // Fonction pour basculer l'état de favori de l'appartement
    function toggleApartmentFavorite(apartmentId, button) {
        // Récupérer les favoris existants
        const storedFavorites = localStorage.getItem('favorites');
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Vérifier si l'appartement est déjà en favoris
        const index = favorites.indexOf(apartmentId);
        
        if (index === -1) {
            // Ajouter aux favoris
            favorites.push(apartmentId);
            button.innerHTML = '<i class="fas fa-star"></i>';
            button.classList.add('active');
        } else {
            // Retirer des favoris
            favorites.splice(index, 1);
            button.innerHTML = '<i class="far fa-star"></i>';
            button.classList.remove('active');
        }
        
        // Mettre à jour localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    // Fonctions principales
    function initCards() {
        // Vider le stack
        cardStack.innerHTML = '';
        
        // Vérifier s'il y a des colocataires filtrés
        if (filteredRoommates.length === 0) {
            // Afficher l'état vide immédiatement
            emptyState.classList.remove('hidden');
            return;
        }
        
        // Ajouter les cartes pour les colocataires filtrés
        filteredRoommates.forEach((roommate, index) => {
            const card = createCard(roommate, index);
            cardStack.appendChild(card);
        });
        
        // Mettre à jour les z-index
        updateCardsZIndex();
    }
    
    function createCard(roommate, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = roommate.id;
        card.dataset.index = index;
        
        // Tags de préférences (limités à 3 pour l'affichage)
        const tags = roommate.preferences.slice(0, 3).map(pref => 
            `<span class="card-tag">${pref}</span>`
        ).join('');
        
        // Contenu HTML de la carte
        card.innerHTML = `
            <img src="${roommate.images[0]}" alt="${roommate.name}" class="card-image">
            <button class="favorite-btn" data-id="${roommate.id}">
                <i class="far fa-star"></i>
            </button>
            <div class="card-info">
                <div class="card-header">
                    <div class="name-location">
                        <h3 class="card-name">${roommate.name}, ${roommate.age} ans</h3>
                        <p class="card-occupation">${roommate.occupation}</p>
                        <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${roommate.location}</p>
                    </div>
                    <div class="compatibility">${roommate.compatibility}%</div>
                </div>
                <div class="card-details">
                    ${tags}
                </div>
            </div>
        `;
        
        // Initialiser le bouton de favoris
        initFavoriteButton(card.querySelector('.favorite-btn'));
        
        // Ajouter la fonctionnalité de swipe
        enableSwipe(card);
        
        return card;
    }
    
    // Initialiser le bouton de favoris
    function initFavoriteButton(button) {
        // Vérifier si ce profil est déjà en favoris
        const profileId = parseInt(button.dataset.id);
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Mettre à jour l'apparence du bouton
        if (favorites.includes(profileId)) {
            button.innerHTML = '<i class="fas fa-star"></i>';
            button.classList.add('active');
        } else {
            button.innerHTML = '<i class="far fa-star"></i>';
            button.classList.remove('active');
        }
        
        // Ajouter l'écouteur d'événement
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher le swipe lors du clic sur le bouton
            toggleFavorite(profileId, this);
        });
    }
    
    // Basculer l'état de favori
    function toggleFavorite(profileId, button) {
        // Récupérer les favoris existants
        const storedFavorites = localStorage.getItem('favorites');
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Vérifier si le profil est déjà en favoris
        const index = favorites.indexOf(profileId);
        
        if (index === -1) {
            // Ajouter aux favoris
            favorites.push(profileId);
            button.innerHTML = '<i class="fas fa-star"></i>';
            button.classList.add('active');
        } else {
            // Retirer des favoris
            favorites.splice(index, 1);
            button.innerHTML = '<i class="far fa-star"></i>';
            button.classList.remove('active');
        }
        
        // Mettre à jour localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    function enableSwipe(card) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        // Gestion tactile
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchmove', handleTouchMove);
        card.addEventListener('touchend', handleTouchEnd);
        
        // Gestion souris
        card.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        function handleTouchStart(e) {
            if (parseInt(card.dataset.index) !== currentIndex) return;
            startX = e.touches[0].clientX;
            isDragging = true;
            card.style.transition = 'none';
        }
        
        function handleTouchMove(e) {
            if (!isDragging || parseInt(card.dataset.index) !== currentIndex) return;
            
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const rotate = diffX * 0.1;
            
            card.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
            
            // Afficher l'overlay approprié
            updateOverlays(diffX);
        }
        
        function handleTouchEnd() {
            if (!isDragging || parseInt(card.dataset.index) !== currentIndex) return;
            
            isDragging = false;
            const diffX = currentX - startX;
            
            handleSwipeEnd(diffX);
        }
        
        function handleMouseDown(e) {
            if (parseInt(card.dataset.index) !== currentIndex) return;
            startX = e.clientX;
            isDragging = true;
            card.style.transition = 'none';
        }
        
        function handleMouseMove(e) {
            if (!isDragging || parseInt(card.dataset.index) !== currentIndex) return;
            
            currentX = e.clientX;
            const diffX = currentX - startX;
            const rotate = diffX * 0.1;
            
            card.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
            
            // Afficher l'overlay approprié
            updateOverlays(diffX);
        }
        
        function handleMouseUp() {
            if (!isDragging || parseInt(card.dataset.index) !== currentIndex) return;
            
            isDragging = false;
            const diffX = currentX - startX;
            
            handleSwipeEnd(diffX);
        }
        
        function handleSwipeEnd(diffX) {
            if (diffX > 100) {
                // Swipe à droite (like)
                likeCurrentRoommate();
            } else if (diffX < -100) {
                // Swipe à gauche (reject)
                rejectCurrentRoommate();
            } else {
                // Réinitialiser la position
                resetCardPosition();
            }
            
            // Masquer les overlays
            likeOverlay.style.opacity = 0;
            nopeOverlay.style.opacity = 0;
        }
    }
    
    function updateOverlays(diffX) {
        if (diffX > 50) {
            likeOverlay.style.opacity = Math.min(diffX / 100, 1);
            nopeOverlay.style.opacity = 0;
        } else if (diffX < -50) {
            nopeOverlay.style.opacity = Math.min(Math.abs(diffX) / 100, 1);
            likeOverlay.style.opacity = 0;
        } else {
            likeOverlay.style.opacity = 0;
            nopeOverlay.style.opacity = 0;
        }
    }
    
    function resetCardPosition() {
        const currentCard = document.querySelector(`.card[data-index="${currentIndex}"]`);
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = '';
    }
    
    function updateCardsZIndex() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            const zIndex = cards.length - index;
            card.style.zIndex = zIndex;
        });
    }
    
    function likeCurrentRoommate() {
        const currentCard = document.querySelector(`.card[data-index="${currentIndex}"]`);
        currentCard.classList.add('swiped-right');
        
        const roommateId = parseInt(currentCard.dataset.id);
        likedRoommates.push(roommateId);
        
        // Pour tous les colocataires, on montre toujours un match
        setTimeout(() => {
            showMatchModal(potentialRoommates[currentIndex]);
        }, 300);
    }
    
    function rejectCurrentRoommate() {
        const currentCard = document.querySelector(`.card[data-index="${currentIndex}"]`);
        currentCard.classList.add('swiped-left');
        
        const roommateId = parseInt(currentCard.dataset.id);
        dislikedRoommates.push(roommateId);
        
        setTimeout(() => {
            nextRoommate();
        }, 300);
    }
    
    function nextRoommate() {
        currentIndex++;
        
        if (currentIndex >= potentialRoommates.length) {
            // Plus de colocataires à afficher
            emptyState.classList.remove('hidden');
            return;
        }
        
        // Mettre à jour les z-index (optionnel mais peut améliorer l'animation)
        updateCardsZIndex();
    }
    
    function showMatchModal(roommate) {
        matchName.textContent = roommate.name;
        matchImg.src = roommate.images[0];
        
        // Vérifier si les informations de l'appartement sont disponibles
        if (selectedApartmentData) {
            // Mettre à jour le badge de l'appartement dans le modal de match
            const matchApartment = document.querySelector('.apartment-badge span');
            if (matchApartment) {
                matchApartment.textContent = `${selectedApartmentData.name} - ${selectedApartmentData.location}`;
            }
        }
        
        matchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function showDetailModal(index) {
        const roommate = potentialRoommates[index];
        currentDetailIndex = index;
        
        // Mettre à jour les détails
        detailName.textContent = `${roommate.name}, ${roommate.age} ans`;
        detailOccupation.textContent = roommate.occupation;
        detailLocation.textContent = roommate.location;
        detailDescription.textContent = roommate.description;
        
        // Mettre à jour la compatibilité
        compatibilityMeter.style.width = `${roommate.compatibility}%`;
        compatibilityValue.textContent = `${roommate.compatibility}%`;
        
        // Mettre à jour les préférences
        detailPreferences.innerHTML = '';
        roommate.preferences.forEach(pref => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.textContent = pref;
            detailPreferences.appendChild(tag);
        });
        
        // Mettre à jour le slider d'images
        updateImageSlider(roommate.images);
        
        // Afficher le modal
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateImageSlider(images) {
        // Vider le slider
        imageSlider.innerHTML = '';
        sliderDots.innerHTML = '';
        
        // Ajouter les images
        images.forEach((image, idx) => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Photo ${idx + 1}`;
            img.className = 'slider-image' + (idx === 0 ? ' active' : '');
            imageSlider.appendChild(img);
            
            // Ajouter un point de navigation
            const dot = document.createElement('div');
            dot.className = 'dot' + (idx === 0 ? ' active' : '');
            dot.dataset.index = idx;
            dot.addEventListener('click', () => showSliderImage(idx));
            sliderDots.appendChild(dot);
        });
    }
    
    function showSliderImage(index) {
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function prevSliderImage() {
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        let activeIndex = 0;
        
        dots.forEach((dot, idx) => {
            if (dot.classList.contains('active')) {
                activeIndex = idx;
            }
        });
        
        const newIndex = (activeIndex - 1 + images.length) % images.length;
        showSliderImage(newIndex);
    }
    
    function nextSliderImage() {
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        let activeIndex = 0;
        
        dots.forEach((dot, idx) => {
            if (dot.classList.contains('active')) {
                activeIndex = idx;
            }
        });
        
        const newIndex = (activeIndex + 1) % images.length;
        showSliderImage(newIndex);
    }
    
    // Ajout des écouteurs d'événements
    function addEventListeners() {
        // Boutons de swipe
        likeBtn.addEventListener('click', likeCurrentRoommate);
        rejectBtn.addEventListener('click', rejectCurrentRoommate);
        infoBtn.addEventListener('click', () => showDetailModal(currentIndex));
        
        // Bouton retour
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
        
        // Modal match
        keepSwipingBtn.addEventListener('click', () => {
            matchModal.classList.remove('active');
            document.body.style.overflow = '';
            nextRoommate();
        });
        
        sendMessageBtn.addEventListener('click', () => {
            matchModal.classList.remove('active');
            document.body.style.overflow = '';
            // Rediriger vers la messagerie
            window.location.href = 'messages.html';
        });
        
        // Modal détail
        closeDetailBtn.addEventListener('click', () => {
            detailModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        prevImageBtn.addEventListener('click', prevSliderImage);
        nextImageBtn.addEventListener('click', nextSliderImage);
        
        detailLikeBtn.addEventListener('click', () => {
            detailModal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (currentDetailIndex === currentIndex) {
                likeCurrentRoommate();
            } else {
                console.log(`Like du colocataire #${currentDetailIndex}`);
            }
        });
        
        detailRejectBtn.addEventListener('click', () => {
            detailModal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (currentDetailIndex === currentIndex) {
                rejectCurrentRoommate();
            } else {
                console.log(`Rejet du colocataire #${currentDetailIndex}`);
            }
        });
        
        // Navigation
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');
                
                // Rediriger vers l'onglet approprié
                if (tab === 'swipe') {
                    window.location.href = 'index.html';
                } else if (tab === 'messages') {
                    window.location.href = 'messages.html';
                } else if (tab === 'profile') {
                    console.log('Redirection vers le profil');
                }
            });
        });
        
        // Voir les matches
        document.getElementById('viewMatchesBtn').addEventListener('click', () => {
            console.log('Redirection vers la page des matches');
        });
    }
}); 
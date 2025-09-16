// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentProfileIndex = 0;
    let currentDetailIndex = 0;
    let likedProfiles = [];
    let dislikedProfiles = [];
    let lastAction = null;

    // Éléments DOM
    const cardStack = document.getElementById('cardStack');
    const filterBtn = document.getElementById('filterBtn');
    const profileBtn = document.getElementById('profileBtn');
    const likeBtn = document.getElementById('likeBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const infoBtn = document.getElementById('infoBtn');
    const messagesBadge = document.getElementById('messagesBadge');
    
    // Modaux
    const filterModal = document.getElementById('filterModal');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    
    const matchModal = document.getElementById('matchModal');
    const matchName = document.getElementById('matchName');
    const userImg = document.getElementById('userImg');
    const matchImg = document.getElementById('matchImg');
    const keepSwipingBtn = document.getElementById('keepSwipingBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    const detailModal = document.getElementById('detailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const imageSlider = document.getElementById('imageSlider');
    const sliderDots = document.getElementById('sliderDots');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const detailName = document.getElementById('detailName');
    const detailLocation = document.getElementById('detailLocation');
    const detailType = document.getElementById('detailType');
    const detailBudget = document.getElementById('detailBudget');
    const detailAvailability = document.getElementById('detailAvailability');
    const detailDescription = document.getElementById('detailDescription');
    const detailPreferences = document.getElementById('detailPreferences');
    const detailLikeBtn = document.getElementById('detailLikeBtn');
    const detailRejectBtn = document.getElementById('detailRejectBtn');
    
    // Navigation du bas
    const navItems = document.querySelectorAll('.nav-item');
    
    // Initialisation
    initApp();
    
    // Fonctions principales
    function initApp() {
        // Mettre à jour le badge des messages
        updateMessagesBadge();
        
        // Charger les profils et créer les cartes
        loadProfiles();
        
        // Ajouter les écouteurs d'événements
        addEventListeners();
        
        // Slider du budget
        initRangeSliders();
    }
    
    function loadProfiles() {
        // Réinitialiser le stack de cartes
        cardStack.innerHTML = '';
        
        // Récupérer le type d'utilisateur depuis localStorage
        const userType = localStorage.getItem('userType') || 'seeker';
        
        // Obtenir les profils filtrés selon le type d'utilisateur
        const filteredProfiles = getFilteredProfiles(userType);
        
        // Créer les cartes pour chaque profil
        filteredProfiles.forEach((profile, index) => {
            createCard(profile, index);
        });
        
        // Mettre à jour la carte visible
        updateVisibleCard();
    }
    
    function createCard(profile, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = profile.id;
        card.dataset.index = index;
        
        // Ajouter l'indicateur de swipe (like/nope)
        const likeIndicator = document.createElement('div');
        likeIndicator.className = 'swipe-indicator like';
        likeIndicator.textContent = 'LIKE';
        
        const nopeIndicator = document.createElement('div');
        nopeIndicator.className = 'swipe-indicator nope';
        nopeIndicator.textContent = 'NOPE';
        
        // Contenu de la carte
        let age = profile.age ? `, ${profile.age} ans` : '';
        let cardContent = `
            <img src="${profile.images[0]}" alt="${profile.name}" class="card-image">
            <div class="card-info">
                <div class="card-header">
                    <div class="name-location">
                        <h3 class="card-name">${profile.name}${age}</h3>
                        <p class="card-location">${profile.location}</p>
                    </div>
                    <div class="compatibility">${profile.compatibility}%</div>
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <i class="fas ${profile.type === 'coloc' ? 'fa-user' : 'fa-home'}"></i>
                        <span>${profile.housing}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-euro-sign"></i>
                        <span>${profile.budget}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${profile.availability}</span>
                    </div>
                </div>
            </div>
        `;
        
        card.innerHTML = cardContent;
        card.appendChild(likeIndicator);
        card.appendChild(nopeIndicator);
        
        // Ajouter la carte au stack
        cardStack.appendChild(card);
        
        // Ajouter les écouteurs d'événements de swipe
        initCardSwipe(card);
    }
    
    function updateVisibleCard() {
        // Masquer toutes les cartes
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            
            if (index === currentProfileIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    function initCardSwipe(card) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        // Événements tactiles pour mobile
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchmove', handleTouchMove);
        card.addEventListener('touchend', handleTouchEnd);
        
        // Événements souris pour desktop
        card.addEventListener('mousedown', handleMouseDown);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseup', handleMouseUp);
        
        function handleTouchStart(e) {
            if (!card.classList.contains('active')) return;
            startX = e.touches[0].clientX;
            isDragging = true;
            card.style.transition = 'none';
        }
        
        function handleTouchMove(e) {
            if (!isDragging || !card.classList.contains('active')) return;
            
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const rotate = diffX * 0.1;
            
            card.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
            
            // Changer l'opacité des indicateurs
            const likeIndicator = card.querySelector('.swipe-indicator.like');
            const nopeIndicator = card.querySelector('.swipe-indicator.nope');
            
            if (diffX > 50) {
                likeIndicator.style.display = 'block';
                likeIndicator.style.opacity = Math.min(diffX / 100, 1);
                nopeIndicator.style.display = 'none';
            } else if (diffX < -50) {
                nopeIndicator.style.display = 'block';
                nopeIndicator.style.opacity = Math.min(Math.abs(diffX) / 100, 1);
                likeIndicator.style.display = 'none';
            } else {
                likeIndicator.style.display = 'none';
                nopeIndicator.style.display = 'none';
            }
        }
        
        function handleTouchEnd(e) {
            if (!isDragging || !card.classList.contains('active')) return;
            
            isDragging = false;
            const diffX = currentX - startX;
            
            if (diffX > 100) {
                // Swipe à droite (like)
                likeCurrentProfile();
            } else if (diffX < -100) {
                // Swipe à gauche (reject)
                rejectCurrentProfile();
            } else {
                // Réinitialiser
                resetCardPosition(card);
            }
        }
        
        function handleMouseDown(e) {
            if (!card.classList.contains('active')) return;
            startX = e.clientX;
            isDragging = true;
            card.style.transition = 'none';
        }
        
        function handleMouseMove(e) {
            if (!isDragging || !card.classList.contains('active')) return;
            
            currentX = e.clientX;
            const diffX = currentX - startX;
            const rotate = diffX * 0.1;
            
            card.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
            
            // Changer l'opacité des indicateurs
            const likeIndicator = card.querySelector('.swipe-indicator.like');
            const nopeIndicator = card.querySelector('.swipe-indicator.nope');
            
            if (diffX > 50) {
                likeIndicator.style.display = 'block';
                likeIndicator.style.opacity = Math.min(diffX / 100, 1);
                nopeIndicator.style.display = 'none';
            } else if (diffX < -50) {
                nopeIndicator.style.display = 'block';
                nopeIndicator.style.opacity = Math.min(Math.abs(diffX) / 100, 1);
                likeIndicator.style.display = 'none';
            } else {
                likeIndicator.style.display = 'none';
                nopeIndicator.style.display = 'none';
            }
        }
        
        function handleMouseUp(e) {
            if (!isDragging) return;
            
            isDragging = false;
            const diffX = currentX - startX;
            
            if (diffX > 100) {
                // Swipe à droite (like)
                likeCurrentProfile();
            } else if (diffX < -100) {
                // Swipe à gauche (reject)
                rejectCurrentProfile();
            } else {
                // Réinitialiser
                resetCardPosition(card);
            }
        }
    }
    
    function resetCardPosition(card) {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = '';
        
        // Masquer les indicateurs
        const likeIndicator = card.querySelector('.swipe-indicator.like');
        const nopeIndicator = card.querySelector('.swipe-indicator.nope');
        likeIndicator.style.display = 'none';
        nopeIndicator.style.display = 'none';
    }
    
    function likeCurrentProfile() {
        const currentCard = document.querySelector(`.card[data-index="${currentProfileIndex}"]`);
        const profileId = parseInt(currentCard.dataset.id);
        const profile = profiles[currentProfileIndex];
        
        // Ajouter l'animation de swipe
        currentCard.classList.add('swiped-right');
        
        // Ajouter aux profils aimés
        likedProfiles.push(profileId);
        lastAction = 'like';
        
        // Si c'est un appartement, l'ajouter aux favoris automatiquement et rediriger
        if (profile.type === 'appart') {
            // Vérifier si l'appartement est déjà en favoris
            const storedFavorites = localStorage.getItem('favorites');
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            
            // Ajouter l'appartement aux favoris s'il n'y est pas déjà
            if (!favorites.includes(profileId)) {
                favorites.push(profileId);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                // Mettre à jour l'apparence du bouton favori si visible
                const favoriteBtn = currentCard.querySelector('.favorite-btn');
                if (favoriteBtn) {
                    favoriteBtn.innerHTML = '<i class="fas fa-star"></i>';
                    favoriteBtn.classList.add('active');
                }
            }
            
            // Stocker l'ID de l'appartement pour l'utiliser dans la page des colocataires
            localStorage.setItem('selectedApartment', profileId);
            
            // Rediriger vers la page des colocataires potentiels
            window.location.href = 'colocs-matching.html';
            return;
        }
        
        // Si c'est un colocataire, montrer le modal de match
        setTimeout(() => {
            // Pour les colocataires, toujours montrer un match
            showMatchModal(profile);
        }, 300);
    }
    
    function rejectCurrentProfile() {
        const currentCard = document.querySelector(`.card[data-index="${currentProfileIndex}"]`);
        const profileId = parseInt(currentCard.dataset.id);
        
        // Ajouter l'animation de swipe
        currentCard.classList.add('swiped-left');
        
        // Ajouter aux profils rejetés
        dislikedProfiles.push(profileId);
        lastAction = 'reject';
        
        // Passer au profil suivant
        setTimeout(nextProfile, 300);
    }
    
    function showMatchModal(profile) {
        // Mettre à jour les informations
        matchName.textContent = profile.name;
        matchImg.src = profile.images[0];
        userImg.src = currentUser.image;
        
        // Afficher le modal
        matchModal.classList.add('active');
    }
    
    function nextProfile() {
        currentProfileIndex++;
        
        // Vérifier si on a atteint la fin
        if (currentProfileIndex >= profiles.length) {
            // Recharger les profils ou afficher un message
            resetProfiles();
            return;
        }
        
        // Mettre à jour la carte visible
        updateVisibleCard();
    }
    
    function resetProfiles() {
        // Recharger les profils ou afficher un message de fin
        // Pour cet exemple, on recharge simplement
        currentProfileIndex = 0;
        loadProfiles();
    }
    
    function showDetailModal(index) {
        const profile = profiles[index];
        currentDetailIndex = index;
        
        // Mettre à jour les informations
        detailName.textContent = profile.type === 'coloc' ? `${profile.name}, ${profile.age} ans` : profile.name;
        detailLocation.textContent = profile.location;
        detailType.textContent = profile.housing;
        detailBudget.textContent = profile.budget;
        detailAvailability.textContent = profile.availability;
        detailDescription.textContent = profile.description;
        
        // Mettre à jour les préférences
        detailPreferences.innerHTML = '';
        profile.preferences.forEach(pref => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.textContent = pref;
            detailPreferences.appendChild(tag);
        });
        
        // Mettre à jour le slider d'images
        updateImageSlider(profile.images);
        
        // Afficher le modal
        detailModal.classList.add('active');
    }
    
    function updateImageSlider(images) {
        // Réinitialiser le slider
        imageSlider.innerHTML = '';
        sliderDots.innerHTML = '';
        
        // Ajouter les images
        images.forEach((img, index) => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.alt = 'Image ' + (index + 1);
            imgEl.className = 'slider-image' + (index === 0 ? ' active' : '');
            imageSlider.appendChild(imgEl);
            
            // Ajouter les points
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.dataset.index = index;
            sliderDots.appendChild(dot);
            
            // Ajouter l'événement de clic
            dot.addEventListener('click', () => {
                showSliderImage(index);
            });
        });
    }
    
    function showSliderImage(index) {
        // Masquer toutes les images
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Afficher l'image sélectionnée
        images[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSliderImage() {
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        let activeIndex = 0;
        
        // Trouver l'index actif
        dots.forEach((dot, index) => {
            if (dot.classList.contains('active')) {
                activeIndex = index;
            }
        });
        
        // Calculer le nouvel index
        const nextIndex = (activeIndex + 1) % images.length;
        
        // Afficher la nouvelle image
        showSliderImage(nextIndex);
    }
    
    function prevSliderImage() {
        const images = imageSlider.querySelectorAll('.slider-image');
        const dots = sliderDots.querySelectorAll('.dot');
        let activeIndex = 0;
        
        // Trouver l'index actif
        dots.forEach((dot, index) => {
            if (dot.classList.contains('active')) {
                activeIndex = index;
            }
        });
        
        // Calculer le nouvel index
        const prevIndex = (activeIndex - 1 + images.length) % images.length;
        
        // Afficher la nouvelle image
        showSliderImage(prevIndex);
    }
    
    function updateMessagesBadge() {
        let unreadCount = 0;
        
        // Compter les messages non lus
        messages.forEach(msg => {
            if (msg.unread) unreadCount++;
        });
        
        // Mettre à jour le badge
        if (unreadCount > 0) {
            messagesBadge.textContent = unreadCount;
            messagesBadge.style.display = 'flex';
        } else {
            messagesBadge.style.display = 'none';
        }
    }

    function initRangeSliders() {
        // Récupérer le type d'utilisateur depuis localStorage
        const userType = localStorage.getItem('userType') || 'seeker';
        
        // Adapter le titre du filtre selon le type d'utilisateur
        const filterTitles = document.querySelectorAll('.filter-section h3');
        if (filterTitles && filterTitles.length > 0) {
            // Modifier le titre du filtre de préférences
            if (filterTitles[3]) {
                if (userType === 'seeker') {
                    filterTitles[3].textContent = 'Préférences colocataires';
                } else if (userType === 'owner') {
                    filterTitles[3].textContent = 'Profil recherché';
                }
            }
        }
        
        // Sliders de budget
        const budgetMinInput = document.getElementById('budgetMin');
        const budgetMaxInput = document.getElementById('budgetMax');
        const minBudgetDisplay = document.getElementById('minBudget');
        const maxBudgetDisplay = document.getElementById('maxBudget');
        
        if (!budgetMinInput || !budgetMaxInput) return;
        
        // Mettre à jour les affichages
        budgetMinInput.addEventListener('input', () => {
            const minVal = parseInt(budgetMinInput.value);
            const maxVal = parseInt(budgetMaxInput.value);
            
            if (minVal > maxVal) {
                budgetMinInput.value = maxVal;
                minBudgetDisplay.textContent = maxVal + '€';
            } else {
                minBudgetDisplay.textContent = minVal + '€';
            }
        });
        
        budgetMaxInput.addEventListener('input', () => {
            const minVal = parseInt(budgetMinInput.value);
            const maxVal = parseInt(budgetMaxInput.value);
            
            if (maxVal < minVal) {
                budgetMaxInput.value = minVal;
                maxBudgetDisplay.textContent = minVal + '€';
            } else {
                maxBudgetDisplay.textContent = maxVal + '€';
            }
        });
    }
    
    // Écouteurs d'événements
    function addEventListeners() {
        // Boutons de swipe
        likeBtn.addEventListener('click', likeCurrentProfile);
        rejectBtn.addEventListener('click', rejectCurrentProfile);
        infoBtn.addEventListener('click', () => showDetailModal(currentProfileIndex));
        
        // Modaux
        filterBtn.addEventListener('click', () => filterModal.classList.add('active'));
        closeFilterBtn.addEventListener('click', () => filterModal.classList.remove('active'));
        applyFilterBtn.addEventListener('click', () => {
            // Appliquer les filtres
            filterModal.classList.remove('active');
        });
        resetFilterBtn.addEventListener('click', () => {
            // Réinitialiser les filtres
            filterModal.classList.remove('active');
        });
        
        // Modal Match
        keepSwipingBtn.addEventListener('click', () => {
            matchModal.classList.remove('active');
            nextProfile();
        });
        sendMessageBtn.addEventListener('click', () => {
            matchModal.classList.remove('active');
            // Rediriger vers la page de messagerie
            window.location.href = 'messages.html';
        });
        
        // Modal Détail
        closeDetailBtn.addEventListener('click', () => detailModal.classList.remove('active'));
        prevImageBtn.addEventListener('click', prevSliderImage);
        nextImageBtn.addEventListener('click', nextSliderImage);
        detailLikeBtn.addEventListener('click', () => {
            likeCurrentProfile();
            detailModal.classList.remove('active');
        });
        detailRejectBtn.addEventListener('click', () => {
            rejectCurrentProfile();
            detailModal.classList.remove('active');
        });
        
        // Navigation du bas
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Désactiver tous les items
                navItems.forEach(i => i.classList.remove('active'));
                
                // Activer l'item cliqué
                item.classList.add('active');
                
                // Changer de section
                const tab = item.dataset.tab;
                
                // Rediriger vers la page correspondante
                if (tab === 'matches') {
                    window.location.href = 'messages.html';
                } else if (tab === 'swipe') {
                    // Déjà sur la page principale
                } else if (tab === 'favorites') {
                    window.location.href = 'favorites.html';
                } else if (tab === 'profile') {
                    window.location.href = 'profile.html';
                }
            });
        });
    }
}); 
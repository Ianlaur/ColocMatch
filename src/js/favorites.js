// Initialisation de la page des favoris
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const favoritesList = document.getElementById('favoritesList');
    const noFavorites = document.getElementById('noFavorites');
    const favoriteTabs = document.querySelectorAll('.favorites-tab');
    const messagesBadge = document.getElementById('messagesBadge');
    const discoverBtn = document.getElementById('discoverBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    // Navigation du bas
    const navItems = document.querySelectorAll('.nav-item');
    
    // Initialisation
    initFavoritesPage();
    
    // Fonction principale d'initialisation
    function initFavoritesPage() {
        loadFavorites();
        addEventListeners();
        updateMessagesBadge();
    }
    
    // Charger les favoris depuis localStorage
    function loadFavorites(tabFilter = 'all') {
        // Récupérer les favoris depuis localStorage
        const storedFavorites = localStorage.getItem('favorites');
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Si pas de favoris, afficher le message d'état vide
        if (favorites.length === 0) {
            noFavorites.classList.remove('hidden');
            // Supprimer tous les éléments sauf le message d'état vide
            while (favoritesList.firstChild) {
                if (favoritesList.firstChild !== noFavorites) {
                    favoritesList.removeChild(favoritesList.firstChild);
                } else {
                    break;
                }
            }
            return;
        }
        
        // Cacher le message d'état vide
        noFavorites.classList.add('hidden');
        
        // Supprimer tous les éléments sauf le message d'état vide
        Array.from(favoritesList.children).forEach(child => {
            if (child !== noFavorites) {
                favoritesList.removeChild(child);
            }
        });
        
        // Filtrer les favoris en fonction de l'onglet sélectionné
        let filteredFavorites = favorites;
        
        if (tabFilter === 'apartments') {
            filteredFavorites = favorites.filter(id => {
                const profile = profiles.find(p => p.id === id);
                return profile && profile.type === 'appart';
            });
        } else if (tabFilter === 'roommates') {
            filteredFavorites = favorites.filter(id => {
                const profile = profiles.find(p => p.id === id);
                return profile && profile.type === 'coloc';
            });
        }
        
        // Afficher l'état vide si aucun favori après filtrage
        if (filteredFavorites.length === 0) {
            noFavorites.classList.remove('hidden');
            return;
        }
        
        // Créer les éléments pour chaque favori
        filteredFavorites.forEach(id => {
            const profile = profiles.find(p => p.id === id);
            if (profile) {
                const favoriteElement = createFavoriteElement(profile);
                favoritesList.insertBefore(favoriteElement, noFavorites);
            }
        });
    }
    
    // Créer un élément favori
    function createFavoriteElement(profile) {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.dataset.id = profile.id;
        
        // Type d'icône et de badge en fonction du type de profil
        const typeIcon = profile.type === 'appart' ? 'fa-home' : 'fa-user';
        const typeBadge = profile.type === 'appart' ? 'Appartement' : 'Colocataire';
        
        // HTML pour l'élément favori
        favoriteItem.innerHTML = `
            <div class="favorite-header">
                <img src="${profile.images[0]}" alt="${profile.name}" class="favorite-image">
                <div class="favorite-badge">
                    <i class="fas ${typeIcon}"></i>
                    <span>${typeBadge}</span>
                </div>
                <div class="favorite-actions">
                    <button class="favorite-action-btn remove" data-id="${profile.id}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
            <div class="favorite-content">
                <h3 class="favorite-title">${profile.type === 'coloc' ? `${profile.name}, ${profile.age} ans` : profile.name}</h3>
                <p class="favorite-subtitle">
                    <i class="fas fa-map-marker-alt"></i>
                    ${profile.location}
                </p>
                <div class="favorite-details">
                    <div class="favorite-detail">
                        <i class="fas ${profile.type === 'coloc' ? 'fa-user' : 'fa-home'}"></i>
                        <span>${profile.housing}</span>
                    </div>
                    <div class="favorite-detail">
                        <i class="fas fa-euro-sign"></i>
                        <span>${profile.budget}</span>
                    </div>
                    <div class="favorite-detail">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${profile.availability}</span>
                    </div>
                </div>
                <div class="favorite-footer">
                    <div class="compatibility">
                        <div class="compatibility-meter">
                            <div class="compatibility-fill" style="width: ${profile.compatibility}%"></div>
                        </div>
                        <span class="compatibility-label">${profile.compatibility}%</span>
                    </div>
                    <button class="btn-primary favorite-btn">
                        Voir détails
                    </button>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements
        const removeBtn = favoriteItem.querySelector('.favorite-action-btn.remove');
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFavorite(parseInt(this.dataset.id));
        });
        
        const viewDetailsBtn = favoriteItem.querySelector('.favorite-btn');
        viewDetailsBtn.addEventListener('click', function() {
            viewProfileDetails(profile.id);
        });
        
        // Ajouter un écouteur pour cliquer sur toute la carte
        favoriteItem.addEventListener('click', function() {
            viewProfileDetails(profile.id);
        });
        
        return favoriteItem;
    }
    
    // Supprimer un favori
    function removeFavorite(id) {
        // Récupérer les favoris depuis localStorage
        const storedFavorites = localStorage.getItem('favorites');
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Supprimer l'ID du tableau
        favorites = favorites.filter(favoriteId => favoriteId !== id);
        
        // Mettre à jour localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Rafraîchir l'affichage
        loadFavorites(getActiveTab());
    }
    
    // Voir les détails d'un profil
    function viewProfileDetails(id) {
        // Stocker l'ID pour la page de détails
        localStorage.setItem('selectedProfile', id);
        
        // Récupérer le profil
        const profile = profiles.find(p => p.id === id);
        
        // Rediriger vers la page appropriée en fonction du type
        if (profile.type === 'appart') {
            localStorage.setItem('selectedApartment', id);
            window.location.href = 'colocs-matching.html';
        } else {
            // Pour l'instant, nous redirigerons vers l'index, 
            // mais dans le futur, une page de détails pour les colocataires pourrait être créée
            window.location.href = 'index.html';
        }
    }
    
    // Obtenir l'onglet actif
    function getActiveTab() {
        let activeTab = 'all';
        favoriteTabs.forEach(tab => {
            if (tab.classList.contains('active')) {
                activeTab = tab.dataset.tab;
            }
        });
        return activeTab;
    }
    
    // Mettre à jour le badge des messages
    function updateMessagesBadge() {
        // Compter les messages non lus
        let unreadCount = 0;
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
    
    // Ajouter les écouteurs d'événements
    function addEventListeners() {
        // Onglets de filtrage
        favoriteTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Désactiver tous les onglets
                favoriteTabs.forEach(t => t.classList.remove('active'));
                
                // Activer l'onglet cliqué
                this.classList.add('active');
                
                // Charger les favoris avec le filtre sélectionné
                loadFavorites(this.dataset.tab);
            });
        });
        
        // Bouton découvrir
        discoverBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        // Bouton profil
        profileBtn.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
        
        // Navigation du bas
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const tab = this.dataset.tab;
                
                // Rediriger vers la page correspondante
                if (tab === 'swipe') {
                    window.location.href = 'index.html';
                } else if (tab === 'matches') {
                    window.location.href = 'messages.html';
                } else if (tab === 'favorites') {
                    // Déjà sur la page des favoris
                } else if (tab === 'profile') {
                    window.location.href = 'profile.html';
                }
            });
        });
    }
}); 
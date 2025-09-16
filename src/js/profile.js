// Initialisation de la page de profil
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarPreview = document.getElementById('avatarPreview');
    const editAvatarBtn = document.getElementById('editAvatarBtn');
    const avatarModal = document.getElementById('avatarModal');
    const closeAvatarModal = document.getElementById('closeAvatarModal');
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const useDefaultAvatarBtn = document.getElementById('useDefaultAvatarBtn');
    const saveAvatarBtn = document.getElementById('saveAvatarBtn');
    const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');
    const messagesBadge = document.getElementById('messagesBadge');
    const settingsBtn = document.getElementById('settingsBtn');
    const savePersonalBtn = document.getElementById('savePersonalBtn');
    const savePreferencesBtn = document.getElementById('savePreferencesBtn');
    const favoritesCount = document.getElementById('favoritesCount');
    
    // Champs du formulaire d'informations personnelles
    const userName = document.getElementById('userName');
    const userAge = document.getElementById('userAge');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const userOccupation = document.getElementById('userOccupation');
    const userBio = document.getElementById('userBio');
    
    // Champs du formulaire de préférences
    const budgetMin = document.getElementById('budgetMin');
    const budgetMax = document.getElementById('budgetMax');
    const locationsInput = document.getElementById('locationsInput');
    
    // Navigation du bas
    const navItems = document.querySelectorAll('.nav-item');
    
    // Variables temporaires
    let tempAvatarSrc = profileAvatar.src;
    
    // Initialisation
    initProfilePage();
    
    // Fonction principale d'initialisation
    function initProfilePage() {
        loadUserProfile();
        initTagsInput();
        addEventListeners();
        updateFavoritesCount();
        updateMessagesBadge();
    }
    
    // Charger les données du profil
    function loadUserProfile() {
        // Charger les données de profil depuis localStorage ou utiliser les données par défaut
        const storedProfile = localStorage.getItem('userProfile');
        const profileData = storedProfile ? JSON.parse(storedProfile) : {};
        
        // Avatar
        if (profileData.avatar) {
            profileAvatar.src = profileData.avatar;
            avatarPreview.src = profileData.avatar;
        }
        
        // Informations personnelles
        if (profileData.personalInfo) {
            const info = profileData.personalInfo;
            userName.value = info.name || '';
            userAge.value = info.age || '';
            userEmail.value = info.email || '';
            userPhone.value = info.phone || '';
            userOccupation.value = info.occupation || '';
            userBio.value = info.bio || '';
        }
        
        // Préférences
        if (profileData.preferences) {
            const prefs = profileData.preferences;
            budgetMin.value = prefs.budgetMin || 400;
            budgetMax.value = prefs.budgetMax || 750;
            
            // Mettre à jour les cases à cocher pour les types de logement
            if (prefs.housingTypes) {
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (prefs.housingTypes.includes(checkbox.value)) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });
            }
        }
    }
    
    // Initialiser l'entrée de tags
    function initTagsInput() {
        const tagsContainer = locationsInput;
        const tagsInput = tagsContainer.querySelector('input');
        
        // Ajouter un événement pour le clic sur le bouton de suppression
        tagsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-tag')) {
                e.target.parentElement.remove();
            }
        });
        
        // Ajouter un événement pour l'ajout de nouveaux tags
        tagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                
                const tagText = this.value.trim();
                if (tagText) {
                    const tagElement = document.createElement('div');
                    tagElement.className = 'tag';
                    tagElement.innerHTML = `${tagText} <span class="remove-tag">×</span>`;
                    
                    tagsContainer.insertBefore(tagElement, this);
                    this.value = '';
                }
            }
        });
    }
    
    // Mettre à jour le compteur de favoris
    function updateFavoritesCount() {
        // Récupérer les favoris depuis localStorage
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        
        // Mettre à jour le compteur
        if (favoritesCount) {
            favoritesCount.textContent = favorites.length;
        }
    }
    
    // Mettre à jour le badge des messages
    function updateMessagesBadge() {
        // Compter les messages non lus
        let unreadCount = 0;
        messages.forEach(msg => {
            if (msg.unread) unreadCount++;
        });
        
        // Mettre à jour le badge
        if (messagesBadge) {
            if (unreadCount > 0) {
                messagesBadge.textContent = unreadCount;
                messagesBadge.style.display = 'flex';
            } else {
                messagesBadge.style.display = 'none';
            }
        }
    }
    
    // Enregistrer les informations personnelles
    function savePersonalInfo() {
        // Récupérer les données du profil existantes ou créer un nouvel objet
        const storedProfile = localStorage.getItem('userProfile');
        const profileData = storedProfile ? JSON.parse(storedProfile) : {};
        
        // Mettre à jour les informations personnelles
        profileData.personalInfo = {
            name: userName.value,
            age: userAge.value,
            email: userEmail.value,
            phone: userPhone.value,
            occupation: userOccupation.value,
            bio: userBio.value
        };
        
        // Enregistrer dans localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // Afficher un message de succès (facultatif)
        alert('Informations personnelles enregistrées avec succès !');
    }
    
    // Enregistrer les préférences
    function savePreferences() {
        // Récupérer les données du profil existantes ou créer un nouvel objet
        const storedProfile = localStorage.getItem('userProfile');
        const profileData = storedProfile ? JSON.parse(storedProfile) : {};
        
        // Récupérer les types de logement cochés
        const housingTypes = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            housingTypes.push(checkbox.value);
        });
        
        // Récupérer les villes sélectionnées
        const locations = [];
        locationsInput.querySelectorAll('.tag').forEach(tag => {
            const tagText = tag.textContent.replace('×', '').trim();
            locations.push(tagText);
        });
        
        // Mettre à jour les préférences
        profileData.preferences = {
            budgetMin: parseInt(budgetMin.value),
            budgetMax: parseInt(budgetMax.value),
            locations: locations,
            housingTypes: housingTypes
        };
        
        // Enregistrer dans localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // Afficher un message de succès (facultatif)
        alert('Préférences enregistrées avec succès !');
    }
    
    // Enregistrer l'avatar
    function saveAvatar() {
        // Récupérer les données du profil existantes ou créer un nouvel objet
        const storedProfile = localStorage.getItem('userProfile');
        const profileData = storedProfile ? JSON.parse(storedProfile) : {};
        
        // Mettre à jour l'avatar
        profileData.avatar = tempAvatarSrc;
        
        // Enregistrer dans localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // Mettre à jour l'avatar dans l'interface
        profileAvatar.src = tempAvatarSrc;
        
        // Fermer le modal
        avatarModal.classList.remove('active');
    }
    
    // Charger un fichier image pour l'avatar
    function handleAvatarUpload(event) {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Mettre à jour l'aperçu et stocker l'image temporairement
                avatarPreview.src = e.target.result;
                tempAvatarSrc = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Ajouter les écouteurs d'événements
    function addEventListeners() {
        // Onglets
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Désactiver tous les onglets et contenus
                profileTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué et son contenu
                this.classList.add('active');
                const tabId = `${this.dataset.tab}Tab`;
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Bouton d'édition d'avatar
        editAvatarBtn.addEventListener('click', function() {
            avatarModal.classList.add('active');
        });
        
        // Modal d'avatar
        closeAvatarModal.addEventListener('click', function() {
            avatarModal.classList.remove('active');
            // Réinitialiser l'aperçu
            avatarPreview.src = profileAvatar.src;
        });
        
        uploadAvatarBtn.addEventListener('click', function() {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', handleAvatarUpload);
        
        useDefaultAvatarBtn.addEventListener('click', function() {
            // Utiliser l'avatar par défaut
            avatarPreview.src = 'profile-picture.png';
            tempAvatarSrc = 'profile-picture.png';
        });
        
        saveAvatarBtn.addEventListener('click', saveAvatar);
        
        cancelAvatarBtn.addEventListener('click', function() {
            avatarModal.classList.remove('active');
            // Réinitialiser l'aperçu
            avatarPreview.src = profileAvatar.src;
        });
        
        // Boutons d'enregistrement
        savePersonalBtn.addEventListener('click', savePersonalInfo);
        savePreferencesBtn.addEventListener('click', savePreferences);
        
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
                    window.location.href = 'favorites.html';
                } else if (tab === 'profile') {
                    // Déjà sur la page de profil
                }
            });
        });
    }
}); 
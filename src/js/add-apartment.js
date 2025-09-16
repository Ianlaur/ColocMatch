document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments nécessaires
    const form = document.getElementById('addApartmentForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const photoInputs = document.querySelectorAll('.photo-upload input[type="file"]');
    const backBtn = document.getElementById('backBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const successMessage = document.getElementById('successMessage');
    const viewAptsBtn = document.getElementById('viewAptsBtn');
    const viewAnnonceBtn = document.getElementById('viewAnnonceBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Initialisation
    initForm();
    
    function initForm() {
        addEventListeners();
        setupPhotoUploads();
        updateProgressIndicator(1);
    }
    
    function addEventListeners() {
        // Navigation entre les étapes
        nextButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const nextStep = parseInt(this.dataset.next);
                if (validateStep(nextStep - 1)) {
                    goToStep(nextStep);
                }
            });
        });
        
        prevButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const prevStep = parseInt(this.dataset.prev);
                goToStep(prevStep);
            });
        });
        
        // Soumission du formulaire
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateStep(4)) {
                submitForm();
            }
        });
        
        // Bouton retour
        backBtn.addEventListener('click', function() {
            window.location.href = 'owner-dashboard.html';
        });
        
        // Bouton annuler
        cancelBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir annuler? Toutes les données saisies seront perdues.')) {
                window.location.href = 'owner-dashboard.html';
            }
        });
        
        // Boutons après soumission
        viewAptsBtn.addEventListener('click', function() {
            window.location.href = 'owner-dashboard.html';
        });
        
        viewAnnonceBtn.addEventListener('click', function() {
            // Redirection vers la page de l'annonce (à implémenter)
            window.location.href = 'owner-dashboard.html';
        });
        
        // Navigation du bas
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const tab = this.dataset.tab;
                
                if (tab === 'dashboard') {
                    window.location.href = 'owner-dashboard.html';
                } else if (tab === 'messages') {
                    window.location.href = 'messages.html';
                } else if (tab === 'profile') {
                    window.location.href = 'profile.html';
                }
                // Ne rien faire si on est déjà sur l'onglet apartments
            });
        });
    }
    
    function goToStep(stepNumber) {
        // Masquer toutes les étapes
        formSteps.forEach(step => step.classList.remove('active'));
        
        // Afficher l'étape demandée
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Mettre à jour l'indicateur de progression
        updateProgressIndicator(stepNumber);
        
        // Faire défiler vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateProgressIndicator(currentStep) {
        // Mettre à jour les étapes
        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            
            if (stepNum < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Mettre à jour les lignes
        progressLines.forEach((line, index) => {
            if (index < currentStep - 1) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    }
    
    function validateStep(stepNumber) {
        const currentStep = document.getElementById(`step${stepNumber}`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;
        
        // Vérifier chaque champ requis
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
                
                // Ajouter une animation de secousse
                field.classList.add('shake');
                setTimeout(() => {
                    field.classList.remove('shake');
                }, 500);
                
                // Ajouter un message d'erreur si non existant
                const errorMsg = field.nextElementSibling?.classList.contains('error-msg');
                if (!errorMsg) {
                    const msg = document.createElement('p');
                    msg.className = 'error-msg';
                    msg.textContent = 'Ce champ est requis';
                    msg.style.color = 'var(--error-color)';
                    msg.style.fontSize = '12px';
                    msg.style.marginTop = '5px';
                    field.parentNode.insertBefore(msg, field.nextSibling);
                }
            } else {
                field.classList.remove('invalid');
                const nextElement = field.nextElementSibling;
                if (nextElement && nextElement.classList.contains('error-msg')) {
                    nextElement.remove();
                }
            }
        });
        
        // Si des champs sont invalides, faire défiler jusqu'au premier
        if (!isValid) {
            const firstInvalid = currentStep.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }
    
    function setupPhotoUploads() {
        photoInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Vérifier si le fichier est une image
                    if (!file.type.startsWith('image/')) {
                        alert('Veuillez sélectionner une image');
                        this.value = '';
                        return;
                    }
                    
                    const reader = new FileReader();
                    const placeholder = this.nextElementSibling;
                    const parent = this.parentElement;
                    
                    reader.onload = function(e) {
                        // Supprimer la prévisualisation précédente s'il y en a une
                        const existingPreview = parent.querySelector('.upload-preview');
                        const existingRemoveBtn = parent.querySelector('.remove-photo');
                        
                        if (existingPreview) existingPreview.remove();
                        if (existingRemoveBtn) existingRemoveBtn.remove();
                        
                        // Créer la prévisualisation
                        const preview = document.createElement('div');
                        preview.className = 'upload-preview';
                        preview.style.position = 'absolute';
                        preview.style.top = '0';
                        preview.style.left = '0';
                        preview.style.width = '100%';
                        preview.style.height = '100%';
                        preview.style.backgroundImage = `url(${e.target.result})`;
                        preview.style.backgroundSize = 'cover';
                        preview.style.backgroundPosition = 'center';
                        preview.style.zIndex = '1';
                        preview.style.borderRadius = '6px';
                        
                        // Créer le bouton de suppression
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'remove-photo';
                        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                        removeBtn.style.position = 'absolute';
                        removeBtn.style.top = '5px';
                        removeBtn.style.right = '5px';
                        removeBtn.style.zIndex = '3';
                        removeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
                        removeBtn.style.color = 'var(--error-color)';
                        removeBtn.style.border = 'none';
                        removeBtn.style.borderRadius = '50%';
                        removeBtn.style.width = '30px';
                        removeBtn.style.height = '30px';
                        removeBtn.style.cursor = 'pointer';
                        removeBtn.style.display = 'flex';
                        removeBtn.style.alignItems = 'center';
                        removeBtn.style.justifyContent = 'center';
                        
                        // Ajouter l'événement pour supprimer la photo
                        removeBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            preview.remove();
                            removeBtn.remove();
                            input.value = '';
                            placeholder.style.display = 'flex';
                        });
                        
                        // Ajouter les éléments
                        parent.appendChild(preview);
                        parent.appendChild(removeBtn);
                        placeholder.style.display = 'none';
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    function submitForm() {
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        
        // Simuler l'envoi des données à un serveur (à remplacer par une vraie API)
        console.log('Formulaire soumis avec succès');
        
        // Afficher le message de réussite
        form.style.display = 'none';
        successMessage.classList.add('active');
        
        // Mettre à jour l'indicateur de progression
        updateProgressIndicator(5); // Étape fictive pour montrer que tout est complété
        
        // Faire défiler vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Ajout d'effets CSS supplémentaires
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
        // Ajouter une classe en focus
        el.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        el.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}); 
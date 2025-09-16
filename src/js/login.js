// Gestion des onglets de connexion/inscription
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Changer d'onglet
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Cacher tous les panneaux
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Afficher le panneau correspondant à l'onglet cliqué
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-pane`).classList.add('active');
        });
    });

    // Basculer la visibilité du mot de passe
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Soumission du formulaire de connexion
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Simuler la connexion
        console.log('Tentative de connexion avec:', {email, password, rememberMe});
        
        // Rediriger vers la page de choix de profil après la connexion réussie
        window.location.href = 'user-type.html';
    });

    // Soumission du formulaire d'inscription
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const termsAccepted = document.getElementById('acceptTerms').checked;
        
        // Simuler l'inscription
        console.log('Tentative d\'inscription avec:', {name, email, password, termsAccepted});
        
        // Rediriger vers la page de choix de profil après l'inscription réussie
        window.location.href = 'user-type.html';
    });
}); 
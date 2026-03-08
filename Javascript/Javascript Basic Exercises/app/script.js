/**
 * Neon-Grid Architect Manifesto: Logic Layer
 * Using data-attributes for JS hooks.
 */

document.addEventListener('DOMContentLoaded', () => {
    const glowBtn = document.querySelector('[data-action="glow"]');

    if (glowBtn) {
        glowBtn.addEventListener('click', () => {
            const body = document.querySelector('.l-body');
            
            // Toggle a state class following manifesto naming
            const isActive = body.classList.toggle('is-active');
            
            if (isActive) {
                console.log("System Initialized: Neon Grid fully powered.");
                glowBtn.textContent = "SYSTEM_ONLINE";
            } else {
                glowBtn.textContent = "INITIALIZE_SYSTEM";
            }
        });
    }
});

function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const greetingElement = document.getElementById('greeting');
    
    if (hours < 12) {
        greetingElement.textContent = 'Bom dia';
    } else if (hours < 18) {
        greetingElement.textContent = 'Boa tarde';
    } else {
        greetingElement.textContent = 'Boa noite';
    }
    
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDatetring('pt-BR', options);
}S

updateGreeting();
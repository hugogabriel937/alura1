// Obter referências aos olhos
const leftPupil = document.querySelector('.left-eye .pupil');
const rightPupil = document.querySelector('.right-eye .pupil');
const svgElement = document.querySelector('.monalisa');

// Coordenadas originais dos olhos
const leftEyeCenter = { x: 165, y: 160 };
const rightEyeCenter = { x: 235, y: 160 };

// Raio máximo que a pupila pode se mover
const maxPupilDistance = 8;

// Função para calcular o ângulo entre dois pontos
function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

// Função para mover a pupila em direção ao mouse
function movePupil(pupil, eyeCenter, mouseX, mouseY) {
    // Obter a posição SVG relativa às coordenadas do SVG
    const svg = document.querySelector('.monalisa');
    const rect = svg.getBoundingClientRect();
    
    // Converter coordenadas do mouse para coordenadas do SVG
    const svgMouseX = ((mouseX - rect.left) / rect.width) * svg.viewBox.baseVal.width;
    const svgMouseY = ((mouseY - rect.top) / rect.height) * svg.viewBox.baseVal.height;
    
    // Calcular o ângulo em relação ao centro do olho
    const angle = getAngle(eyeCenter.x, eyeCenter.y, svgMouseX, svgMouseY);
    
    // Calcular a nova posição da pupila
    const newX = eyeCenter.x + Math.cos(angle) * maxPupilDistance;
    const newY = eyeCenter.y + Math.sin(angle) * maxPupilDistance;
    
    // Aplicar a nova posição
    pupil.setAttribute('cx', newX);
    pupil.setAttribute('cy', newY);
}

// Event listener para o movimento do mouse
document.addEventListener('mousemove', (e) => {
    movePupil(leftPupil, leftEyeCenter, e.clientX, e.clientY);
    movePupil(rightPupil, rightEyeCenter, e.clientX, e.clientY);
});

// Event listener para quando o mouse sai da janela (resetar para o centro)
document.addEventListener('mouseleave', () => {
    leftPupil.setAttribute('cx', leftEyeCenter.x);
    leftPupil.setAttribute('cy', leftEyeCenter.y);
    rightPupil.setAttribute('cx', rightEyeCenter.x);
    rightPupil.setAttribute('cy', rightEyeCenter.y);
});

// Adicionar suporte a toque (mobile)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        movePupil(leftPupil, leftEyeCenter, touch.clientX, touch.clientY);
        movePupil(rightPupil, rightEyeCenter, touch.clientX, touch.clientY);
    }
});

// Resetar ao fim do toque
document.addEventListener('touchend', () => {
    leftPupil.setAttribute('cx', leftEyeCenter.x);
    leftPupil.setAttribute('cy', leftEyeCenter.y);
    rightPupil.setAttribute('cx', rightEyeCenter.x);
    rightPupil.setAttribute('cy', rightEyeCenter.y);
});
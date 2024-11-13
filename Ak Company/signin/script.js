document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ribbonCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = [];
    const maxPoints = 7; // Number of points to keep track of

    function drawRibbon() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(points[0]?.x || 0, points[0]?.y || 0);

        for (let i = 1; i < points.length; i++) {
            const { x, y } = points[i];
            ctx.lineTo(x, y);
        }

        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(53, 0, 198, 0.8)';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    function updatePoints(x, y) {
        points.push({ x, y });
        if (points.length > maxPoints) {
            points.shift();
        }
        drawRibbon();
    }

    document.addEventListener('mousemove', (event) => {
        updatePoints(event.clientX, event.clientY);
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawRibbon(); // Redraw ribbon on resize
    });
});

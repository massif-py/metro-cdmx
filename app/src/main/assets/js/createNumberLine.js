function createNumberedBox(options = {}) {
    const {
        number = "Error in createNumberedBox function",
        bgColor = "#FF6B00",
        textColor = "#FF0000",
        size = 8,
        position = [0, 0, 0]
    } = options;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor;
    ctx.font = 'bold 90px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2]);
    scene.add(mesh);
    return mesh;
}
createNumberedBox({ number: "1", bgColor: "#F05A93", textColor: "#FFFFFF", position: [75, 8, 1], size: 6 });
createNumberedBox({ number: "1", bgColor: "#F05A93", textColor: "#FFFFFF", position: [-81, -11, 1], size: 6 });
createNumberedBox({ number: "2", bgColor: "#0072CE", textColor: "#FFFFFF", position: [10, -65, 1], size: 6 });
createNumberedBox({ number: "2", bgColor: "#0072CE", textColor: "#FFFFFF", position: [-94, 56, 1], size: 6 });
createNumberedBox({ number: "3", bgColor: "#AF9800", textColor: "#FFFFFF", position: [-5, 101, 1], size: 6 });
createNumberedBox({ number: "3", bgColor: "#AF9800", textColor: "#FFFFFF", position: [-25, -72, 1], size: 6 });
createNumberedBox({ number: "4", bgColor: "#61C2A5", textColor: "#FFFFFF", position: [30, 85, 1], size: 6 });
createNumberedBox({ number: "4", bgColor: "#61C2A5", textColor: "#FFFFFF", position: [30, -26, 1], size: 6 });
createNumberedBox({ number: "5", bgColor: "#FFD100", textColor: "#FFFFFF", position: [-32, 101, 1], size: 6 });
createNumberedBox({ number: "5", bgColor: "#FFD100", textColor: "#FFFFFF", position: [82, 8, 1], size: 6 });
createNumberedBox({ number: "6", bgColor: "#ED1C24", textColor: "#FFFFFF", position: [-80, 90, 1], size: 6 });
createNumberedBox({ number: "6", bgColor: "#ED1C24", textColor: "#FFFFFF", position: [37, 85, 1], size: 6 });
createNumberedBox({ number: "7", bgColor: "#E46C0A", textColor: "#FFFFFF", position: [-73, 90, 1], size: 6 });
createNumberedBox({ number: "7", bgColor: "#E46C0A", textColor: "#FFFFFF", position: [-67, -51, 1], size: 6 });
createNumberedBox({ number: "8", bgColor: "#009A44", textColor: "#FFFFFF", position: [-10, 55, 1], size: 6 });
createNumberedBox({ number: "8", bgColor: "#009A44", textColor: "#FFFFFF", position: [73, -55, 1], size: 6 });
createNumberedBox({ number: "9", bgColor: "#592C18", textColor: "#FFFFFF", position: [89, 8, 1], size: 6 });
createNumberedBox({ number: "9", bgColor: "#592C18", textColor: "#FFFFFF", position: [-72, 0, 1], size: 6 });
createNumberedBox({ number: "12", bgColor: "#CBA135", textColor: "#FFFFFF", position: [-72, -36, 1], size: 6 });
createNumberedBox({ number: "12", bgColor: "#CBA135", textColor: "#FFFFFF", position: [85,-120, 1], size: 6 });
createNumberedBox({ number: "A", bgColor: "#9B26B6", textColor: "#FFFFFF", position: [96, 8, 1], size: 6 });
createNumberedBox({ number: "A", bgColor: "#9B26B6", textColor: "#FFFFFF", position: [89,-62, 1], size: 6 });

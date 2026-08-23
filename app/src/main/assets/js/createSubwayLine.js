const metroLines = [
    { name: "Línea 1", color: 0xF05A93, points: [[-75, -15], [-40, 20], [12, 20], [30, 36], [37, 36], [52, 23], [52, 12], [60, 2], [69, 2]] },
    { name: "Línea 2", color: 0x0072CE, points: [[-88, 56], [-67, 56], [-55, 44], [0, 44], [10, 35], [10, -60]] },
    { name: "Línea 3", color: 0xAF9800, points: [[-5, 96], [-5, 78], [-25, 57], [-25, -65]] },
    { name: "Línea 4", color: 0x61C2A5, points: [[30, 80], [30, -16]] },
    { name: "Línea 5", color: 0xFFD100, points: [[-32, 95], [-32, 86], [-5, 59], [42, 59], [69, 33], [69, 2]] },
    { name: "Línea 6", color: 0xED1C24, points: [[30, 80], [-58, 80], [-67, 89]] },
    { name: "Línea 7", color: 0xE46C0A, points: [[-67, 89], [-67, -45]] },
    { name: "Línea 8", color: 0x009A44, points: [[-10, 50], [-10, 15], [19, -16], [35, -16], [40, -20], [40, -49], [45, -55], [68, -55]] },
    { name: "Línea 9", color: 0x592C18, points: [[-67, -6], [62, -6], [69, 2]] },
    { name: "Línea A", color: 0x9B26B6, points: [[69, 2], [75, -5], [75, -47], [83, -57]] },
    { name: "Línea B", color: 0xB1B3B3, points: [[-35, 50], [24, 50], [37, 36], [49, 36], [65, 53], [65, 108]] },
    { name: "Línea 12", color: 0xCBA135, points: [[-67, -32], [-6, -32], [-3, -46], [10, -46], [20, -55], [45, -55], [45, -83], [80, -120]] }
];
metroLines.forEach(line => {
    const path = new THREE.CurvePath();
    const vecPoints = line.points.map(p => new THREE.Vector3(p[0], p[1], 0));
    for (let i = 0; i < vecPoints.length - 1; i++) {
        path.add(new THREE.LineCurve3(vecPoints[i], vecPoints[i + 1]));
    }
    const tubeGeo = new THREE.TubeGeometry(path, 64, 1.5, 8, false);
    const tubeMat = new THREE.MeshPhongMaterial({ color: line.color, shininess: 70 });
    scene.add(new THREE.Mesh(tubeGeo, tubeMat));
});

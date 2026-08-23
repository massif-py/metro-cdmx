const sharedDotGeo = new THREE.SphereGeometry(1.8, 16, 16);
const sharedDotMat = new THREE.MeshStandardMaterial({ color: 0xE0E0E0, roughness: 1.0, metalness: 0.1 });
function createTextPlane(options) {
    const {
        text = "Error in createTextPlane function.",
        fontSize = 26,
        fontFamily = "Trebuchet MS, sans-serif",
        color = "#FF0000",
        textAlign = "left",
        lineHeight = 32,
        position = [0, 0, 0],
        planeScale = 0.12,
        dotPosition = null,
        rotation = 0
    } = options;
    if (dotPosition) {
        const dotMesh = new THREE.Mesh(sharedDotGeo, sharedDotMat);
        dotMesh.position.set(dotPosition[0], dotPosition[1], dotPosition[2] ?? 1);
        scene.add(dotMesh);
    }
    if (!text)
        return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'middle';
    let xPos = canvas.width / 2;
    if (textAlign === 'left') xPos = 20;
    if (textAlign === 'right') xPos = canvas.width - 20;
    const lines = text.split('\n');
    const startY = (canvas.height / 2) - ((lines.length - 1) * lineHeight / 2);
    lines.forEach((line, index) => {
        ctx.fillText(line, xPos, startY + (index * lineHeight));
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthTest: false
    });
    const geometry = new THREE.PlaneGeometry(canvas.width * planeScale, canvas.height * planeScale);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2] ?? 0);
    mesh.rotation.z = (rotation * Math.PI) / 180;
    scene.add(mesh);
    return mesh;
}
const stationsData = [
    { text: "La Paz", color: "#9B26B6", pos: [115, -57, 2], dot: [83, -57] },
    { text: "Los Reyes", color: "#9B26B6", pos: [111, -52, 2], dot: [79, -52] },
    { text: "Santa Marta", color: "#9B26B6", pos: [107, -47, 2], dot: [75, -47] },
    { text: "Acatitla", color: "#9B26B6", pos: [106, -41, 2], dot: [75, -41] },
    { text: "Peñón Viejo", color: "#9B26B6", pos: [106, -34, 2], dot: [75, -34] },
    { text: "Guelatao", color: "#9B26B6", pos: [106, -27, 2], dot: [75, -27] },
    { text: "Tepalcates", color: "#9B26B6", pos: [106, -20, 2], dot: [75, -20] },
    { text: "Canal de San Juan", color: "#9B26B6", pos: [106, -13, 2], dot: [75, -13] },
    { text: "Agrícola Oriental", color: "#9B26B6", pos: [106, -6, 2], dot: [75, -6] },
    { text: "Constitución de 1917", color: "#009A44", pos: [67, -86, 2], dot: [67, -55], rotation: -90 },
    { text: "UAM I", color: "#009A44", pos: [61, -86, 2], dot: [61, -55], rotation: -90 },
    { text: "C. de la Estrella", color: "#009A44", pos: [56, -86, 2], dot: [56, -55], rotation: -90 },
    { text: "Iztapalapa", color: "#009A44", pos: [51, -86, 2], dot: [51, -55], rotation: -90 },
    { text: "Escuadrón 201", color: "#009A44", pos: [71, -48, 2], dot: [40, -49] },
    { text: "Aculco", color: "#009A44", pos: [71, -43, 2], dot: [40, -43] },
    { text: "Apatlaco", color: "#009A44", pos: [71, -37, 2], dot: [40, -37] },
    { text: "Iztacalco", color: "#009A44", pos: [71, -32, 2], dot: [40, -32] },
    { text: "Coyuya", color: "#009A44", pos: [71, -26, 2], dot: [40, -26] },
    { text: "La Viga", color: "#009A44", pos: [46, -12, 2], dot: [15, -12] },
    { text: "Obrera", color: "#009A44", pos: [15, -16, 2], dot: [-2, 7], rotation: -45 },
    { text: "Doctores", color: "#009A44", pos: [23, 14, 2], dot: [-10, 15] },
    { text: "San Juan\nde Letrán", color: "#009A44", pos: [21, 32, 2], dot: [-10, 32] },
    { text: "Puebla", color: "#592C18", pos: [65, -34, 2], dot: [65, -2], rotation: -90 },
    { text: "Ciudad Deportiva", color: "#592C18", pos: [61, -37, 2], dot: [61, -6], rotation: -90 },
    { text: "Velódromo", color: "#592C18", pos: [53, -37, 2], dot: [53, -6], rotation: -90 },
    { text: "Mixiuhca", color: "#592C18", pos: [66, -3, 2], dot: [44, -6] },
    { text: "Lázaro Cárdenas", color: "#592C18", pos: [9, -10, 2], dot: [-8, -6] },
    { text: "Chilpancingo", color: "#592C18", pos: [-19, -3, 2], dot: [-38, -6] },
    { text: "Patriotismo", color: "#592C18", pos: [-30, -10, 2], dot: [-52, -6] },
    { text: "Tláhuac", color: "#CBA135", pos: [94, -120, 2], dot: [79, -119] },
    { text: "Tlaltenco", color: "#CBA135", pos: [87, -115, 2], dot: [75, -114] },
    { text: "Zapotitlán", color: "#CBA135", pos: [81, -110, 2], dot: [70, -109] },
    { text: "Nopalera", color: "#CBA135", pos: [78, -105, 2], dot: [65, -104] },
    { text: "Olivos", color: "#CBA135", pos: [77, -100, 2], dot: [60, -99] },
    { text: "Tezonco", color: "#CBA135", pos: [70, -95, 2], dot: [56, -94] },
    { text: "Periférico Oriente", color: "#CBA135", pos: [50, -90, 2], dot: [51, -89] },
    { text: "Calle 11", color: "#CBA135", pos: [59, -83, 2], dot: [45, -83] },
    { text: "Lomas Estrella", color: "#CBA135", pos: [50, -78, 2], dot: [45, -78] },
    { text: "San Andrés\nTomatlán", color: "#CBA135", pos: [55, -71, 2], dot: [45, -71] },
    { text: "Culhuacán", color: "#CBA135", pos: [56, -64, 2], dot: [45, -64] },
    { text: "Atlalilco", color: "#000000", pos: [59, -59, 2], dot: [45, -55] },
    { text: "Mexicaltzingo", color: "#CBA135", pos: [47, -50, 2], dot: [29, -55] },
    { text: "Eje\nCentral", color: "#CBA135", pos: [26, -41, 2], dot: [-3, -46] },
    { text: "Parque de\nlos Venados", color: "#CBA135", pos: [15, -26, 2], dot: [-6, -32] },
    { text: "Hospital 20\nde Noviembre", color: "#CBA135", pos: [-20, -39, 2], dot: [-47, -32] },
    { text: "Insurgentes\nSur", color: "#CBA135", pos: [-32, -26, 2], dot: [-59, -32] },
    { text: "Universidad", color: "#AF9800", pos: [6, -66, 2], dot: [-25, -66] },
    { text: "Copilco", color: "#AF9800", pos: [6, -60, 2], dot: [-25, -60] },
    { text: "M.A. de Quevedo", color: "#AF9800", pos: [-25, -54, 2], dot: [-25, -54] },
    { text: "Viveros", color: "#AF9800", pos: [6, -48, 2], dot: [-25, -48] },
    { text: "Coyoacán", color: "#AF9800", pos: [6, -41, 2], dot: [-25, -41] },
    { text: "Zapata", color: "#000000", pos: [6, -36, 2], dot: [-25, -32] },
    { text: "División\ndel Norte", color: "#AF9800", pos: [-13, -25, 2], dot: [-25, -25] },
    { text: "Eugenia", color: "#AF9800", pos: [-11, -18, 2], dot: [-25, -18] },
    { text: "Etiopía", color: "#AF9800", pos: [-10, -12, 2], dot: [-25, -12] },
    { text: "Centro\nMédico", color: "#000000", pos: [6, -1, 2], dot: [-25, -6] },
    { text: "Hospital\nGeneral", color: "#AF9800", pos: [6, 6, 2], dot: [-25, 6] },
    { text: "Niños\nHéroes", color: "#AF9800", pos: [6, 13, 2], dot: [-25, 13] },
    { text: "Juárez", color: "#AF9800", pos: [6, 31, 2], dot: [-25, 31] },
    { text: "Tlatelolco", color: "#AF9800", pos: [-13, 60, 2], dot: [-25, 57] },
    { text: "Potrero", color: "#AF9800", pos: [23, 73, 2], dot: [-9, 73] },
    { text: "Autobuses\ndel Norte", color: "#FFD100", pos: [-4, 68, 2], dot: [-19, 73] },
    { text: "La Raza", color: "#000000", pos: [18, 68, 2], dot: [-14, 68] },
    { text: "Misterios", color: "#FFD100", pos: [23, 65, 2], dot: [-9, 63] },
    { text: "Valle\nGómez", color: "#FFD100", pos: [39, 65, 2], dot: [12, 59] },
    { text: "Eduardo\nMolina", color: "#FFD100", pos: [76, 59, 2], dot: [42, 59] },
    { text: "Aragón", color: "#FFD100", pos: [80, 53, 2], dot: [48, 53] },
    { text: "Terminal\nAérea", color: "#FFD100", pos: [100, 27, 2], dot: [69, 27] },
    { text: "Hangares", color: "#FFD100", pos: [100, 16, 2], dot: [69, 16] },
    { text: "Pantitlán", color: "#000000", pos: [100, 3, 2], dot: [69, 2] },
    { text: "Zaragoza", color: "#F05A93", pos: [73, 1, 2], dot: [60, 2] },
    { text: "Gómez Farías", color: "#F05A93", pos: [61, 5, 2], dot: [56, 7] },
    { text: "Blvd. Pto.\nAéreo", color: "#F05A93", pos: [64, 11, 2], dot: [52, 12] },
    { text: "Balbuena", color: "#F05A93", pos: [64, 18, 2], dot: [52, 18] },
    { text: "Moctezuma", color: "#F05A93", pos: [60, 23, 2], dot: [47, 27] },
    { text: "Merced", color: "#F05A93", pos: [46, 21, 2], dot: [16, 23] },
    { text: "Isabel\nla Católica", color: "#F05A93", pos: [21, 25, 2], dot: [0, 20] },
    { text: "Salto del\nAgua", color: "#000000", pos: [5, 25, 2], dot: [-10, 20] },
    { text: "Balderas", color: "#000000", pos: [-29, -11, 2], dot: [-25, 20], rotation: -90 },
    { text: "Cuauhtémoc", color: "#F05A93", pos: [-18, 23, 2], dot: [-32, 20] },
    { text: "Insurgentes", color: "#F05A93", pos: [-34, 18, 2], dot: [-40, 20] },
    { text: "Sevilla", color: "#F05A93", pos: [-15, 12, 2], dot: [-48, 12] },
    { text: "Chapultepec", color: "#F05A93", pos: [-21, 7, 2], dot: [-53, 7] },
    { text: "Juanacatlán", color: "#F05A93", pos: [-27, 1, 2], dot: [-59, 1] },
    { text: "Tasqueña", color: "#0072CE", pos: [22, -58, 2], dot: [10, -59] },
    { text: "General Anaya", color: "#0072CE", pos: [14, -53, 2], dot: [10, -53] },
    { text: "Ermita", color: "#000000", pos: [41, -45, 2], dot: [10, -46] },
    { text: "Portales", color: "#0072CE", pos: [41, -41, 2], dot: [10, -41] },
    { text: "Nativitas", color: "#0072CE", pos: [41, -36, 2], dot: [10, -36] },
    { text: "Villa de\nCortés", color: "#0072CE", pos: [41, -29, 2], dot: [10, -29] },
    { text: "Xola", color: "#0072CE", pos: [29, -21, 2], dot: [10, -21] },
    { text: "Viaducto", color: "#0072CE", pos: [23, -14, 2], dot: [10, -14] },
    { text: "Chabacano", color: "#000000", pos: [41, -3, 2], dot: [10, -6] },
    { text: "San Antonio\nAbad", color: "#0072CE", pos: [40, 2, 2], dot: [10, 2] },
    { text: "Pino\nSuárez", color: "#000000", pos: [41, 14, 2], dot: [10, 20] },
    { text: "Zócalo", color: "#0072CE", pos: [41, 31, 2], dot: [10, 31] },
    { text: "Allende", color: "#0072CE", pos: [21, 37, 2], dot: [6, 39] },
    { text: "Bellas\nArtes", color: "#000000", pos: [7, 37, 2], dot: [-10, 44] },
    { text: "Hidalgo", color: "#000000", pos: [-10, 47, 2], dot: [-25, 44] },
    { text: "Revolución", color: "#0072CE", pos: [-32, 12, 2], dot: [-31, 44], rotation: -90 },
    { text: "San Cosme", color: "#0072CE", pos: [-38, 12, 2], dot: [-37, 44], rotation: -90 },
    { text: "Normal", color: "#0072CE", pos: [-44, 12, 2], dot: [-43, 44], rotation: -90 },
    { text: "Colegio Militar", color: "#0072CE", pos: [-50, 12, 2], dot: [-49, 44], rotation: -90 },
    { text: "Popotla", color: "#0072CE", pos: [-27, 48, 2], dot: [-56, 45] },
    { text: "Cuitláhuac", color: "#0072CE", pos: [-32, 53, 2], dot: [-61, 50] },
    { text: "Buenavista", color: "#B1B3B3", pos: [-16, 54, 2], dot: [-34, 50] },
    { text: "Guerrero", color: "#000000", pos: [-3, 72, 2], dot: [-25, 50], rotation: 45},
    { text: "Garibaldi", color: "#000000", pos: [20, 47, 2], dot: [-10, 50] },
    { text: "Lagunilla", color: "#B1B3B3", pos: [28, 54, 2], dot: [-1, 50] },
    { text: "Tepito", color: "#B1B3B3", pos: [43, 46, 2], dot: [14, 50] },
    { text: "San\nLázaro", color: "#000000", pos: [65, 42, 2], dot: [36, 36] },
    { text: "R. Flores Magón", color: "#B1B3B3", pos: [67, 13, 2], dot: [45, 36], rotation: -45 },
    { text: "R. Rubio", color: "#B1B3B3", pos: [75, 17, 2], dot: [53, 40], rotation: -45 },
    { text: "Oceanía", color: "#000000", pos: [90, 45, 2], dot: [57, 45] },
    { text: "Deportivo Oceanía", color: "#B1B3B3", pos: [94, 49, 2], dot: [61, 49] },
    { text: "Bosque de Aragón", color: "#B1B3B3", pos: [96, 55, 2], dot: [65, 53] },
    { text: "Villa de Aragón", color: "#B1B3B3", pos: [96, 61, 2], dot: [65, 61] },
    { text: "Nezahualcóyotl", color: "#B1B3B3", pos: [96, 67, 2], dot: [65, 67] },
    { text: "Impulsora", color: "#B1B3B3", pos: [96, 72, 2], dot: [65, 72] },
    { text: "Río de los\nRemedios", color: "#B1B3B3", pos: [96, 78, 2], dot: [65, 78] },
    { text: "M. Múzquiz", color: "#B1B3B3", pos: [96, 84, 2], dot: [65, 84] },
    { text: "Ecatepec", color: "#B1B3B3", pos: [96, 90, 2], dot: [65, 90] },
    { text: "Olímpica", color: "#B1B3B3", pos: [96, 96, 2], dot: [65, 96] },
    { text: "Plaza Aragón", color: "#B1B3B3", pos: [96, 101, 2], dot: [65, 101] },
    { text: "Ciudad Azteca", color: "#B1B3B3", pos: [96, 107, 2], dot: [65, 107] },
    { text: "Santa Anita", color: "#000000", pos: [49, -21, 2], dot: [30, -16] },
    { text: "Jamaica", color: "#000000", pos: [61, -10, 2], dot: [30, -6] },
    { text: "F. Servando", color: "#61C2A5", pos: [40, 8, 2], dot: [30, 8] },
    { text: "Candelaria", color: "#000000", pos: [40, 37, 2], dot: [30, 35] },
    { text: "Morelos", color: "#000000", pos: [44, 42, 2], dot: [30, 43] },
    { text: "Canal del\nNorte", color: "#61C2A5", pos: [61, 50, 2], dot: [30, 50] },
    { text: "Consulado", color: "#000000", pos: [61, 65, 2], dot: [30, 59] },
    { text: "Bondojito", color: "#61C2A5", pos: [61, 70, 2], dot: [30, 70] },
    { text: "Talismán", color: "#61C2A5", pos: [61, 75, 2], dot: [30, 75] },
    { text: "Martín Carrera", color: "#000000", pos: [61, 80, 2], dot: [30, 80] },
    { text: "La Villa", color: "#ED1C24", pos: [34, 76, 2], dot: [10, 80] },
    { text: "Indios Verdes", color: "#AF9800", pos: [26, 96, 2], dot: [-5, 95] },
    { text: "Deportivo\n18 de Marzo", color: "#000000", pos: [26, 86, 2], dot: [-5, 80] },
    { text: "Lindavista", color: "#ED1C24", pos: [6, 84, 2], dot: [-16, 80] },
    { text: "Politécnico", color: "#FFD100", pos: [-22, 94, 2], dot: [-32, 95] },
    { text: "Instituto del\nPetróleo", color: "#000000", pos: [-1, 89, 2], dot: [-26, 80] },
    { text: "Vallejo", color: "#ED1C24", pos: [-34, 48, 2], dot: [-34, 80], rotation: -90 },
    { text: "Norte 45", color: "#ED1C24", pos: [-42, 48, 2], dot: [-42, 80], rotation: -90 },
    { text: "Ferrería", color: "#ED1C24", pos: [-50, 48, 2], dot: [-50, 80], rotation: -90 },
    { text: "Azcapotzalco", color: "#ED1C24", pos: [-58, 48, 2], dot: [-58, 80], rotation: -90 },
    { text: "Tezozómoc", color: "#ED1C24", pos: [-33, 87, 2], dot: [-62, 84] },
    { text: "El Rosario", color: "#000000", pos: [-40, 93, 2], dot: [-67, 89] },
    { text: "Aquiles\nSerdán", color: "#E46C0A", pos: [-51, 79, 2], dot: [-67, 79] },
    { text: "Camarones", color: "#E46C0A", pos: [-57, 68, 2], dot: [-67, 68] },
    { text: "Panteones", color: "#000000", pos: [-55, 59, 2], dot: [-67, 56] },
    { text: "Cuatro\nCaminos", color: "#0072CE", pos: [-61, 50, 2], dot: [-88, 56] },
    { text: "San Joaquín", color: "#E46C0A", pos: [-58, 42, 2], dot: [-67, 42] },
    { text: "Polanco", color: "#E46C0A", pos: [-52, 30, 2], dot: [-67, 30] },
    { text: "Auditorio", color: "#E46C0A", pos: [-54, 18, 2], dot: [-67, 18] },
    { text: "Constituyentes", color: "#E46C0A", pos: [-61, 6, 2], dot: [-67, 6] },
    { text: "Tacubaya", color: "#000000", pos: [-54, -5, 2], dot: [-67, -6] },
    { text: "Observatorio", color: "#F05A93", pos: [-67, -16, 2], dot: [-75, -15] },
    { text: "San Pedro\nde los Pinos", color: "#E46C0A", pos: [-36, -16, 2], dot: [-67, -16] },
    { text: "San Antonio", color: "#E46C0A", pos: [-58, -22, 2], dot: [-67, -22] },
    { text: "Mixcoac", color: "#000000", pos: [-52, -31, 2], dot: [-67, -32] },
    { text: "Barranca\ndel Muerto", color: "#E46C0A", pos: [-36, -43, 2], dot: [-67, -45] }
];
stationsData.forEach(st => {
    createTextPlane({
        text: st.text,
        color: st.color,
        position: st.pos,
        dotPosition: st.dot,
        rotation: st.rotation || 0
    });
});

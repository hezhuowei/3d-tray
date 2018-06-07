"use strict";

/*监控*/
const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
stats.showPanel(0);

!function () {
    const config = {
        "width": 10,
        "height": 20,
        "cube_size": 10
    };
    const cube_size = config.cube_size;
    const canvas_width = document.getElementById('tray-canvas').clientWidth;
    const canvas_height = document.getElementById('tray-canvas').clientHeight;

    /*定义场景*/
    const scene = new THREE.Scene();
    /*镜头*/
    const camera = new THREE.PerspectiveCamera(
        50,
        canvas_width / canvas_height,
        1,
        5000
    );
    camera.position.set(parseInt(config.width / 2) * cube_size, parseInt(config.height/2)*cube_size, 300);
    camera.lookAt(parseInt(config.width / 2) * cube_size, parseInt(config.height/2)*cube_size, 0);
    /*定义渲染器*/
    const renderer = new THREE.WebGLRenderer(
        {
            canvas: document.getElementById('tray-canvas'),
            antialias: true
        }
    );
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    renderer.setSize(canvas_width, canvas_height);

    /*定义几何体*/
    const cube_geometry = new THREE.BoxGeometry(cube_size, cube_size, cube_size, 1, 1, 1);
    /*材质*/
    const material = [
        new THREE.MeshLambertMaterial({color: 0xE03636, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0xEDD0BE, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0xFF534D, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0xF6D6FF, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0x25C6FC, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0xEAF048, transparent: true, opacity: 0.95}),
        new THREE.MeshLambertMaterial({color: 0x9FF048, transparent: true, opacity: 0.95}),
    ];
    /*地板*/
    const plane_geometry = new THREE.PlaneGeometry(500, 500);
    const plane_material = new THREE.MeshLambertMaterial({color: 0x888888});
    const plane = new THREE.Mesh(plane_geometry, plane_material);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2 * cube_size;
    plane.receiveShadow = true;

    /*点光源*/
    const spotlight = new THREE.SpotLight(0xffffff, 2, 1000, 90, 1, 2);
    spotlight.castShadow = true;
    spotlight.target = plane;
    spotlight.position.set(100, 200, 400);


    /*环境光*/
    const ambient = new THREE.AmbientLight(0xffffff);
    ambient.intensity = 0.5;


    scene.add(plane, spotlight, ambient);

    class T {
        constructor(x, y, shape) {
            this.shape = shape;
            this.cube_items = [
                new THREE.Mesh(cube_geometry, material[shape]),
                new THREE.Mesh(cube_geometry, material[shape]),
                new THREE.Mesh(cube_geometry, material[shape]),
                new THREE.Mesh(cube_geometry, material[shape]),
            ];
            for (let i in this.cube_items) {
                this.cube_items[i].castShadow = true;
                this.cube_items[i].receiveShadow = true;
            }
            switch (shape) {
                case 0:
                    /*T*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size + cube_size, y * cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size - cube_size, y * cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    break;
                case 1:
                    /*O*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size + cube_size, y * cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size + cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    break;
                case 2:
                    /*S*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size + cube_size, y * cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size - cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    break;
                case 3:
                    /*Z*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size - cube_size, y * cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size + cube_size, y * cube_size - cube_size, 0);
                    break;
                case 4:
                    /*J*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size, y * cube_size + cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size - cube_size, y * cube_size - cube_size, 0);
                    break;
                case 5:
                    /*L*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size, y * cube_size + cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size + cube_size, y * cube_size - cube_size, 0);
                    break;
                case 6:
                    /*I*/
                    this.cube_items[0].position.set(x * cube_size, y * cube_size, 0);
                    this.cube_items[1].position.set(x * cube_size, y * cube_size + cube_size, 0);
                    this.cube_items[2].position.set(x * cube_size, y * cube_size - cube_size, 0);
                    this.cube_items[3].position.set(x * cube_size, y * cube_size + 2 * cube_size, 0);
                    break;
                default:
                    console.log("error");
            }
        }

        down() {
            if (!is_paused) {

                if (tetromino.cube_items)
                    overlap();

                if (isoverlap === true) {
                    tetromino = next_tetromino;
                    for (let i in tetromino.cube_items) {
                        scene.add(tetromino.cube_items[i]);
                    }
                    next_tetromino = new T(parseInt(config.width / 2), config.height, Math.floor(Math.random() * 7))
                } else {
                    for (let i in this.cube_items) {
                        this.cube_items[i].position.y -= cube_size
                    }
                }
                gameover();
            }


        }

        left() {
            if (!is_paused) {
                let isoverlap = false;
                for (let i in this.cube_items) {
                    if (this.cube_items[i].position.x <= 0) {
                        isoverlap = true

                    }
                    let y = this.cube_items[i].position.y / cube_size;
                    for (let x in stacking[y]) {
                        if (stacking[y][x].cube != null && stacking[y][x].cube.position.x === this.cube_items[i].position.x - cube_size) {
                            isoverlap = true
                        }
                    }
                }
                if (!isoverlap) {
                    for (let i in this.cube_items) {
                        this.cube_items[i].position.x -= cube_size
                    }
                }
            }

        }

        right() {
            if (!is_paused) {
                let isoverlap = false;
                for (let i in this.cube_items) {
                    if (this.cube_items[i].position.x >= (config.width - 1) * cube_size) {
                        isoverlap = true

                    }
                    let y = this.cube_items[i].position.y / cube_size;
                    for (let x in stacking[y]) {
                        if (stacking[y][x].cube != null && stacking[y][x].cube.position.x === this.cube_items[i].position.x + cube_size) {
                            isoverlap = true
                        }
                    }
                }
                if (!isoverlap) {
                    for (let i in this.cube_items) {
                        this.cube_items[i].position.x += cube_size

                    }
                }
            }
        }

        rotate() {
            if (!is_paused) {
                /*防止旋转后出边界*/
                for (let i in this.cube_items) {
                    let x = this.cube_items[i].position.x;
                    let y = this.cube_items[i].position.y;
                    let c_x = this.cube_items[0].position.x;
                    let c_y = this.cube_items[0].position.y;
                    let new_x = -(y - c_y) + c_x;
                    if (new_x < 0) {
                        this.right()
                    }
                    if (new_x > (config.width - 1) * cube_size) {
                        this.left()
                    }
                }
                /*旋转*/
                for (let i in this.cube_items) {

                    let x = this.cube_items[i].position.x;
                    let y = this.cube_items[i].position.y;
                    let c_x = this.cube_items[0].position.x;
                    let c_y = this.cube_items[0].position.y;
                    this.cube_items[i].position.x = -(y - c_y) + c_x;
                    this.cube_items[i].position.y = x - c_x + c_y;

                }
            }

        }
    }

    let stacking = [];
    /*游戏逻辑*/
    let is_paused = false;
    let next,level,lines;
    /*初始化*/
    const init = () => {

        /*游戏边框*/
        const frames_width_g = new THREE.BoxGeometry(config.width * cube_size, cube_size, cube_size);
        const frames_height_g = new THREE.BoxGeometry(cube_size, config.height * cube_size + 2*cube_size, cube_size);
        const frames_m =new THREE.MeshLambertMaterial({color: 0xB7B7B7, transparent: true, opacity: 1});
        const frames = [];
        frames["left"] = new THREE.Mesh(frames_height_g, frames_m);
        frames["left"].position.set(-cube_size,(config.height-1)/2*cube_size,0);
        frames["right"] = new THREE.Mesh(frames_height_g, frames_m);
        frames["right"].position.set((config.width-1)*cube_size+cube_size,(config.height-1)/2*cube_size,0);
        frames["top"] = new THREE.Mesh(frames_width_g, frames_m);
        frames["top"].position.set((config.width-1)*cube_size/2,config.height*cube_size,0);
        frames["bottom"] = new THREE.Mesh(frames_width_g, frames_m);
        frames["bottom"].position.set((config.width-1)*cube_size/2,-cube_size,0);
        for (let i in frames){
            scene.add(frames[i])
        }

        /*初始化方块堆*/
        for (let y = 0; y < config.height + 3; y++) {
            stacking[y] = [];
            for (let x = 0; x < config.width; x++) {
                stacking[y][x] = {"cube": null,};
            }
        }
        /*第一次载入方块*/
        for (let i in tetromino.cube_items) {
            scene.add(tetromino.cube_items[i]);
        }
        /*键盘监听*/
        window.onkeydown = (e) => {

            switch (e.key) {
                case "a":
                case "A":
                    tetromino.left();
                    break;
                case "d":
                case "D":
                    tetromino.right();
                    break;

                case "s":
                case "S":
                    tetromino.down();
                    break;
                case "w":
                case "W":
                    tetromino.rotate();
                    break;
                case "p":
                case"P":
                    is_paused = !is_paused;
                    break;
                case" ":
                    while (!isoverlap){
                        tetromino.down();
                    }
                default:
                    break;
            }
        }
    };


    let tetromino = new T(parseInt(config.width / 2), config.height, Math.floor(Math.random() * 7));
    let next_tetromino = new T(parseInt(config.width / 2), config.height, Math.floor(Math.random() * 7));
    let isoverlap;
    /*消除一行*/
    const line_clear = () => {
        for (let y = 0; y < stacking.length; y++) {
            /*判断一行是否存在空白*/
            let without_gaps = true;
            for (let x in stacking[y]) {
                if (!stacking[y][x].cube) {
                    without_gaps = false
                }
            }
            if (without_gaps) {
                /*从场景移除这一行的所有方块*/
                for (let x in stacking[y]) {
                    if (stacking[y][x].cube !== null) {
                        scene.remove(stacking[y][x].cube)
                    }
                }
                /*场景中,方块堆下移一格*/
                for (let iy = y; iy < stacking.length; iy++) {
                    for (let x in stacking[iy]) {
                        if (stacking[iy][x].cube !== null) {
                            let old = stacking[iy][x].cube.position.y;
                            stacking[iy][x].cube.position.y -= cube_size;
                            console.log(stacking[iy][x].cube.position.y + "," + old + "," + cube_size)
                        }
                    }
                }
                stacking.splice(y, 1);

                let new_line = [];
                for (let x = 0; x < config.width; x++) {
                    new_line[x] = {"cube": null}
                }
                stacking.push(new_line);
                y--;

            }
        }
    };
    const gameover=()=>{
        for(let i in stacking[config.height-1]){
            if(stacking[config.height-1][i].cube!=null){
                restart();
                break;
            }
        }
    };
    const restart=()=>{
        /*清楚场景方块*/
        for(let y in stacking){
            for (let x in stacking[y]){
                if(stacking[y][x].cube!=null){
                    scene.remove(stacking[y][x].cube);
                }
            }
        }
        /*重置方块堆*/
        for (let y = 0; y < config.height + 3; y++) {
            stacking[y] = [];
            for (let x = 0; x < config.width; x++) {
                stacking[y][x] = {"cube": null,};
            }
        }
    };
    /*碰撞检测*/
    const overlap = () => {
        isoverlap = false;
        const stacking_add = () => {
            for (let i in tetromino.cube_items) {
                /*返回下降方块坐标*/
                let x = tetromino.cube_items[i].position.x / cube_size;
                let y = tetromino.cube_items[i].position.y / cube_size;
                let shape = tetromino.shape;
                stacking[y][x].cube = new THREE.Mesh(cube_geometry, material[shape]);
                stacking[y][x].cube.position.set(x * cube_size, y * cube_size, 0);
                stacking[y][x].cube.castShadow = true;
                scene.add(stacking[y][x].cube);
                /*碰撞后移除下降方块*/
                scene.remove(tetromino.cube_items[i])
            }
            line_clear();
        };
        out:
            for (let i in tetromino.cube_items) {
                /*碰撞到地面*/
                if (tetromino.cube_items[i].position.y <= 0) {

                    stacking_add();
                    isoverlap = true;
                    break;
                }
                /*向下碰撞到方块堆*/
                let x = tetromino.cube_items[i].position.x / cube_size;
                for (let y = config.height - 1; y >= 0; y--) {
                    if (stacking[y][x].cube !== null) {

                        if (y === tetromino.cube_items[i].position.y / cube_size - 1) {
                            stacking_add();
                            isoverlap = true;
                            break out;
                        }
                    }
                }
            }

    };

    /*定时下落*/
    setInterval(() => {
        tetromino.down()
    }, 50);

    /*渲染*/
    const render = () => {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(render)
    };

    init();
    requestAnimationFrame(render);
}();

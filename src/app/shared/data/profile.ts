interface Presentation {
    name: string;
    profession: string;
    description: string;
}

interface Service {
    icon: string;
    title: string;
}

interface Analytics {
    years_experience: number;
    complete_projects: number;
    profesional_goals: number;
}

interface Services {
    main_services: Service[];
    analytics: Analytics;
}

interface StackItem {
    id: string;
    src: string;
    height: number;
}

interface PortfolioItem {
    id: string;
    main_img: string;
    modal_imgs: string[];
    title: string;
    stack:StackItem[][][];
    stackmodal: string; // HTML string
}
//Para los IDS no dejar espacios, genera conflictos en la aplicacion y no funciona adecuadamente.
export class Profile {
    public presentation: Presentation;
    public services: Services;
    public stack: StackItem[][][];
    public portfolio: PortfolioItem[][];

    constructor() {
        this.presentation = {
            name: "Soy, Jose Andrei Pinto",
            profession: "Desarrollador de Software",
            description: "Soy profesional en Ingenieria de Sistemas y Computacion con 5 años de experiencia en desarrollo y arquitectura de software. Me interesa profesionalmente el desarrollo de software, arquitectura de software, arquitectura en la nube, IA para procesamiento de datos, asesoría en procedimientos de sistemas."
        };

        this.services = {
            main_services: [
                {
                    icon: "fa-solid fa-code text-center mt-4 mb-4",
                    title: "Arquitectura y desarrollo de software"
                },
                {
                    icon: "fa-solid fa-magnifying-glass-chart text-center mt-5 mb-4",
                    title: "Data Analytics"
                },
                {
                    icon: "fa-solid fa-microchip text-center mt-5 mb-4",
                    title: "Consultoria"
                }
            ],
            analytics: {
                years_experience: 5,
                complete_projects: 25,
                profesional_goals: 10
            }
        };

        this.stack = [
            [
                [
                    { id: "html", src: "assets/img/stacks/html.png", height: 80 },
                    { id: "css", src: "assets/img/stacks/css.png", height: 80 },
                    { id: "javascript", src: "assets/img/stacks/javascript.png", height: 80 },
                    { id: "typescript", src: "assets/img/stacks/typescript.png", height: 80 }
                ],
                [
                    { id: "angular", src: "assets/img/stacks/angular.png", height: 80 },
                    { id: "ionic", src: "assets/img/stacks/ionic.png", height: 80 },
                    { id: "laravel", src: "assets/img/stacks/laravel.png", height: 80 }
                ]
            ],
            [
                [
                    { id: "python", src: "assets/img/stacks/python.svg", height: 80 },
                    { id: "java", src: "assets/img/stacks/java.png", height: 80 },
                    { id: "php", src: "assets/img/stacks/php.png", height: 80 }
                ],
                [
                    { id: "msqls", src: "assets/img/stacks/msqls.png", height: 80 },
                    { id: "postgres", src: "assets/img/stacks/postgres.png", height: 80 },
                    { id: "mysql", src: "assets/img/stacks/mysql.svg", height: 80 }
                ]
            ],
            [
                [
                    { id: "google", src: "assets/img/stacks/google.png", height: 80 },
                    { id: "azure", src: "assets/img/stacks/azure.png", height: 80 }
                ],
                [
                    { id: "firebase", src: "assets/img/stacks/firebase.png", height: 80 },
                    { id: "looker", src: "assets/img/stacks/looker.png", height: 80 },
                    { id: "docker", src: "assets/img/stacks/docker.png", height: 80 },
                    { id: "powerbi", src: "assets/img/stacks/powerbi.png", height: 80 }
                ]
            ]
        ];

        this.portfolio = [
            [
                {
                    id: "Inventario",
                    main_img: "assets/img/portafolio/inventarios1.webp",
                    modal_imgs: [
                        "assets/img/portafolio/inventarios1.webp",
                        "assets/img/portafolio/inventarios2.webp",
                        "assets/img/portafolio/inventarios3.webp"
                    ],
                    title: "Sistema de Inventario",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/php.png" alt="php">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/laravel.png" alt="laravel">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/mysql.svg" alt="mysql">
                            </div>
                        </div>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/html.png" alt="html">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/css.png" alt="css">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/javascript.png" alt="javascript">
                            </div>
                        </div>
                    </div>`
                },
                {
                    id: "Dashboard",
                    main_img: "assets/img/portafolio/dashboard.webp",
                    modal_imgs: [
                        "assets/img/portafolio/dashboard.webp"
                    ],
                    title: "Dashboard",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/php.png" alt="php">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/mysql.svg" alt="mysql">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/powerbi.png" alt="powerbi">
                            </div>
                        </div>
                    </div>`
                },
                {
                    id: "Temperatura",
                    main_img: "assets/img/portafolio/temperatura.webp",
                    modal_imgs: [
                        "assets/img/portafolio/temperatura.webp",
                        "assets/img/portafolio/temperatura1.webp"
                    ],
                    title: "Sistema de Temperaturas",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/java.png" alt="java">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/firebase.png" alt="firebase">
                            </div>
                        </div>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/html.png" alt="html">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/css.png" alt="css">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/javascript.png" alt="javascript">
                            </div>
                        </div>
                    </div>`
                }
            ],
            [
                {
                    id: "CRMAPP",
                    main_img: "assets/img/portafolio/crmapp.webp",
                    modal_imgs: [
                        "assets/img/portafolio/crmapp.webp",
                        "assets/img/portafolio/crmapp1.webp"
                    ],
                    title: "CRM",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/python.svg" alt="python">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/firebase.png" alt="firebase">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/angular.png" alt="angular">
                            </div>
                        </div>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/html.png" alt="html">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/css.png" alt="css">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/typescript.png" alt="typescript">
                            </div>
                        </div>
                    </div>`
                },
                {
                    id: "AppSoporte",
                    main_img: "assets/img/portafolio/inventarios1.webp",
                    modal_imgs: [
                        "assets/img/portafolio/inventarios1.webp",
                        "assets/img/portafolio/inventarios2.webp",
                        "assets/img/portafolio/inventarios3.webp"
                    ],
                    title: "Aplicacion de Soporte Tecnico",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/python.svg" alt="python">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/msqls.png" alt="msqls">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/ionic.png" alt="ionic">
                            </div>
                        </div>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/html.png" alt="html">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/css.png" alt="css">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/typescript.png" alt="typescript">
                            </div>
                        </div>
                    </div>`
                },
                {
                    id: "eCommerce",
                    main_img: "assets/img/portafolio/inventarios1.webp",
                    modal_imgs: [
                        "assets/img/portafolio/inventarios1.webp",
                        "assets/img/portafolio/inventarios2.webp",
                        "assets/img/portafolio/inventarios3.webp"
                    ],
                    title: "Aplicacion eCommerce",
                    stack:[],
                    stackmodal: `<div name="stack">
                        <h3 class="card-title text-center text-light">Stack</h5>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/python.svg" alt="python">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/firebase.png" alt="firebase">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/ionic.png" alt="ionic">
                            </div>
                        </div>
                        <div class="row pt-2 pb-2">
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/html.png" alt="html">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/css.png" alt="css">
                            </div>
                            <div class="col d-flex justify-content-center">
                                <img height="60" src="assets/img/stacks/typescript.png" alt="typescript">
                            </div>
                        </div>
                    </div>`
                }
            ]
        ];
    }
}

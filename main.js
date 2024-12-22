const {app, BrowserWindow,Menu,shell} = require("electron")

let mainWindows = null;

app.on('ready',()=>{

mainWindows = new BrowserWindow({
width: 1000,
height: 700,



})
Menu.setApplicationMenu(Menu.buildFromTemplate(abas))
mainWindows.loadFile('app/inicial.html')

})

app.on('window-all-closed',()=>{
    app.quit();

})

const abas = [
    {
        label: 'Arquivo',
        submenu:[

            {

                label:'Sair',
                click: () => app.quit(),
                accelerator:'Atl+F4' 
            },
            {
                label: 'Atualizar',
                role: 'reload'
            },
            {
                label: 'Corta',
                role: 'cut'
            },
            {
                label:'Copiar',
                role: 'copy'
            }

        ]
            

    },
    {
        label: 'Exibir',
        submenu:[
            {
                label: 'Aumentar Zoom',
                role: 'zoomIn'


            },
            {
                label: 'Diminuir Zoom',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar Zoom',
                role: 'resetZoom'
            },
            {
                label: 'Ferramenta de Desenvolvedor ',
                role: 'toggleDevTools'
            }

        ]



    },
    {
        label: 'Ajuda',
        submenu:[
            {
                label: 'Manual',
                click: () => paginaManual()

                
            }

        ]

    }
]

const paginaManual = ()=>{
    const manual = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    
    
    })
    
    manual.loadFile('app/Manual.html')
    }
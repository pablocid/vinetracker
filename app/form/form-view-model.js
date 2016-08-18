var Observable = require("data/observable").Observable;
var Auth = require("../services/auth.service");
var frame = require('ui/frame');
var ObsArray = require("data/observable-array").ObservableArray;
var http = require('http');
var dialogs = require("ui/dialogs");

function createViewModel() {
    var viewModel = new Observable();
    viewModel.schema = {
        _id:"WWWWWJ223232k",
        name:"Evaluación inicio temporada",
        inputs:[
            {
                id:"amnt",
                name:"Carga de fruta",
                shortName:"carga",
                description:" el valor esta en kilogramos",
                inputSchema:{
                    _id:"KJHJHK7657657",
                    created:"2016-07-28T13:57:10.710Z",
                    name:"simple_number",
                    dataType:"number",
                    config:{
                        theme:{},
                        regex:""
                    }
                },
                required:true,
                validate:true,
                validateType:"number",
                label:"Ingresa carga",
                msgError:[
                    {id:1, value:"Error al ingresar la cantidad bla bla"}
                ],
                regex:"\\d*2"
            }
        ]
    };

    viewModel.registro = {
        _id:"JHKHISD67786SD7687678",
        formSchema:"WWWWWJ223232k",
        created:"2016-07-28T13:57:10.710Z",
        updated:[
            {user:"OIUO89879", date:"2016-07-28T13:57:10.710Z"},
            {user:"PPPQQ2344", date:"2016-07-28T13:57:10.710Z"}
        ],
        attributes:[
            {
                id:"amnt",
                number:2,
                boolean: true,
                string:null, 
                listStr:["strings"],
                listNum:[1],
                listObj:[{}],
                value:{},
                binary:""
            }
        ]
    };
    return viewModel;
}

exports.createViewModel = createViewModel;
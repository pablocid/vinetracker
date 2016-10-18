
import {BarcodeScanner} from 'nativescript-barcodescanner';
import {PlantScanner, Scanner} from './Components/PlantScanner';
import {MultipleSelection} from './Components/MultipleSelection';
import {NumberList} from './Components/NumberList';
/**
 * Esta seccion maneja la información de plantas y los datos que se evaluan relacionados a ellas.
 * Esta implementación es específica para plantas, por lo tanto el mainSchm corresponde al : 57a4e02ec830e2bdff1a1608
 * Las subsecciones son: Consultar datos y evaluaciones disponibles
 * En Consulta de datos se pueden mostrar opciones como : Luego de scanear el codigo, mostrar datos por attributo y por evaluación
 * En las evaluaciones disponibles
 */

import { Page, ShownModallyData } from 'ui/page';
import { GridLayout } from 'ui/layouts/grid-layout';
import { parse as Parse, load as Load } from 'ui/builder';
import { EventData} from 'data/observable';
import { topmost as Topmost} from 'ui/frame';
import { HelperViewer } from  "../services/helperViewer/";
import { NavigationButton, ActionItems, ActionItem ,ActionBar, AndroidActionBarSettings, AndroidActionItemSettings} from "ui/action-bar";
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import { BasePage } from '../factories/BasePage';

import { action as Action} from 'ui/dialogs';
import { QueryParser, QueryConfig } from '../factories/QueryParser';
import { Record } from '../factories/Record';
import { FindSchm } from  "../services/record.service";
var newView = new HelperViewer();
var style = {
    paddingBT:30,
    fontSize:20
}
newView.theme = `        
    <ListView items="{{ items }}" itemTap="{{selectedOption}}">
        <ListView.itemTemplate>
            <GridLayout columns="30, *" style="font-size:${style.fontSize}; padding:10; padding-bottom:${style.paddingBT}; padding-top:${style.paddingBT};">
                <Label text="" col="0" />
                <Label text="{{ name }}" col="0" textWrap="true" col="1"/>
            </GridLayout>
        </ListView.itemTemplate>
    </ListView>
`;
var items = [
    //{name:"Consulta datos de una planta", link:""},
    {name:"Evaluaciones disponibles", link:"PlantDashboard/Evaluations/index"}
];
function selectedOption(selectedArgs){
    let index = selectedArgs.index;
    let navOpts = {
        moduleName: items[index].link,
        context:{
            fn: function(){
                console.log("en fn")
            }
        }
    }
    Topmost().navigate(navOpts);
}
newView.setBindingContext({ items:items, selectedOption:selectedOption });

var actionItem = new ActionItem();
actionItem.text = "option1";
actionItem.android.position = "popup";
actionItem.on(ActionItem.tapEvent,(args:EventData)=>{
    var msg = "evaluar ...";
    var opt1 = "una hilera";
    var opt2 = "una planta (Código QR)";
    Action({
      message: msg,
      cancelButtonText: "cancelar",
      actions: [opt1, opt2]
    }).then(result => {
        if(result === opt1){
            console.log("La primera opci0ón")
        }
        if(result === opt2){
            console.log("La segunda opci0ón")
        }
          //console.log("Dialog result: " + result)
    });
    console.log('tap on option1');
})
var b = new BasePage();

/*
b.mainContent = newView.getContent();
b.setTitleActionBar('PlantDashboard');
b.addActionItem(actionItem);
*/




/*
import { PlantScanner } from './Components/PlantScanner';
var d = new PlantScanner('683(10).6');
d.description = 'Escanea la wa';
d.callback = function(record: Record){
    console.log('Callback: el _id es '+ JSON.stringify( record.getData() ) );
}
//schm evaluation = 57c42f2fc8307cd5b82f4484
//schm attributo referencia = 57c42f77c8307cd5b82f4486
d.attrEvaluation = '57c42f77c8307cd5b82f4486';
d.schmEvaluation = '57c42f2fc8307cd5b82f4484';
d.evaluatedCheck = true;

b.mainContent = d.getView();
b.setTitleActionBar('Scan hilera status');
*/
/*
import { SelectionList } from './Components/SelectionList';
*/
/*
// selectList
var schema = [
  {
    "_id": "57febcf1179c960010e41f66",
    "type": "schema",
    "name": "fenotipado_0",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "fenotipado_0",
        "list": []
      },
      {
        "id": "description",
        "string": "Primera fenotipado de la temporada",
        "list": []
      },
      {
        "id": "attributes",
        "list": [
          "57feb94b179c960010e41f65"
        ]
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "editable",
            "string": "boolean"
          },
          {
            "id": "status",
            "string": "boolean"
          },
          {
            "id": "visible",
            "string": "boolean"
          },
          {
            "id": "creatable",
            "string": "boolean"
          },
          {
            "id": "listViewLabel",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "editable",
        "boolean": true,
        "list": []
      },
      {
        "id": "status",
        "boolean": true,
        "list": []
      },
      {
        "id": "visible",
        "boolean": true,
        "list": []
      },
      {
        "id": "creatable",
        "boolean": true,
        "list": []
      },
      {
        "id": "listViewLabel",
        "string": "Fenotipado 0",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:45:05.955Z"
  },
  {
    "_id": "57feb94b179c960010e41f65",
    "type": "attribute",
    "name": "habito_fructificacion",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "habito_fructificacion",
        "list": []
      },
      {
        "id": "description",
        "string": "Establece desde donde se genera la fruta en el cargador",
        "list": []
      },
      {
        "id": "input",
        "reference": "57fe942a45be360010073dbc",
        "list": []
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "shortName",
            "string": "string"
          },
          {
            "id": "label",
            "string": "string"
          },
          {
            "id": "options",
            "string": "listOfObj"
          },
          {
            "id": "formType",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "shortName",
        "string": "fructificación",
        "list": []
      },
      {
        "id": "label",
        "string": "Hábito de frutificación",
        "list": []
      },
      {
        "id": "formType",
        "string": "imageList",
        "list": []
      },
      {
        "id": "options",
        "listOfObj": [
            {
            "id": "short_conical",
            "string": "racimo cónico corto"
          },
          {
            "id": "conical",
            "string": "racimo cónico"
          },
          {
            "id": "long_conical",
            "string": "racimo cónico largo"
          },
          {
            "id": "cylindrical",
            "string": "racimo cilíndrico"
          },
          {
            "id": "winged",
            "string": "racimo globoso"
          },
          {
            "id": "other_choice",
            "string": "otro"
          }
        ],
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:29:31.425Z"
  },
  {
    "_id": "57fe942a45be360010073dbc",
    "type": "input",
    "name": "selection_list",
    "__v": 2,
    "attributes": [
      {
        "id": "name",
        "string": "selection_list",
        "list": []
      },
      {
        "id": "description",
        "string": "Lista de opciones para seleccionar. Se puede elegir solo una opción",
        "list": []
      },
      {
        "id": "dataType",
        "string": "string",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T19:51:06.161Z"
  }
]
*/
//numberList
/*
var schema = [
  {
    "_id": "57febcf1179c960010e41f66",
    "type": "schema",
    "name": "fenotipado_0",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "fenotipado_0",
        "list": []
      },
      {
        "id": "description",
        "string": "Primera fenotipado de la temporada",
        "list": []
      },
      {
        "id": "attributes",
        "list": [
          "57feb94b179c960010e41f65"
        ]
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "editable",
            "string": "boolean"
          },
          {
            "id": "status",
            "string": "boolean"
          },
          {
            "id": "visible",
            "string": "boolean"
          },
          {
            "id": "creatable",
            "string": "boolean"
          },
          {
            "id": "listViewLabel",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "editable",
        "boolean": true,
        "list": []
      },
      {
        "id": "status",
        "boolean": true,
        "list": []
      },
      {
        "id": "visible",
        "boolean": true,
        "list": []
      },
      {
        "id": "creatable",
        "boolean": true,
        "list": []
      },
      {
        "id": "listViewLabel",
        "string": "Fenotipado 0",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:45:05.955Z"
  },
  {
    "_id": "57feb94b179c960010e41f65",
    "type": "attribute",
    "name": "habito_fructificacion",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "habito_fructificacion",
        "list": []
      },
      {
        "id": "description",
        "string": "Establece desde donde se genera la fruta en el cargador",
        "list": []
      },
      {
        "id": "input",
        "reference": "57fe942a45be360010073dbc",
        "list": []
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "shortName",
            "string": "string"
          },
          {
            "id": "label",
            "string": "string"
          },
          {
            "id": "minVal",
            "string": "number"
          },
          {
            "id": "maxVal",
            "string": "number"
          },
          {
            "id": "unit",
            "string": "string"
          },
          {
            "id": "floatOpt",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "shortName",
        "string": "fructificación",
        "list": []
      },
      {
        "id": "label",
        "string": "Hábito de frutificación",
        "list": []
      },
      {
        "id": "minVal",
        "number": 0,
        "list": []
      },
      {
        "id": "maxVal",
        "number": 30,
        "list": []
      },
      {
        "id": "unit",
        "string": '°Brix',
        "list": []
      },
      {
        "id": "floatOpt",
        "string": 'even',
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:29:31.425Z"
  },
  {
    "_id": "57fe942a45be360010073dbc",
    "type": "input",
    "name": "selection_list",
    "__v": 2,
    "attributes": [
      {
        "id": "name",
        "string": "selection_list",
        "list": []
      },
      {
        "id": "description",
        "string": "Lista de opciones para seleccionar. Se puede elegir solo una opción",
        "list": []
      },
      {
        "id": "dataType",
        "string": "number",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T19:51:06.161Z"
  }
]
*/
//MultipleSelection
/*
var schema = [
  {
    "_id": "57febcf1179c960010e41f66",
    "type": "schema",
    "name": "fenotipado_0",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "fenotipado_0",
        "list": []
      },
      {
        "id": "description",
        "string": "Primera fenotipado de la temporada",
        "list": []
      },
      {
        "id": "attributes",
        "list": [
          "57feb94b179c960010e41f65"
        ]
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "editable",
            "string": "boolean"
          },
          {
            "id": "status",
            "string": "boolean"
          },
          {
            "id": "visible",
            "string": "boolean"
          },
          {
            "id": "creatable",
            "string": "boolean"
          },
          {
            "id": "listViewLabel",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "editable",
        "boolean": true,
        "list": []
      },
      {
        "id": "status",
        "boolean": true,
        "list": []
      },
      {
        "id": "visible",
        "boolean": true,
        "list": []
      },
      {
        "id": "creatable",
        "boolean": true,
        "list": []
      },
      {
        "id": "listViewLabel",
        "string": "Fenotipado 0",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:45:05.955Z"
  },
  {
    "_id": "57feb94b179c960010e41f65",
    "type": "attribute",
    "name": "habito_fructificacion",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "habito_fructificacion",
        "list": []
      },
      {
        "id": "description",
        "string": "Establece desde donde se genera la fruta en el cargador",
        "list": []
      },
      {
        "id": "input",
        "reference": "57fe942a45be360010073dbc",
        "list": []
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "shortName",
            "string": "string"
          },
          {
            "id": "label",
            "string": "string"
          },
          {
            "id": "options",
            "string": "listOfObj"
          },
        ],
        "list": []
      },
      {
        "id": "shortName",
        "string": "fructificación",
        "list": []
      },
      {
        "id": "label",
        "string": "Hábito de frutificación",
        "list": []
      },
      {
        "id": "options",
        "listOfObj": [
            {
            "id": "pardeamiento",
            "string": "bayas con pardeamiento"
          },
          {
            "id": "russet",
            "string": "bayas con russet"
          },
          {
            "id": "cracking",
            "string": "bayas con cracking"
          },
          {
            "id": "millarandaje",
            "string": "racimos con millarandaje"
          },
          {
            "id": "corredura",
            "string": "racimo con corredura"
          },
          {
            "id": "racimo_color_desuniforme",
            "string": "racimo con color desuniforme"
          },
          {
            "id": "calibre_desuniforme",
            "string": "racimo con calibre desuniforme"
          },
          {
            "id": "separacion_pedunculo",
            "string": "las bayas se separan fácilmente del pedúnculo"
          }
        ],
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:29:31.425Z"
  },
  {
    "_id": "57fe942a45be360010073dbc",
    "type": "input",
    "name": "selection_list",
    "__v": 2,
    "attributes": [
      {
        "id": "name",
        "string": "selection_list",
        "list": []
      },
      {
        "id": "description",
        "string": "Lista de opciones para seleccionar. Se puede elegir solo una opción",
        "list": []
      },
      {
        "id": "dataType",
        "string": "list",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T19:51:06.161Z"
  }
]
*/
var schema = [
  {
    "_id": "57febcf1179c960010e41f66",
    "type": "schema",
    "name": "fenotipado_0",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "fenotipado_0",
        "list": []
      },
      {
        "id": "description",
        "string": "Primera fenotipado de la temporada",
        "list": []
      },
      {
        "id": "attributes",
        "list": [
          "57feb94b179c960010e41f65"
        ]
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "editable",
            "string": "boolean"
          },
          {
            "id": "status",
            "string": "boolean"
          },
          {
            "id": "visible",
            "string": "boolean"
          },
          {
            "id": "creatable",
            "string": "boolean"
          },
          {
            "id": "listViewLabel",
            "string": "string"
          }
        ],
        "list": []
      },
      {
        "id": "editable",
        "boolean": true,
        "list": []
      },
      {
        "id": "status",
        "boolean": true,
        "list": []
      },
      {
        "id": "visible",
        "boolean": true,
        "list": []
      },
      {
        "id": "creatable",
        "boolean": true,
        "list": []
      },
      {
        "id": "listViewLabel",
        "string": "Fenotipado 0",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:45:05.955Z"
  },
  {
    "_id": "57feb94b179c960010e41f65",
    "type": "attribute",
    "name": "habito_fructificacion",
    "__v": 3,
    "attributes": [
      {
        "id": "name",
        "string": "habito_fructificacion",
        "list": []
      },
      {
        "id": "description",
        "string": "Establece desde donde se genera la fruta en el cargador",
        "list": []
      },
      {
        "id": "input",
        "reference": "57fe942a45be360010073dbc",
        "list": []
      },
      {
        "id": "keys",
        "listOfObj": [
          {
            "id": "shortName",
            "string": "string"
          },
          {
            "id": "label",
            "string": "string"
          },
          {
            "id": "options",
            "string": "listOfObj"
          },
        ],
        "list": []
      },
      {
        "id": "shortName",
        "string": "fructificación",
        "list": []
      },
      {
        "id": "label",
        "string": "Hábito de frutificación",
        "list": []
      },
      {
        "id": "options",
        "listOfObj": [
            {
            "id": "pardeamiento",
            "string": "bayas con pardeamiento"
          },
          {
            "id": "russet",
            "string": "bayas con russet"
          },
          {
            "id": "cracking",
            "string": "bayas con cracking"
          },
          {
            "id": "millarandaje",
            "string": "racimos con millarandaje"
          },
          {
            "id": "corredura",
            "string": "racimo con corredura"
          },
          {
            "id": "racimo_color_desuniforme",
            "string": "racimo con color desuniforme"
          },
          {
            "id": "calibre_desuniforme",
            "string": "racimo con calibre desuniforme"
          },
          {
            "id": "separacion_pedunculo",
            "string": "las bayas se separan fácilmente del pedúnculo"
          }
        ],
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T22:29:31.425Z"
  },
  {
    "_id": "57fe942a45be360010073dbc",
    "type": "input",
    "name": "selection_list",
    "__v": 2,
    "attributes": [
      {
        "id": "name",
        "string": "selection_list",
        "list": []
      },
      {
        "id": "description",
        "string": "Lista de opciones para seleccionar. Se puede elegir solo una opción",
        "list": []
      },
      {
        "id": "dataType",
        "string": "reference",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      },
      {
        "id": "shortName",
        "string": "string",
        "list": []
      },
      {
        "id": "label",
        "string": "string",
        "list": []
      },
      {
        "id": "options",
        "string": "list",
        "list": []
      }
    ],
    "updated": [],
    "created": "2016-10-12T19:51:06.161Z"
  }
]


var r = new Record(schema);
//console.log( JSON.stringify( r.getAttribute('57feb94b179c960010e41f65').dataType ) ); //57fe942a45be360010073dbc
/*
r.getAttribute('57feb94b179c960010e41f65').value = ['russet','separacion_pedunculo', 'separacion_pedunculo','calibre_desuniforme','racimo_color_desuniforme'];

var nl = new MultipleSelection(r.getAttribute('57feb94b179c960010e41f65'));
b.mainContent= nl.getView();
b.setTitleActionBar('MultipleSelection');
*/
  
/*
barcodescanner.requestCameraPermission().then(permission=>{
  if(permission){ 
      console.log('permiso a la cámara concedido')
  }else{
      console.log('permiso a la cámara denegado')
  }
});
*/

var scan = new Scanner(r.getAttribute('57feb94b179c960010e41f65'));
//var scan =  new PlantScanner();
b.mainContent = scan.getView();
b.fnOnLoad = function(){
    scan.onLoadedPage();
}
b.setTitleActionBar('Scanner', 'Escanea el código QR de una planta');





/*
var d = new SelectionList( r.getAttribute('57feb94b179c960010e41f65'));

console.log( JSON.stringify( r.data ) );

b.mainContent = d.getView();
b.setTitleActionBar('Selection List');
*/

/*
var qc = new QueryConfig();
qc.id = '57febcf1179c960010e41f66';

var schmF = new FindSchm(qc);

schmF.find().then(x=>{
    //var d = new SelectionList(x,'57feb94b179c960010e41f65');
    b.mainContent = Parse(`<StackLayout> <Label text="hola"></Label> </StackLayout> `);
    b.setTitleActionBar('Selection List');
})
*/

export = b;
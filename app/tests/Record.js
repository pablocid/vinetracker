var Record = require('../factories/Record').Record2;
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
var record = new Record(schema);

describe("Record object ", function() {
  it("_id ", function() { expect(record.schema.schm.id).toBe('57febcf1179c960010e41f66'); });
  it("attribute ", function() { expect(record.getAttribute('57feb94b179c960010e41f65').attrSchm.id).toBe('57feb94b179c960010e41f65'); });
});

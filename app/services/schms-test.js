/*

    Standard Inputs Attr: List of valid attributes:

    label
    dataType
    inputType : number, text, textarea, checkbox, selectbox, uploadFile, uploadImg, multipleSelection, 
    regex
    placeholder
    description
    msgError
    required
    validate
    validateType: //range
    visualization
    shortName
    status
    editable

    Input types:

    simple_ref
    simple_text
    simple_number
    range_number
    percentage
    selectbox_fix_options
    checkbox
    fivestars_rate
    simple_uploader_file
    siple_picture
    color_by_picture



*/
 
 exports.Individuo = function(){
     return {
            _id:"WWWWWJ223232k",
            attributes:[
                {
                    created:"2016-07-28T13:57:10.710Z",
                    attrSchm:{//evaluacion tipo
                        _id:"KJHJHK7657657",
                        id:"id",
                        created:"2016-07-28T13:57:10.710Z",
                        input:{ //campo de solo configuración, nada de visualization
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",
                            listOfAttr:["label","placeholder","regex", "dataType"],//list of compatible attributes for implementation
                            attributes:[ //attributos base del input
                                {id:"dataType", value:"number"},
                                {id:"regex", value:"\d{1-5}"}
                            ]
                        },
                        output:{//campo de solo configuración para la visualizacion, nada de visualization en si
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",
                            attributes:[
                            ]
                        },
                        attributes:[
                            {id:"description", value:"Id autoincremental"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"placeholder", value:"insert a number"},
                            {id:"regex", value:"/\d{2}"},
                            {id: "msgError", value : ["Error en A", "Error en B"] }
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"old id"},
                        {id:"description", value:"Id de la db de perrin"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Identificador antiguo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},

                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        id:"cod_indiv",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"string"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})\.\d{1-4}"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"show_simple_text",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"cod indivuo"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Código Individuo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        id:"cruzamiento",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"string"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"show_simple_text",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"cruzamiento"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Código de cruzamiento"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        id:"num_indiv",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"number"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"show_simple_text",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"num individuo"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Número de indiviuo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        id:"fecha_identific",
                        created:"2016-07-28T13:57:10.710Z",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"date"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"show_simple_text",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"cross date"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Fecha de cruzamiento"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        id:"ubicacion",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"simple_text_input",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"string"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text_output",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"ubicación"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Ubicación en campo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                },
                {
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        id:"espaldera",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"simple_text_input",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text",
                            attributes:[
                                {id:"dataType", value:"number"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}(\d{2})"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_text_output",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:null}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"espaldera"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Ubicada en la espaldera"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                    ]
                }
            ]
        };
 }
/* En este diseño es obligatorio que cada schema tenga un attributo y a su vez, cada attributo tengo un registro asociado attrConfig*/
 exports.newIndividuo = function(){
    var r1 = [
        /*** **********  SCHEMA *******************+ */
        { //campaña
            _id:"57a4e02ec830e2bdff1a1608",
           type:"schema",
            attributes:[
                {id:"name", string:"individuos"},
                {id:"attributes", list:["id","cod_indiv"]}, //list or listOfRef
                {id:"keys", listOfObj:[
                    {id:"editable", string:"boolean"},
                    {id:"status", string:"boolean"},
                    {id:"registrationStart", string:"date"},
                    {id:"identifyMode", string:"string"},
                    {id:"identifyByAttr", string:"string"} ]},
                {id:"editable", boolean:true},
                {id:"status", boolean:true},
                {id:"registrationStart", date:"2016-11-1"},
                {id:"identifyMode", string:"scan"},
                {id:"identifyByAttr", string:"cod_indiv"}
            ]
        },
        /****  ID *******/
        {
            _id:"57c353b2c8307cd5b82f4479",
            type:"attribute",
            attributes:[
                {id:"name", string:"id"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"}
            ]
        },
        {
            _id:"57c0c508c8307cd5b82f445a",
            type:"input",
            attributes:[
                {id:"name", string:"simple_number"},
                {id:"dataType", string:"number"},
                {id:"attrInputConf", listOfObj:[
                    {id:"label", string:"string"},
                    {id:"inputLable", string:"string"},
                    {id:"shortName",  string:"string"},
                    {id:"regex", string:"string"},
                    {id:"rangeMax", string:"number"},
                    {id:"rangeMin", string:"number"},
                    {id:"validatorMsg", string:"string"}]},
                {id:"schmAttrInputConf", listOfObj:[
                    {id:"visualization", string:"boolean"},
                    {id:"createble", string:"boolean"},
                    {id:"editable", string:"boolean"},
                    {id:"validate", string:"boolean"},
                    {id:"required", string:"boolean"},
                    {id:"validatorMsg", string:"string"}]},
            ]
        },
        {
            _id: "57c0c585c8307cd5b82f445f",
            type:"attrInputConf",
            attributes:[
                {id:"attribute", reference:"57c353b2c8307cd5b82f4479"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"label", string:"OLDIE ID"},
                {id:"inputLable", string:"OLDIE ID output"},
                {id:"shortName", string:"id antiguo"},
                {id:"regex", string:""},
                {id:"rangeMax", number:100000},
                {id:"rangeMin", number:1},
            ]
        },
        {
            _id: "57c32362c8307cd5b82f446c",
            type:"schmAttrInputConf",
            attributes:[
                {id:"schema", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"attribute", reference:"57c353b2c8307cd5b82f4479"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"visualization", boolean:true},
                {id:"createble", boolean:true},
                {id:"editable", boolean:true},
                {id:"validate", boolean:true},
                {id:"required", boolean:true},
            ]
        },
        /****  COD_INDIV */
        {
            _id:"57c3583bc8307cd5b82f447d",
            type:"attribute",
            attributes:[
                {id:"name", string:"código de individuo"},
                {id:"input", reference:"57c3202cc8307cd5b82f4465"},
            ]
        },
        {
            _id:"57c3202cc8307cd5b82f4465",
            type:"input",
            attributes:[
                {id:"name", string:"simple_text"},
                {id:"dataType", string:"string"},
                {id:"attrInputConf", listOfObj:[
                    {id:"label", string:"string"},
                    {id:"inputLable", string:"string"},
                    {id:"shortName",  string:"string"},
                    {id:"regex", string:"string"},
                    {id:"validatorMsg", string:"string"}]},
                {id:"schmAttrInputConf", listOfObj:[
                    {id:"visualization", string:"boolean"},
                    {id:"createble", string:"boolean"},
                    {id:"editable", string:"boolean"},
                    {id:"validate", string:"boolean"},
                    {id:"required", string:"boolean"},
                    {id:"validatorMsg", string:"string"}]},
            ]
        },
        {
            _id: "57c32665c8307cd5b82f4472",
            type:"attrInputConf",
            attributes:[
                {id:"attribute", reference:"57c3583bc8307cd5b82f447d"},
                {id:"input", reference:"57c3202cc8307cd5b82f4465"},
                {id:"label", string:"Plant code"},
                {id:"inputLable", string:"Plant code"},
                {id:"shortName", string:"cod indiv"},
                {id:"regex", string:""}
            ]
        },
        {
            _id: "57c326dcc8307cd5b82f4474",
            type:"schmAttrInputConf",
            attributes:[
                {id:"schema", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"attribute", reference:"57c3583bc8307cd5b82f447d"},
                {id:"input", reference:"57c3202cc8307cd5b82f4465"},
                {id:"visualization", boolean:true},
                {id:"createble", boolean:true},
                {id:"editable", boolean:true},
                {id:"validate", boolean:true},
                {id:"required", boolean:true},
            ]
        },
        /*
        {
            _id:"cod_indiv",
            type:"attribute",
            attributes:[
                {id:"type", string:"attribute"},
                {id:"name", string:"código de individuo"},
                {id:"input", reference:"57c0c529c8307cd5b82f445c"},
            ]
        },
        {
            _id:"57c0c529c8307cd5b82f445c",
            attributes:[
                {id:"type", string:"input"},
                {id:"name", string:"simple_number"},
                {id:"dataType", string:"string"},
                {id:"optAttr", list:["type","name","dataType"]},
            ]
        },
        {
            _id: "57c0c585c8307cd5b82f445f",
            type:"attrConfig",
            attributes:[
                {id:"attribute", reference:"id"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"visualization", boolean:true},
                {id:"validate", boolean:true},
                {id:"required", boolean:true},
                {id:"label", string:"Antiguo ID Perrinesco"},
                {id:"shortName", string:"id antiguo"},
            ]
        },
        {
            _id: "57c0c590c8307cd5b82f4461",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"attribute", reference:"cod_indiv"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"attrItems", list:["type","schema","attribute","input"]},
                {id:"visualization", boolean:true},
                {id:"outputLabel", string:"Código Individuo de la base de datos"},
                {id:"inputLabel", string:"Scan the qr code"},
                {id:"label", string:"Plant code"},
                {id:"shortName", string:"codigo individuo"},
                {id:"status", boolean:false}            ]
        },
        {
            _id: "57c0e5eac8307cd5b82f4463",
            type:"schmKeyLib",
            attributes:[
                {id:"schema", string:"reference"},
                {id:"description", string:"Esta key hace referencia al schema con respecto a schmAttrInputConf"}
            ]
        }
        */
    ]


var r2 = [
    {
      "_id": "57a4e02ec830e2bdff1a1608",
      "name": "individuos",
      "type": "schema",
      "attributes": [
        {
          "id": "name",
          "string": "individuos",
          "list": []
        },
        {
          "id": "attributes",
          "list": [
            "57c353b2c8307cd5b82f4479",
            "57c3583bc8307cd5b82f447d"
          ]
        },
        {
          "id": "keys",
          "listOfObj": [
            {
              "string": "boolean",
              "id": "editable"
            },
            {
              "string": "boolean",
              "id": "status"
            },
            {
              "string": "date",
              "id": "registrationStart"
            },
            {
              "string": "string",
              "id": "identifyMode"
            },
            {
              "string": "string",
              "id": "identifyByAttr"
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
          "id": "registrationStart",
          "date": "2016-11-01T00:00:00.000Z",
          "list": []
        },
        {
          "id": "identifyMode",
          "string": "scan",
          "list": []
        },
        {
          "id": "identifyByAttr",
          "string": "cod_indiv",
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c353b2c8307cd5b82f4479",
      "type": "attribute",
      "attributes": [
        {
          "id": "name",
          "string": "id",
          "list": []
        },
        {
          "id": "input",
          "reference": "57c0c508c8307cd5b82f445a",
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c3583bc8307cd5b82f447d",
      "type": "attribute",
      "attributes": [
        {
          "id": "name",
          "string": "código de individuo",
          "list": []
        },
        {
          "id": "input",
          "reference": "57c3202cc8307cd5b82f4465",
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c3202cc8307cd5b82f4465",
      "type": "input",
      "attributes": [
        {
          "id": "name",
          "string": "simple_text",
          "list": []
        },
        {
          "id": "dataType",
          "string": "string",
          "list": []
        },
        {
          "id": "attrInputConf",
          "listOfObj": [
            {
              "string": "string",
              "id": "label"
            },
            {
              "string": "string",
              "id": "inputLable"
            },
            {
              "string": "string",
              "id": "shortName"
            },
            {
              "string": "string",
              "id": "regex"
            },
            {
              "string": "string",
              "id": "validatorMsg"
            }
          ],
          "list": []
        },
        {
          "id": "schmAttrInputConf",
          "listOfObj": [
            {
              "string": "boolean",
              "id": "visualization"
            },
            {
              "string": "boolean",
              "id": "createble"
            },
            {
              "string": "boolean",
              "id": "editable"
            },
            {
              "string": "boolean",
              "id": "validate"
            },
            {
              "string": "boolean",
              "id": "required"
            },
            {
              "string": "string",
              "id": "validatorMsg"
            }
          ],
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c32362c8307cd5b82f446c",
      "type": "schmAttrInputConf",
      "attributes": [
        {
          "id": "schema",
          "reference": "57a4e02ec830e2bdff1a1608",
          "list": []
        },
        {
          "id": "attribute",
          "reference": "57c353b2c8307cd5b82f4479",
          "list": []
        },
        {
          "id": "input",
          "reference": "57c0c508c8307cd5b82f445a",
          "list": []
        },
        {
          "id": "visualization",
          "boolean": true,
          "list": []
        },
        {
          "id": "createble",
          "boolean": true,
          "list": []
        },
        {
          "id": "editable",
          "boolean": true,
          "list": []
        },
        {
          "id": "validate",
          "boolean": true,
          "list": []
        },
        {
          "id": "required",
          "boolean": true,
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c326dcc8307cd5b82f4474",
      "type": "schmAttrInputConf",
      "attributes": [
        {
          "id": "schema",
          "reference": "57a4e02ec830e2bdff1a1608",
          "list": []
        },
        {
          "id": "attribute",
          "reference": "57c3583bc8307cd5b82f447d",
          "list": []
        },
        {
          "id": "input",
          "reference": "57c3202cc8307cd5b82f4465",
          "list": []
        },
        {
          "id": "visualization",
          "boolean": true,
          "list": []
        },
        {
          "id": "createble",
          "boolean": true,
          "list": []
        },
        {
          "id": "editable",
          "boolean": true,
          "list": []
        },
        {
          "id": "validate",
          "boolean": true,
          "list": []
        },
        {
          "id": "required",
          "boolean": true,
          "list": []
        }
      ],
      "updated": []
    },
    {
      "_id": "57c0c508c8307cd5b82f445a",
      "type": "input",
      "attributes": [
        {
          "id": "name",
          "string": "simple_number",
          "list": []
        },
        {
          "id": "dataType",
          "string": "number",
          "list": []
        },
        {
          "id": "attrInputConf",
          "listOfObj": [
            {
              "string": "string",
              "id": "label"
            },
            {
              "string": "string",
              "id": "inputLable"
            },
            {
              "string": "string",
              "id": "shortName"
            },
            {
              "string": "string",
              "id": "regex"
            },
            {
              "string": "number",
              "id": "rangeMax"
            },
            {
              "string": "number",
              "id": "rangeMin"
            },
            {
              "string": "string",
              "id": "validatorMsg"
            }
          ],
          "list": []
        },
        {
          "id": "schmAttrInputConf",
          "listOfObj": [
            {
              "string": "boolean",
              "id": "visualization"
            },
            {
              "string": "boolean",
              "id": "createble"
            },
            {
              "string": "boolean",
              "id": "editable"
            },
            {
              "string": "boolean",
              "id": "validate"
            },
            {
              "string": "boolean",
              "id": "required"
            },
            {
              "string": "string",
              "id": "validatorMsg"
            }
          ],
          "list": []
        }
      ],
      "updated": []
    },
    
  ]

  return r2









 }



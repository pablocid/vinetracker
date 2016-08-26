
exports.Evaluacion = function(){
     return { //item from schms collection
            _id:"WWWWWJ223232k",
            attributes:[
                {
                    _id:"asdfasdfasdfas",
                    created:"2016-07-28T13:57:10.710Z",
                    attrSchm:{//evaluacion tipo -  from attributes collection
                        _id:"KJHJHK7657657",
                        id:"individuo_ref",
                        created:"2016-07-28T13:57:10.710Z",
                        listOfAttr:["inputLabel","outputLable", "dataType", "schm", "inputMode", "identifyByAttr"],
                        input:{ //campo de solo configuración, nada de visualization
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_ref",
                            listOfAttr:["label", "dataType", "schema"],//list of compatible attributes for implementation
                            attributes:[ //attributos base del input
                                {id:"dataType", value:"reference"},
                                //{id:"regex", value:/^[0-9a-f]{24}$/i}
                            ]
                        },
                        output:{//campo de solo configuración para la visualizacion, nada de visualization en si
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",//progress
                            attributes:[
                            ]
                        },
                        attributes:[
                            {id:"description", value:"Id autoincremental"},
                            {id:"schm", value:"57a4e02ec830e2bdff1a1608"},
                            {id:"identifyByAttr", value:"cod_indiv"},
                            {id:"inputLabel", value:""},
                            {id: "msgError", value : ["Error en A", "Error en B"] }
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"Brix Precos"},
                        {id:"description", value:"Grados brix asociado a una planta"},
                        {id:"inputMode", value:"scan"},//manual - OCR
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:"range"},
                        {id:"label", value:"Identificador antiguo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                        {id:"editable", value:false} //editable luego de registrado
                    ]
                },
                {
                    created:"2016-07-28T13:57:10.710Z",
                    attrSchm:{//evaluacion tipo
                        _id:"KJHJHK7657657",
                        id:"brix_precosecha",
                        created:"2016-07-28T13:57:10.710Z",
                        input:{ //campo de solo configuración, nada de visualization
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_float",
                            listOfAttr:["label","placeholder","regex", "dataType", "range"],//list of compatible attributes for implementation
                            attributes:[ //attributos base del input
                                {id:"dataType", value:"number"},
                                {id:"regex", value:null},
                                {id:"range", value:"5-30"}
                            ]
                        },
                        output:{//campo de solo configuración para la visualizacion, nada de visualization en si
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",//progress
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
                        {id:"shortName", value:"Brix Precos"},
                        {id:"description", value:"Primera medición de brix de precosecha"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:"range"},
                        {id:"label", value:"Identificador antiguo"},
                        {id:"visualization", value:true},
                        {id:"regex", value:null},
                        {id:"status", value: true},
                        {id:"editable", value:true}
                    ]
                }
            ],
            configurations:[
                {id:"listName", value:"Evaluación de grados brix precosecha"},
                {id:"editable", value:false},
                {id:"taxonomy", value:"evaluations"},
            ]
        };
 }



 /*

{
    schema:{ //campaña
        _id:"oidSchema"
        attributes:[
            {id:"type", string:"schema"},
            {id:"attrItems", list:["oidAttr1","cod_indiv"]} //list or listOfRef
            {id:"editable", boolean:true},
            {id:"status", boolean:true},
            {id:"registrationStart", date:"2016-11-1"}
            {id:"listOfAttr",  listOfObj:[{id:"editable", value:"boolean"},{id:"attrItems", value:"list"}, ]}
        ]
    },
    attrItems:[
        {
            _id:"oidAttr1",
            attributes:[
                {id:"type", string:"attribute"},
                {id:"name", string:"Color v1"},
                {id:"input", reference:"input1"}
            ]
        },
        {
            _id:"cod_indiv",
            attributes:[
                {id:"type", string:"attribute"},
                {id:"name", string:"código de individuo"},
                {id:"input", reference:"input1"}
            ]
        }
    ],
    inputs:[
        {
            _id:"input1",
            attributes:[
                {id:"type", string:"input"},
                {id:"name", string:"simple_number"}
                {id:"dataType", string:"number"}
            ]
        }
    ],
    attrConfigs:[
        {
            _id: "",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"oidSchema"},
                {id:"attrItem", reference:"oidAttr1"},
            ]
        }
    ]
}


List of valid attr keys

type
schema
attrItem

 */
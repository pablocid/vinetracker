
exports.Evaluacion = function(){
    return [
        { //campaña
            _id:"xxxxxxxxxxxxxxxxxxxxxxxxx",
            attributes:[
                {id:"name", string:"Grados brix 2016-20017 t1"},
                {id:"type", string:"schema"},
                {id:"attrItems", list:["indiv_ref", "grados_brix"]}, //list or listOfRef // give order
                {id:"editable", boolean:true},
                {id:"status", boolean:true},
                {id:"registrationStart", date:"2016-12-15"},
                {id:"identifyMode", string:"manual"},
            ]
        },
        {
            _id:"indiv_ref",
            attributes:[
                {id:"type", string:"attribute"},//directa implementación
                {id:"name", string:"Referencia a Individuo"},
                {id:"description", string:"Este atributo tiene como función relacionar los datos con los registros de individuo"},
                {id:"schmRef", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"identifyMode", string:"scan"}, // puede que esto se defina en el input, o puede indicar una preferencia
                {id:"identifyByAttr", string:"cod_indiv"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"regex", string:"\d{1-5}"}
            ]
        },
        {
            _id:"grados_brix",
            attributes:[
                {id:"type", string:"attribute"},
                {id:"name", string:"ingreso de grados brix"},
                {id:"input", reference:"57c0c529c8307cd5b82f445c"},
                {id:"attrItems", list:["indiv_ref", "grados_brix"]}, 
                {id:"regex", string:"\d{1-2}"},
            ]
        },
        {
            _id:"57c0c508c8307cd5b82f445a",
            attributes:[
                {id:"name", string:"simple_ref"},
                {id:"type", string:"input"},
                {id:"dataType", string:"reference"}
            ]
        },
        {
            _id:"57c0c529c8307cd5b82f445c",
            attributes:[
                {id:"name", string:"simple_number"},
                {id:"type", string:"input"},
                {id:"dataType", string:"number"}
            ]
        },
        {
            _id:"sdadasdadasdasd",
            attributes:[
                {id:"name", string:"integer_decimal"},
                {id:"type", string:"input"},
                {id:"dataType", string:"number"}
            ]
        },
        {
            _id: "57c0c585c8307cd5b82f445f",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"xxxxxxxxxxxxxxxxxxxxxxxxx"},
                {id:"attribute", reference:"indiv_ref"},
                {id:"visualization", boolean:true},
                {id:"validate", boolean:true},
                {id:"required", boolean:true},
                {id:"label", string:"Identificado de individuo"},
                {id:"shortName", string:"individuo"},
            ]
        },
        {
            _id: "57c0c590c8307cd5b82f4461",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"xxxxxxxxxxxxxxxxxxxxxxxxx"},
                {id:"attribute", reference:"grados_brix"},
                {id:"visualization", boolean:true},
                {id:"outputLabel", string:"Grados brix"},
                {id:"inputLabel", string:"Scan the qr code"},
                {id:"label", string:"Grados brix"},
                {id:"shortName", string:"brix"},
                {id:"status", boolean:false}            ]
        },
        {
            _id: "57c0e5eac8307cd5b82f4463",
            attributes:[
                {id:"type", string:"attrDatatype"},
                {id:"schema", string:"reference"},
                {id:"attribute", string:"reference"},
                {id:"visualization", string:"boolean"},
                {id:"outputLabel", string:"string"},
                {id:"inputLabel", string:"string"},
                {id:"label", string:"string"},
                {id:"shortName", string:"string"},
                {id:"status", string:"boolean"},
                {id:"dataType", string:"string"},
                {id:"name", string:"string"},
                {id:"regex", string:"string"},
                {id:"editable", string:"boolean"},
                {id:"status", string:"boolean"},
                {id:"registrationStart", string:"date"},
                {id:"identifyMode", string:"string"},
                {id:"identifyByAttr", string:"string"},
                {id:"attrItems",string:"list" },
                {id:"schmRef", string:"reference"},
            ]
        }
    ]
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
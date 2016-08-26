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

 exports.newIndividuo = function(){
    return [
        { //campaña
            _id:"57a4e02ec830e2bdff1a1608",
            attributes:[
                {id:"name", string:"individuos"},
                {id:"type", string:"schema"},
                {id:"attrItems", list:["id","cod_indiv"]}, //list or listOfRef
                {id:"editable", boolean:true},
                {id:"status", boolean:true},
                {id:"registrationStart", date:"2016-11-1"},
                {id:"identifyMode", string:"scan"},
                {id:"identifyByAttr", string:"cod_indiv"},
                {id:"listOfAttr",  listOfObj:[{id:"editable", value:"boolean"},{id:"attrItems", value:"list"}, ]}
            ]
        },
        {
            _id:"id",
            attributes:[
                {id:"type", string:"attribute"},//directa implementación
                {id:"name", string:"id"},
                {id:"input", reference:"57c0c508c8307cd5b82f445a"},
                {id:"regex", string:"\d{1-5}"}
            ]
        },
        {
            _id:"cod_indiv",
            attributes:[
                {id:"type", string:"attribute"},
                {id:"name", string:"código de individuo"},
                {id:"input", reference:"57c0c529c8307cd5b82f445c"},
                {id:"regex", value:"\d{1-5}(\d{2})\.\d{1-4}"},
            ]
        },
        {
            _id:"57c0c508c8307cd5b82f445a",
            attributes:[
                {id:"name", string:"simple_number"},
                {id:"type", string:"input"},
                {id:"dataType", string:"number"}
            ]
        },
        {
            _id:"57c0c529c8307cd5b82f445c",
            attributes:[
                {id:"name", string:"simple_number"},
                {id:"type", string:"input"},
                {id:"dataType", string:"string"}
            ]
        },
        {
            _id: "57c0c585c8307cd5b82f445f",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"attribute", reference:"id"},
                {id:"visualization", boolean:true},
                {id:"validate", boolean:true},
                {id:"required", boolean:true},
                {id:"shortName", string:"old id"},
            ]
        },
        {
            _id: "57c0c590c8307cd5b82f4461",
            attributes:[
                {id:"type", string:"attrConfig"},
                {id:"schema", reference:"57a4e02ec830e2bdff1a1608"},
                {id:"attribute", reference:"cod_indiv"},
                {id:"visualization", boolean:true},
            ]
        }
    ]
 }
 exports.Individuo = function(){
     return {
            _id:"WWWWWJ223232k",
            attributes:[
                {
                    id:"id",
                    created:"2016-07-28T13:57:10.710Z",
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"id_int_autoincrement",
                        input:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",
                            attributes:[
                                {id:"dataType", value:"number"},
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"\d{1-5}"},
                                {id: "msgError", value : ["Error en A", "Error en B"] }
                            ]
                        },
                        output:{
                            _id:"KJHJHK7657657",
                            created:"2016-07-28T13:57:10.710Z",
                            name:"simple_number",
                            attributes:[
                                {id:"themeXml", value:"<Stacklayout></Stacklayout>"},
                                {id:"regex", value:"/\d{2}"}
                            ]
                        },
                        attributes:[
                            {id: "description", value:"Id antigua - DB Perrin"},
                            {id:"label", value:"Default label if not exist in schema"},
                            {id:"regex", value:"/\d{2}"}
                        ]
                    },
                    attributes:[
                        {id:"shortName", value:"old id"},
                        {id:"required", value:true},
                        {id:"validate", value:true},
                        {id:"validateType", value:true},
                        {id:"label", value:"Identificador antiguo"},
                        {id:"visualization", value:false},
                        {id:"regex", value:null},
                        {id:"status", value: true},

                    ]
                },
                {
                    id:"cod_indiv",
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"codigo_db",
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
                    id:"cruzamiento",
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"codigo_db",
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
                    id:"num_indiv",
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"codigo_db",
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
                    id:"fecha_identific",
                    attrSchm:{
                        _id:"KJHJHK7657657",
                        created:"2016-07-28T13:57:10.710Z",
                        name:"codigo_db",
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
                    id:"ubicacion",
                    attrSchm:{
                        _id:"KJHJHK7657657",
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
                    id:"espaldera",
                    attrSchm:{
                        _id:"KJHJHK7657657",
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
 exports.Individuo = function(){
     return {
            _id:"WWWWWJ223232k",
            inputs:[
                {
                    id:"id",
                    dataType:"number",
                    description:"Id antigua - DB Perrin",
                    inputSchema:"",
                    required:true,
                    validate:true,
                    validateType:"number",
                    label:"Ingresa la cantidad",
                    msgError:[
                        //{id:1, value:null}
                    ],
                    regex:null,
                    status:true
                },
                {
                    id:"cod_indiv",
                    dataType:"string",
                    description:"Código de individuo",
                    inputSchema:"",
                    required:true,
                    validate:true,
                    validateType:"number",
                    label:"Ingresa la cantidad",
                    msgError:[
                        //{id:1, value:null}
                    ],
                    regex:"\d{1-5}(\d{2})\.\d{1-3}",
                    status:true
                },
                {
                    id:"cruzamiento",
                    dataType:"string",
                    description:"Código de cruzamiento",
                    inputSchema:"",
                    required:true,
                    validate:true,
                    validateType:"number",
                    label:"Ingresa la cantidad",
                    msgError:[
                        //{id:1, value:null}
                    ],
                    regex:"\d{1-5}(\d{2})",
                    status:true
                },
            ]
        };
 }
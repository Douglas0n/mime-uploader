
// converte Base64 para ArrayBuffer
function b64ToArray(b64) {
    try {
        var binary = window.atob(b64);
        var length = binary.length;
        var bytes = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }
    catch (error) {
        throw error
    }
}

// Remove header de Base64 
function fmtb64(b64) {
    try {
        b64Fmt = b64.replace(/^data:image\/png;base64,/, "")
        return b64Fmt
    }
    catch (error) {
        throw error
    }  
}

// Cria um objeto FormData a partir de Base64
function b64Fdata(base64, fName, type) {
    try {
        var b64 = base64
        if(base64.includes('base64')){
            b64 = fmtb64(base64)
        }
        var Arraybuffer = b64ToArray(b64)
        var blob = new Blob([Arraybuffer], { type: type });
        var fData = new FormData()
        fData.append(fName, blob)
        return fData
    }
    catch (error) {
        throw { message: 'createFormDataFromBas64 fail', error }
    }
}

/**
 * Remove o cabeçalho de uma string codificada em Base64
 * 
 * @param   {string} base64 string codificada em Base64 
 * @returns {string} string (base64) sem cabeçahalho 
 */
exports.formatBase64 = function (base64) {
    try {
        b64Fmt = fmtb64(base64)
    }
    catch (error) {
        throw { message: 'formatBase64String fail', error }
    }
    return b64Fmt
}

/**
 * Converte uma string codificada em Base64 e retorna um ArrayBuffer
 * 
 * @param   {string} base64 string codificada em Base64
 * @returns {ArrayBuffer} ArrayBuffer
 */
exports.base64ToArrayBuffer = function (base64) {
    var b64 = base64
    try{
        if(base64.includes('base64')){
            b64 = fmtb64(base64)
        }
        return b64ToArray(b64)
    }
    catch (error) {
        throw { message: 'convertBase64ToArrayBuffer fail', error }
    }   
}

/**
 * Converte uma string codificada em Base64 e retorna o buffer
 * 
 * @param   {string} base64 string codificada em Base64
 * @returns {Buffer} buffer
 */
exports.base64ToBuffer = function (base64) {
    try {
        buffer = new Buffer.from(base64, 'base64')
        return buffer
    }
    catch (error) {
        throw { message: 'convertBase64ToBuffer fail', error }
    }
}

/**
 * Cria um objeto FormData com um campo binário apartir de uma string codificada em Base64
 * 
 * @param   {string} base64 string codificada em Base64
 * @param   {string} type MIME type 'tipo/subtipo'
 * @returns {Blob} FormData
 */
exports.blobFromBase64 = function (base64, type) {
    try {
        var b64 = base64
        if(base64.includes('base64')){
            b64 = fmtb64(base64)
        }
        var buffer = b64ToArray(b64)
        var blob = new Blob([buffer], { type: type });
        return blob
    }
    catch (error) {
        throw { message: 'createFormDataFromBas64 fail', error }
    }
}

/**
 * Cria um objeto FormData com um campo binário apartir de uma string codificada em Base64
 * 
 * @param   {string} base64 string codificada em Base64
 * @param   {string} type tipo do arquivo MIME ('tipo/subtipo')
 * @param   {string} [fieldName] nome do campo com o arquivo
 * @param   {object[]} [fields] campos adicionais
 * @param   {string} fields.name nome do campo
 * @param   {string} fields.value valor do campo
 * @returns {FormData} FormData
 */
exports.formDataFromBase64 = function (base64, type, fieldName, fields) {
    try {
        const fName = fieldName || 'file'
        var b64 = base64
        if(base64.includes('base64')){
            b64 = fmtb64(base64)
        }
        fData = b64Fdata(base64, fName, type)
        if (fields) {
            fields.forEach(function (item) {
                fData.append(item.name, item.value)
            })
        }
        return fData
    }
    catch (error) {
        throw { message: 'createFormDataFromBas64 fail', error }
    }
}

/**
 * Cria um objeto FormData e executa o upload do arquivo MIME através de uma requisição HTTP POST
 *
 * @param   {string} url Request URL
 * @param   {object[]} [requestHeader] Request Header
 * @param   {string} requestHeader.name nome da propriedade
 * @param   {string} requestHeader.value valor da propriedade
 * @param   {FormData} formData tipo do arquivo MIME ('tipo/subtipo')
 * @returns {Promise<any>} JSON payload
 */
exports.uploadMime = function (url, requestHeader, formData) {
    return new Promise(function (resolve, reject) {
        try {
            const request = new XMLHttpRequest()
            request.open('POST', url, true);
            if (requestHeader) {
                requestHeader.forEach(function (item) {
                    request.setRequestHeader(item.name, item.value)
                })
            }
            request.responseType = 'json'
            request.send(formData)

            request.addEventListener('loadend', () => {
                return resolve(request.response)
            })
        }
        catch (error) {
            reject({ message: 'postMimeFromFormData fail', error })
        }
    })
}
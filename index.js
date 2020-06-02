var genericException = require('./Exception')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Blob = require('node-blob');
const atob = require('atob');

/**
 * Remove o cabeçalho de uma string codificada em Base64
 * 
 * @param   {string} base64 string codificada em Base64 
 * @returns {string} string (base64) sem cabeçahalho 
 */
exports.formatBase64String = function (base64) {
    try {
        base64Formated = base64.replace(/^data:image\/png;base64,/, "")
    }
    catch (error) {
        throw { message:'formatBase64String fail', error: error }
    }
    return base64Formated
}

/**
 * Converte uma string codificada em Base64 e retorna um ArrayBuffer
 * 
 * @param   {string} base64 string codificada em Base64
 * @returns {ArrayBuffer} ArrayBuffer
 */
exports.convertBase64ToArrayBuffer = function(base64) {
    try {
        var binary = atob(base64);
        var length = binary.length;
        var bytes = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
    }
    catch (error) {
        throw { message: 'convertBase64ToArrayBuffer fail', error: error }
    }
    return bytes.buffer;
}

/**
 * Converte uma string codificada em Base64 e retorna o buffer
 * 
 * @param   {string} base64 string codificada em Base64
 * @returns {Buffer} buffer
 */
exports.convertBase64ToBuffer = function (base64) {
    try {
        buffer = new Buffer.from(base64, 'base64')
        return buffer
    }
    catch (error) {
        throw { message: 'convertBase64ToBuffer fail', error: error }
    }
}

/**
 * Cria um objeto FormData com um campo binário apartir de uma string codificada em Base64
 * 
 * @param   {string} base64 string codificada em Base64
 * @param   {string} type MIME type 'tipo/subtipo'
 * @returns {FormData} FormData
 */
exports.createBlobFromBase64 = function (base64, type) {
    try {
        var buffer = this.convertBase64ToArrayBuffer(this.formatBase64String(base64))
        var blob = new Blob([buffer], { type: type });
        return blob
    }
    catch (error) {
        throw { message: 'createFormDataFromBas64 fail', error }
    }
}

/**
 * Executa o upload do arquivo MIME através de uma requisição HTTP POST
 *
 * @param   {string} url Request URL
 * @param   {object[]} [requestHeader] Request Header
 * @param   {string} requestHeader.name nome da propriedade
 * @param   {string} requestHeader.value valor da propriedade
 * @param   {FormData} formData string codificada em Base64 e formatada
 * @returns {Promise<any>} JSON payload
 */
exports.postMimeFromFormData = function (url, requestHeader, formData) {
    return new Promise(function (resolve, reject) {
        try {

            const request = new XMLHttpRequest()
            if(requestHeader){
                requestHeader.forEach(function(item){
                    request.setRequestHeader(item.name, item.value)
                })
            }
            request.open('POST', url, true);
            form.append('file', buffer);
            request.send(formData)

            request.addEventListener('loadend', () => {
                return resolve(JSON.parse(request.response))
            })

        }
        catch (error) {
            reject({ message: 'httpPostMimeFile fail', error})
            throw new Error(error)
        }
    })
}

process.on('uncaughtException', (err) => {
    console.warn('http-mime-uploader erro: \n', err)
    process.exit(1)
})
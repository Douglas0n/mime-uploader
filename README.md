## mime-uploader
Funções simples para auxiliar no upload de arquivos codificados em base64.

### Requisitos
* node v19.03.6
* npm v6.13.7+

Instale o pacote apartir do *npm* com o seguinte comando:
```console
$ npm install mime-uploader
```

### Enviar um arquivo codificado

Crie um blob apartir da string codificada em Base64 contendo o arquivo e adicione a um objeto FormData:
``` javascript
import { postMimeFromFormData, createBlobFromBase64 } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2FkLW1pbWU='
var blob = createBlobFromBase64(base64, 'image/png')

var formdata = new FormData()
formdata.append('meu_arquivo', blob)
```

Faça o upload do formulário contendo o arquivo:
``` javascript
postMimeFromFormData('http://localhost:3000', formdata)
.then((res)=>{ console.log(res) })
```

##### Refs https://docs.net




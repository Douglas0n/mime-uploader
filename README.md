## mime-uploader
Funções simples para trabalhar com arquivos codificados em base64.

### Requisitos
* node v19.03.6
* npm v6.13.7+

Instale o pacote apartir do *npm* com o seguinte comando:
```console
$ npm install mime-uploader
```

### Upload de arquivo codificado

Crie um objeto FormData apartir da string codificada em Base64 contendo o arquivo e faça o upload da seguinte forma:
``` javascript
import { uploadMime, formDataFromBase64 } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2 .... FkLW1pbWU='
var formData = formDataFromBase64(base64, 'image/png')

const response = await uploadMime('http://localhost:3000', formData)

console.log(response)

```

### Outras Funções

Cria um objeto Blob apartir de uma string codificada em Base64:
``` javascript
import { blobFromBase64 } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2 .... FkLW1pbWU='
blobFromBase64(base64, 'image/png')

```

Converte uma string codificada em Base64 em Buffer:
``` javascript
import { base64ToBuffer } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2 .... FkLW1pbWU='
base64ToBuffer(base64)

```

Converte uma string codificada em Base64 em ArrayBuffer:
``` javascript
import { base64ToArrayBuffer } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2 .... FkLW1pbWU='
base64ToArrayBuffer(base64)

```

Remove o cabeçalho de uma string codificada em Base64:
``` javascript
import { formatBase64 } from 'mime-uploader'

var base64 = 'dGVzdGUtdXBsb2 .... FkLW1pbWU='
formatBase64(base64)

```





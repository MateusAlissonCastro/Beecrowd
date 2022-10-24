var input = require('fs').readFileSync('dados.txt', 'utf8');
const lines = input.split('\n')

let main = () => {
    let indice_caso = 0

    while (lines[indice_caso].split(' ')[0] !== '0') {
        let [n_marmores, n_consultas] = lines[indice_caso].split(' ')
        let numero_chave, valores_marmores

        n_marmores = parseInt(n_marmores)
        n_consultas = parseInt(n_consultas)

        indice_caso++

        valores_marmores = lines.splice(indice_caso, n_marmores)
        numero_chave = lines.splice(indice_caso, n_consultas)

        valores_marmores.sort((a, b) => {
            return parseInt(a) - parseInt(b)
        })

        console.log(`CASE# ${indice_caso}:`)

        for (let i = 0; i < numero_chave.length; i++) {

            if (valores_marmores.indexOf(numero_chave[i]) >= 0) {
                console.log(parseInt(numero_chave[i]) + " found at " + (valores_marmores.indexOf(numero_chave[i]) + 1))
            } else {
                console.log(parseInt(numero_chave[i]) + " not found")
            }
        }
    }
}

main()
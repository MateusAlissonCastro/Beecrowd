var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

let removeCaractere = (lista, item) => {
    let indice_operador = lista.indexOf(item)
    lista.splice(indice_operador, 1)
}

let transformaTipo = (lista) => {
    let lista_novo_tipo = []
    for (let i = 0; i < lista.length; i++) {
        lista_novo_tipo.push(parseInt(lista[i]))
    }
    return lista_novo_tipo
}

let operacao_fracoes = {
    '+' (n1, n2, d1, d2) {
        return [(n1*d2+n2*d1),(d1*d2)]
    },
    '-' (n1, n2, d1, d2) {
        return [(n1*d2-n2*d1),(d1*d2)]
    },
    '*' (n1, n2, d1, d2) {
        return [(n1*n2),(d1*d2)]
    },
    '/' (n1, n2, d1, d2) {
        return [(n1*d2),(n2*d1)]
    }
}

let identifica_operador  = (item) => {
    let indice_item = item.search(/[+*/-]/)
    return item[indice_item]
}

let fatorComun = (n1, n2) => {
    return n2 ? fatorComun(n2, n1%n2) : n1
}

let reduzirFracao = (num, den) => {
    let fator = Math.abs(fatorComun(num, den))
    return [num/fator, den/fator]
}

let algoritmo = (elemento) => {
    let operador
    let expressao_matematica = elemento.split(' ')
    let i = 0

    while( i<2 ){
        removeCaractere(expressao_matematica, '/')
        i++
    }

    operador = identifica_operador(expressao_matematica.join(''))
    
    removeCaractere(expressao_matematica, operador)

    if(operador in operacao_fracoes){
        let [n1, d2, n2, d1] = transformaTipo(expressao_matematica)
        let resultado = operacao_fracoes[operador](n1, n2, d2, d1) 
        let reduzir =  reduzirFracao(resultado[0], resultado[1])

        console.log(`${resultado[0]}/${resultado[1]} = ${reduzir[0]}/${reduzir[1]}`)
    }

}

lines.forEach(algoritmo)
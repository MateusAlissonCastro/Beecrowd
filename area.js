var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

//Array que vai receber os valores do input do tipo 'string'
let lista_valores_area = lines[0].split(' ')

//Função que transforma  os valores do tipo 'string' de um array
//para 'float' e os retorna com array
function transformaTipo(lista) {
    let lista_novo_tipo = []
    for (let i = 0; i < lista.length; i++) {
        lista_novo_tipo.push(parseFloat(lista[i]))
    }
    return lista_novo_tipo
}

//Objeto que comporta as operações matemáticas
let areas = {
    'triangulo'(base, altura) {
        return (base * altura) / 2
    },
    'circulo'(raio) {
        return 3.14159 * Math.pow(raio, 2)
    },
    'trapezio'(base_menor, base_maior, altura) {
        return ((base_menor + base_maior) * altura) / 2
    },
    'quadrado'(base) {
        return Math.pow(base, 2)
    },
    'retangulo'(base, altura) {
        return base * altura
    }
}

//Atribuição para as variáveis a, b e c via desestruturação
let [a, b, c] = transformaTipo(lista_valores_area) //retorna um array 

console.log(
    `TRIANGULO: ${areas.triangulo(a, c).toFixed(3)}
CIRCULO: ${areas.circulo(c).toFixed(3)}
TRAPEZIO: ${areas.trapezio(a, b, c).toFixed(3)}
QUADRADO: ${areas.quadrado(b).toFixed(3)}
RETANGULO: ${areas.retangulo(a, b).toFixed(3)}`)
var input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.split('\n')

 
let lista_valores = lines[0].split(' ') //novo Array com elementos do tipo 'string'
let maiorAB //nova variavel para receber a formula para saber o maior valor entre 'A' e 'B'
let maiorABC //nova variavel para receber a formula para saber o maior valor entre 'A', 'B' e 'C'

let modificarTipo = (lista) => { //Função que recebe um Array do tipo 'string' e retorna um novo 
    let novo_tipo = []           //do tipo inteiro
    for(let i=0 ; i<lista.length ; i++){
        novo_tipo.push(parseInt(lista[i]))
    }
    return novo_tipo
}

let [a, b, c] = modificarTipo(lista_valores) //Desestruturação para que as três variaveis recebam o
                                             //valor retornado pela função
maiorAB = (a+b+Math.abs(a-b))/2

maiorABC = maiorAB>c ? maiorAB : c

console.log(`${maiorABC} eh o maior`)
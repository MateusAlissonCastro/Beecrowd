const { Console } = require('console');

var input = require('fs').readFileSync('dados.txt', 'utf8');
var lines = input.split('\n');

//Estrutura para pegar o número de itens correspodente a 
//quantidade de imóveis - OK

//Dividir a quantidade de consumo por quantidade de moradores
//e arredondarpara baixo - OK

//Organizar os valores de forma crescente indo do menor 
//consumo por pessoa até o maior

//Dividir a quantidade de aguá consumida pelo número de
//pessoas em cada cidade

let lista_cons_por_pessoa = []

let pegarValores = () => {
    let objEst = {}
    let i_cidade = 1
    let i_quan_imov = 0
    let i_imov = 1

    for( let i=0 ; i<lines.length ; i++){
        if(lines[i].indexOf(' ')===-1 && lines[i]!=='0' ){
            objEst[`cidade_${i_cidade}`] = {
                ['quan_imoveis'] : lines[i],
                ['info_imoveis'] : {},
            }

            i_quan_imov = i + parseInt(lines[i])
            i_imov = 1
            i_cidade++

        }else if( i<=i_quan_imov ){
            objEst[`cidade_${i_cidade-1}`]['info_imoveis'][`imovel_${i_imov}`] = {
                [`quan_pessoa`]: parseInt(lines[i].split(' ')[0]),
                [`cons_agua`]: parseInt(lines[i].split(' ')[1]),
                consumoPorPessoa() {
                    return Math.floor(this.cons_agua/this.quan_pessoa)
                }
            }
            i_imov++
        }else{
            i = lines.length
        }
    }
    return objEst
}

let meu_objeto = pegarValores()

for(chave in meu_objeto.cidade_1.info_imoveis){
    lista_cons_por_pessoa.push(meu_objeto.cidade_1.info_imoveis[chave])
}

lista_cons_por_pessoa.sort( (a, b) => {
    if( a.consumoPorPessoa() > b.consumoPorPessoa() )
        return 1
    else if( a.consumoPorPessoa() < b.consumoPorPessoa() ){
        return -1
    }else{
        return 0
    }
} )
let totalP = lista_cons_por_pessoa[0].quan_pessoa + lista_cons_por_pessoa[1].quan_pessoa + lista_cons_por_pessoa[2].quan_pessoa
let totalC = lista_cons_por_pessoa[0].cons_agua + lista_cons_por_pessoa[1].cons_agua + lista_cons_por_pessoa[2].cons_agua
let calc = (totalC / totalP).toFixed(2)

console.log(`Cidade# 1
${lista_cons_por_pessoa[0].quan_pessoa}-${lista_cons_por_pessoa[0].consumoPorPessoa()} ${lista_cons_por_pessoa[1].quan_pessoa}-${lista_cons_por_pessoa[1].consumoPorPessoa()} ${lista_cons_por_pessoa[2].quan_pessoa}-${lista_cons_por_pessoa[2].consumoPorPessoa()}
Consumo medio: ${calc} m3.`)

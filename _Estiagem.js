var input = require('fs').readFileSync('dados.txt', 'utf8');
var lines = input.split('\n');

let mediaConsumo = (pessoas, imovel) => {
    return imovel/pessoas
}

let ordenarNumeros = (a, b) => {
    if( a.n2 > b.n2 ){
        return 1
    }else if( a.n2 < b.n2 ){
        return -1
    }else{
        return 0
    }
}

let formatarSaida = (obj) => {
    let msg = ''
    for(let i=0 ; i<obj.length; i++){
        msg += ` ${obj[i].n1}-${obj[i].n2}`
    }
    return msg.replace(' ', '')
}

let formatar_casas_decimais = (num, casas) => {
    let ponto = num.indexOf('.')
    return ponto >= 0 ? num.slice(0, ponto+casas+1) : `${num}.${'0'.repeat(casas)}`
}

let main = (lista, indice) => {
    let lista_teste  = []
    let lista_org = []
    let total_pessoas = 0
    let total_consumo = 0
    let consumo_medio
    let indice_cidade = 1

    for(let i=0 ; i<lista.length ; i++){ //3° repetição
        let [numero_pessoas, consumo_imovel] = lista[i].split(' '), media_consumo_imovel, indice_valor_existente

        numero_pessoas = parseInt(numero_pessoas)
        consumo_imovel = parseInt(consumo_imovel)
        media_consumo_imovel = Math.floor(mediaConsumo(numero_pessoas, consumo_imovel))
        indice_valor_existente = lista_teste.indexOf(media_consumo_imovel)
        total_pessoas += numero_pessoas
        total_consumo += consumo_imovel
        
        
        if( indice_valor_existente !== -1 ){
            lista_org[indice_valor_existente].n1 += numero_pessoas
        }else{
            lista_teste.push(media_consumo_imovel)
            lista_org.push({n1:numero_pessoas, n2: media_consumo_imovel})
        }
        
       
    }

    lista_org.sort(ordenarNumeros)
    consumo_medio = total_consumo/total_pessoas
    consumo_medio = String(consumo_medio)
    
    console.log(`${indice!==1 ? `\n` : ``}Cidade# ${indice}:\n${formatarSaida(lista_org)}\nConsumo medio: ${formatar_casas_decimais(consumo_medio, 2)} m3.`)

}

let teste = (lista, indice) => {
    
    if( lista[0].indexOf(' ') === -1 ){
        main(lista.splice(1, parseInt(lista[0])), indice)
        lista.shift()
    }
    
    return lista[0] !== '0' ? teste(lista, indice+1) : indice
}

teste(lines, 1)
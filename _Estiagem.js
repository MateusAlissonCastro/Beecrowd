var input = require('fs').readFileSync('dados.txt', 'utf8');
var lines = input.split('\n');

let lista_valores

let formatarEntrada = (lista) => {
    let nova_lista_formatada = []
    let i = 0
    while( lista[i]!=='0' ){
        if( lista[i].indexOf(' ') === -1 ){
            nova_lista_formatada.push(lista.splice(1+i, parseInt(lista[i])))
        }
        i++
    }
    return nova_lista_formatada
}

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

let comparar_valores = (obj_teste) => {
    for( let i_prim=0 ; i_prim<obj_teste.length-1 ; i_prim++ ){
        let item = obj_teste[i_prim].n2
        for( let i_segu=i_prim+1 ; i_segu<obj_teste.length ; i_segu++ ){
            if( item === obj_teste[i_segu].n2 ){
                obj_teste[i_prim].n1 += obj_teste[i_segu].n1
                obj_teste.splice(i_segu, 1)
                i_segu-=1
            }
        } 
    }
    return obj_teste
}

let main = (lista, indice, superLista) => {
    let lista_fomatada = []
    let total_pessoas = 0
    let total_consumo = 0

    for(let i=0 ; i<lista.length ; i++){
        let valores = lista[i].split(' ')
        let media_consumo_imovel = Math.floor(mediaConsumo(parseInt(valores[0]), parseInt(valores[1])))
        let meuObj = {
            n1 : parseInt(valores[0]),
            n2 : media_consumo_imovel
        }

        total_pessoas += parseFloat(valores[0])
        total_consumo += parseFloat(valores[1])
        lista_fomatada.push(meuObj)

        if( i === (lista.length - 1) ){
            comparar_valores(lista_fomatada)
        }
    }

    lista_fomatada.sort( ordenarNumeros )

    console.log(`Cidade# ${indice+1}:\n${formatarSaida(lista_fomatada)}\nConsumo medio: ${(total_consumo/total_pessoas)} m3.${indice !== (superLista.length-1) ? `\n` : ``}`)

    
}

lista_valores = formatarEntrada(lines)
lista_valores.forEach(main)
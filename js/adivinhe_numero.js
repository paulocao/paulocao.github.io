const frm = document.querySelector("form")  // obtém elementos da página
const respErros = document.querySelector("#outErros")
const respChances = document.querySelector("#outChances")
const respDica = document.querySelector("#outDica")

function escolhePrimeiro() {
    const escolha = document.querySelector('input[name="opcao"]:checked')
    //escolha.disabled = true
    respChances.innerText = escolha.value
    console.log(Number(escolha.value))
    return Number(escolha.value)
}

let esco = escolhePrimeiro()

function disable() {    // desativa os radios
    frm.inFacil.disabled = true
    frm.inNormal.disabled = true
    frm.inDificil.disabled = true
}

const erros = [] // vetor de escopo global com números já apostados
const sorteado = Math.floor(Math.random() * 100) + 1 // num aleatório entre 1 e 100

frm.addEventListener("submit", (e) => {     // "escuta" evento submit do form
    e.preventDefault()      // evita envio do form
    const CHANCES = escolhePrimeiro()   // constante com o número máximo de chances
    disable()   // desativa os botões radio

    const numero = Number(frm.inNumero.value)   // obtém número digitado
    if (numero == sorteado) {   // se acertou
        respDica.innerText = `Parabéns!! Número sorteado: ${sorteado}`
        frm.btSubmit.disabled = true    // troca status dos botões
        frm.btNovo.className = "exibe"
    } else {
        if (erros.includes(numero)) {   // se número existe no vetor erros (já apostou)
            alert(`Você já apostou o número ${numero}. Tente outro...`)
        } else {
            erros.push(numero)              // adiciona número ao vetor
            const numErros = erros.length   // obtém tamanho do vetor
            const numChances = CHANCES - numErros   // calcula nº de chances
            // exibe nº de erros, contéudo do vetor e nº de chances
            respErros.innerText = `${numErros} (${erros.join(", ")})`
            respChances.innerText = numChances
            if (numChances == 0) {
                alert("Suas chances acabaram...")
                frm.btSubmit.disabled = true
                frm.btNovo.className = "exibe"
                respDica.innerText = `Game Over!! Número Sorteado: ${sorteado}`
            } else {
                // usa operador ternário para mensagem da dica
                const dica = numero < sorteado ? "maior" : "menor"
                respDica.innerText = `Dica: tente um número ${dica} que ${numero}`
            }
        }
    }
    frm.inNumero.value = ""     // limpa campo de entrada
    frm.inNumero.focus()        // posiciona cursor neste campo
})
frm.btNovo.addEventListener("click", () => {
    location.reload()       // recarrega a página
})  
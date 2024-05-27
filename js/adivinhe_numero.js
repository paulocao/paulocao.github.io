let numeroAleatorio = Math.floor(Math.random() * 100) + 1	 // número aleatório para o jogo

const palpites = document.querySelector(".palpites")				// obtém elementos da página
const ultimoResultado = document.querySelector(".ultimoResultado")
const baixoOuAlto = document.querySelector(".baixoOuAlto")

const envioPalpite = document.querySelector(".envioPalpite")
const campoPalpite = document.querySelector(".campoPalpite")

let contagemPalpites = 1	// cria o contador
let botaoReinicio

function conferirPalpite() {
	const palpiteUsuario = Number(campoPalpite.value);
	if (contagemPalpites === 1) {						// se primeiro palpite
		palpites.textContent = "Palpites anteriores: "	// exibe...
	}
	palpites.textContent += palpiteUsuario + " "		// concatena os palpites do usuário

	if (palpiteUsuario === numeroAleatorio) {			// palpite igual ao número aleatório
		ultimoResultado.textContent = "Parabéns! Você acertou!"
		ultimoResultado.style.backgroundColor = "green"
		baixoOuAlto.textContent = ""
		configFimDeJogo()
	} else if (contagemPalpites === 10) {				// não resta mais palpites
		ultimoResultado.textContent = "!!!FIM DE JOGO!!!";
		baixoOuAlto.textContent = ""
		configFimDeJogo()
	} else {
		ultimoResultado.textContent = "Errado!"
		ultimoResultado.style.backgroundColor = "rgb(150, 0, 0)"	// vermelho mais ameno
		if (palpiteUsuario < numeroAleatorio) {
			baixoOuAlto.textContent = "Seu palpite está muito baixo!"
		} else if (palpiteUsuario > numeroAleatorio) {
			baixoOuAlto.textContent = "Seu palpite está muito alto!"
		}
	}

	contagemPalpites++										// incrementa a contagem de palpites
	campoPalpite.value = ""
	campoPalpite.focus()
}
envioPalpite.addEventListener("click", conferirPalpite)		// "ouvinte" evento submit

function configFimDeJogo() {
	campoPalpite.disabled = true
	envioPalpite.disabled = true
	botaoReinicio = document.createElement("button")		// cria botão "Iniciar Novo Jogo"
	botaoReinicio.textContent = "Iniciar Novo Jogo"
	document.body.append(botaoReinicio)						// ?
	botaoReinicio.addEventListener("click", reiniciarJogo)	// "ouvinte" evento button
}

function reiniciarJogo() {
	contagemPalpites = 1			// reinicia a contagem de palpites

	const reiniciarParas = document.querySelectorAll(".resultadoParas p");
	for (let reiniciarPara of reiniciarParas) {
		reiniciarPara.textContent = ""
	}

	botaoReinicio.parentNode.removeChild(botaoReinicio)		// remove o botão "Iniciar Novo Jogo"

	campoPalpite.disabled = false
	envioPalpite.disabled = false
	campoPalpite.value = ""
	campoPalpite.focus()

	ultimoResultado.style.backgroundColor = "white"

	numeroAleatorio = Math.floor(Math.random() * 100) + 1	// gera novo número aleatório
}
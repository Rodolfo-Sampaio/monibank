const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener('click', async function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            botaoIniciarCamera.style.display = "none";
            campoCamera.style.display = "block";
            video.srcObject = iniciarVideo;

            document.querySelector('.formulario__texto').style.display = 'none';
            mensagem.style.display = "none";

        } catch (error) {
            console.error("Erro ao acessar a câmera:", error);
            mensagem.textContent = "Não foi possível acessar a câmera. Por favor, verifique se você tem uma câmera conectada ou se as permissões estão corretas.";
            mensagem.style.display = "block";
        }
    } else {
        console.error("A API getUserMedia não está disponível neste navegador.");
        mensagem.textContent = "A API getUserMedia não está disponível neste navegador. Por favor, atualize para a versão mais recente ou use um navegador diferente.";
        mensagem.style.display = "block";
    }
});

botaoTirarFoto.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    imagemURL = canvas.toDataURL("image/jpeg");

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    window.location.href = "./abrir-conta-form-3.html";
})

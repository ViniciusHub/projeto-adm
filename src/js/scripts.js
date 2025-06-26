/*
 Pop-up script
*/

// Função para remover cookie
function apagarCookie(nome) {
    document.cookie = `${nome}=; path=/; max-age=0`;
}

// Função para pegar cookie
function getCookie(nome) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      let [key, value] = c.trim().split('=');
      if (key === nome) {
        return decodeURIComponent(value);
      }
    }
    return "";
}

// Finalizar compra

const popup = document.getElementById('popupForm');
const buyButtons = document.querySelectorAll('a.item.buylink');
const formCompra = document.getElementById('formCompra');
let destinoFinal = "pages/thankyou.html"; // valor padrão

// Abrir popup

buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const hash = btn.getAttribute('href');
      destinoFinal = "pages/thankyou.html" + hash;
      popup.style.display = 'flex';
    });
  });

// Fechar popup

if (document.body.id === "vsl-page") {

    const closePopup = document.getElementById('closePopup');

    closePopup.addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'none';
    });

}

// Máscara para telefone brasileiro
if (document.body.id === "vsl-page") {
    const telefoneInput = document.getElementById("telefone");
    telefoneInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
    this.value = value;
    });
}

// Enviar e validar formulário
if (document.body.id === "vsl-page") {
formCompra.addEventListener('submit', (e) => {
    e.preventDefault(); // impede envio padrão
  
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    // const telefone = document.getElementById('telefone').value.trim();
  
    // Resetar cookies antigos, se existirem
    apagarCookie('nome');
    apagarCookie('email');
    apagarCookie('telefone');

    if (!nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos antes de continuar.');
        return;
    }
  
    // Armazenar novos cookies (expiram em 1 dia)
    document.cookie = `nome=${encodeURIComponent(nome)}; path=/; max-age=86400`;
    document.cookie = `email=${encodeURIComponent(email)}; path=/; max-age=86400`;
    document.cookie = `telefone=${encodeURIComponent(telefone)}; path=/; max-age=86400`;
  
    // Redirecionar
    window.location.href = destinoFinal;
});
}


/*
  scripts page thank you
*/

// Colocar as informações da pessoa

if (document.body.id === "thankyou") {
  
  document.getElementById("userName").textContent = getCookie("nome");
  document.getElementById("userEmail").textContent = getCookie("email");
  // document.getElementById("userPhone").textContent = getCookie("telefone");


  // Colocar as informações do produto
  const nomeProdutoSpan = document.getElementById("nomeProduto");

  // Mapeamento dos hashes para nomes
  const produtos = {
      "#link_2_bottles": {
          nome: "NattyLean 2 bottles",
          preco: "$ 158,00",
          quantidade: "2 units",
          imagem: "../src/img/img-2-bottles.webp",
          bonus: "../src/img/bonus1.webp",
          nomebonus: "FIRM & FIT"
      },
      "#link_3_bottles": {
          nome: "NattyLean 3 bottles",
          preco: "$ 207,00",
          quantidade: "3 units",
          imagem: "../src/img/img-3-bottles.webp",
          bonus: "../src/img/bonus2.webp",
          nomebonus: "CRAVINGS CRUSHER"
        },
        "#link_6_bottles": {
          nome: "NattyLean 6 bottles",
          preco: "$ 294,00",
          quantidade: "6 units",
          imagem: "../src/img/img-6-bottles.webp",
          bonus: "../src/img/bonus3.webp",
          nomebonus: "SKIN-FIRMING BLUEPRINT"
        }
  };

  // Pega o hash da URL (ex: "#link_3_bottles")

  const hashAtual = window.location.hash;

  const dados = produtos[hashAtual];

    if (dados) {
      document.getElementById("nomeProduto").textContent = dados.nome;
      document.getElementById("price-item").textContent = dados.preco;
      document.getElementById("qtd-item").textContent = dados.quantidade;
      document.getElementById("img-produto").src = dados.imagem;
      document.getElementById("img-produto").alt = dados.nome;
      document.getElementById("img-produto2").src = dados.bonus;
      document.getElementById("nbonus").textContent = dados.nomebonus;
    } else {
      // fallback (opcional)
      document.getElementById("nomeProduto").textContent = "Produto não identificado";
    }
}
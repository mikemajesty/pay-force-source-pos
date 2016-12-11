window.onload = function() {
  var btnEnviar = document.getElementById("enviar");

  btnEnviar.onclick = function() {
    var valor = document.getElementsByName('valor')[0].value;
    document.getElementById("valorPrint").value = valor;
    var telefone = document.getElementsByName('telefone')[0].value;
    postInfoPhone(valor, telefone);
  };

  var btnTeste = document.getElementById("teste");

  btnTeste.onclick = function() {
    imprimir();
  }
}

var transacaoId = "";

function getResultado() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var mensagem = xmlHttp.responseText;
        if(mensagem === "S") {
          mudarSucessoView();
        }
        if(mensagem === "N") {
          mudarNegadoView();
        }
      }
      if(xmlHttp.readyState == 4 && xmlHttp.status != 200) {
        setTimeout(function() {
          getResultado();
        }, 6000);
      }
  }
  xmlHttp.open("GET", "https://payforce.herokuapp.com/api/pos/resultado?" + "id=" + transacaoId, true);
  xmlHttp.send();
}

function postInfoPhone(valor, telefone) {
  var r = new XMLHttpRequest();
  r.open("POST", "https://payforce.herokuapp.com/api/pos/venda", true);
  r.onreadystatechange = function () {
    if(r.readyState == 4 && r.status == 200) {
      mudarAguardandoView();
      transacaoId = r.responseText.replace('"', '').replace('"', '');
      getResultado();
    }
  };
  r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var postData = 'valor=' + valor + '&' + 'telefone=' + telefone;
  r.send(postData);
}


function mudarAguardandoView() {
  document.getElementById('formulario').classList.add('hide');
  document.getElementById('aguardando').classList.remove('hide');
}

function mudarSucessoView() {
  document.getElementById('aguardando').classList.add('hide');
  document.getElementById('sucesso').classList.remove('hide');
}

function mudarNegadoView() {
  document.getElementById('aguardando').classList.add('hide');
  document.getElementById('negado').classList.remove('hide');
}

function imprimir() {
  window.print();
}

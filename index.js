window.onload = function() {
  var btnEnviar = document.getElementById("enviar");

  btnEnviar.onclick = function() {
    var valor = document.getElementsByName('telefone')[0].value;
    var telefone = document.getElementsByName('telefone')[0].value;
    postInfoPhone(valor, telefone);
  };
}

function getPullResultadoPagamento() {
    setInterval(function() {
       getResultado();
     }, 5000);
}

function getResultado(transacaoId) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          alert(xmlHttp.responseText);
      console.log(xmlHttp.status);
  }
  xmlHttp.open("GET", "https://payforce.herokuapp.com/api/pos/resultado?" + "id=" + transacaoId, true);
  xmlHttp.send(null);
}

function postInfoPhone(valor, telefone) {
  var r = new XMLHttpRequest();
  r.open("POST", "https://payforce.herokuapp.com/api/pos/venda", true);
  r.onreadystatechange = function () {
    if(r.readyState == 4 && r.status == 200) {
      changeView();
      transacaoId = r.responseText;
      getPullResultadoPagamento(transacaoId);
    }
  };
  r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var postData = 'valor=' + valor + '&' + 'telefone=' + telefone;
  r.send(postData);
}


function changeView() {
  document.getElementById('formulario').classList.add('hide');
  document.getElementById('aguardando').classList.remove('hide');
}

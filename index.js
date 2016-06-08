var vetDados = [], temIndicador = "não";
var dsv = d3.dsv(";", "text/plain");
var q = d3_queue.queue;
cl.leJson();

dsv("./csv/mensagemISP.csv", function (dados) {
  cl.textoISP("RISP", dados[0].RISP);
  cl.textoISP("AISP", dados[0].AISP);
  cl.textoISP("CISP", dados[0].CISP);
});
// Formato do dados
// AISP;DP;JAN;FEV;MAR;ABR;MAI;JUN;JUL;AGO;SET;OUT;NOV;DEZ;TOTAL
// 5;001;1;-;-;1;-;-;1;-;-;-;1;-;4
q()
  .defer(dsv, "./csv/Estupro2015.csv", function(dados){
      return {
        aisp: +dados.AISP,
        dp: +dados.DP,
        meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
        +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
        total: +dados.TOTAL,
      }; })
  .defer(dsv, "./csv/Estupro2014.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL,
        }; })
  .defer(dsv, "./csv/Estupro2013.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL,
        }; })
  .defer(dsv, "./csv/ROcorrencias-2015.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL,
        }; })
  .defer(dsv, "./csv/ROcorrencias-2014.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL,
        }; })
  .defer(dsv, "./csv/ROcorrencias-2013.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL,
        }; })
  .await(function(error, es2015, es2014, es2013,
                         rr2015, rr2014, rr2013) {
    if (error)
      console.log(error);

    var ees = [], err = [];
    ees.push(es2015);
    ees.push(es2014);
    ees.push(es2013);
    err.push(rr2015);
    err.push(rr2014);
    err.push(rr2013);


    var est = {}, // Contabilização por AISP
        estC = {}, // Contabilização por CISP (DP)
        totais = [], // Totais por AISP
        total = [],
        max = 0,
        maxC = 0,
        i;
    //dados = es2015;
    for (j = 0; j< ees.length; j++){ // Para cada ano
      estC[2015-j] = [];
      totais.push({});
      for(i = 0; i < ees[j].length; i++) {
        if (!isNaN(ees[j][i].total)) {
          estC[2015-j].push([ees[j][i].dp, ees[j][i].total]);
          if (ees[j][i].total > maxC) 
            maxC = ees[j][i].total;
          if (totais[j][ees[j][i].aisp] == undefined)
            totais[j][ees[j][i].aisp] = ees[j][i].total;
          else
            totais[j][ees[j][i].aisp] += ees[j][i].total;
        }
      }
    }

    for (j = 0; j< ees.length; j++) {
      total.push(0);
      est[2015-j] = [];
      for (var i in totais[j]) {
        est[2015-j].push([+i, totais[j][i]]);
        if (totais[j][i] > max)
          max = totais[j][i];
        total[j]+=totais[j][i];
      }
    }

    vetDados.push({selecionado: true, dados:est, distribuicao: "linear", tipo:"aisp", range: [0, max], legenda1: "Estupros por AISP", legenda2: "Estupros p/AISP", classes: 7, ano: 2015});
    vetDados.push({selecionado: true, dados:estC, distribuicao: "linear", tipo:"cisp", range: [0, maxC], legenda1: "Estupros por CISP", legenda2: "Estupros p/CISP", classes: 7, ano: 2015});

    var ro = {}, roC = {};
    totais = [];
    max = 0; maxC = 0;

    for (j = 0; j< err.length; j++){ // Para cada ano
      roC[2015-j] = [];
      totais.push({});
      for(i = 0; i < err[j].length; i++) {
        if (!isNaN(err[j][i].total)) {
          roC[2015-j].push([err[j][i].dp, err[j][i].total]);
          if (err[j][i].total > maxC)
            maxC = err[j][i].total;
          if (totais[j][err[j][i].aisp] == undefined)
            totais[j][err[j][i].aisp] = err[j][i].total;
          else
            totais[j][err[j][i].aisp] += err[j][i].total;
        }
      }
    }
    total = [];
    for (j = 0; j< err.length; j++) {
      total.push(0);
      ro[2015-j] = [];
      for (var i in totais[j]) {
        ro[2015-j].push([+i, totais[j][i]]);
        if (totais[j][i] > max)
          max = totais[j][i];
        total[j]+=totais[j][i];
      }
    }

    vetDados.push({selecionado: true, dados:ro, distribuicao: "linear", tipo:"aisp", range: [0, max], legenda1: "Registro de Ocorrências por AISP", legenda2: "Registro de Ocorrências p/AISP", classes: 7, ano: 2015});
    vetDados.push({selecionado: true, dados:roC, distribuicao: "linear", tipo:"cisp", range: [0, maxC], legenda1: "Registro de Ocorrências por CISP", legenda2: "Registro de Ocorrências p/CISP", classes: 7, ano:2015});
    preencheIndicador(vetDados);
  });


var TITULORIO = "Dados de Seguranca do Rio de Janeiro";
var TODASAISPS = "Áreas Integradas de Segurança Pública",
    TODASRISPS = "Regiões Integradas de Segurança Pública",
    TODASCIRPS = "Circunscrições Integradas de Segurança Pública";

var hist = hs.histograma(),
    rio = cl.pintaMapa();

function preencheIndicador(listaIndicadores) {
  indicador = d3.select("#selecIndicador");

  for (i = 0; i < listaIndicadores.length; i++)
    if (listaIndicadores[i].selecionado)
      indicador.append("option").attr("value", String(i+1)).text(listaIndicadores[i].legenda1);
    else
      indicador.append("option").attr("value", String(i+1)).text(listaIndicadores[i].legenda1).attr("disabled", true);

    temIndicador = "sim";
  }
  var selInd;

  function selIndicador() {
    var s = document.getElementById('selecIndicador');

    if ((selInd=s.selectedIndex-1) >= 0) {
      //cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].tipo, vetDados[selInd].range, vetDados[selInd].legenda2, initClasse(vetDados[selInd].classes));
      //cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].tipo, vetDados[selInd].range, vetDados[selInd].legenda2, +d3.select("#valor-classes").text());
      rio.dados(vetDados[selInd].dados).distribuicao(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).rangeData(vetDados[selInd].range).tit(vetDados[selInd].legenda2).faixas(+d3.select("#valor-classes").text()).ano(vetDados[selInd].ano).call();
      hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda2).escalaY(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).ano(vetDados[selInd].ano).call();
    }
    document.getElementById("selecIndicador").options[0].selected = true;
  }

  var classesInput = d3.select("#classe").on("input", redraw).on("change", redraw);
  var classes;

  function redraw() {
    rangeUpdate();
    d3.select("#valor-classes").text(classes = +classesInput.property("value"));
    if (cl.status == "aisp" || cl.status == "cisp") {
      //cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].tipo, vetDados[selInd].range, vetDados[selInd].legenda2, classes);
      rio.faixas(+d3.select("#valor-classes").text()).call();
      hist();
    }
  }

  function rangeUpdate() {
    d3.select("#valor-classes").text(classes = +classesInput.property("value"));
  }

  function initClasse(i) {
    classesInput.property("value", i);
    d3.select("div#selecionaClasse").style("display", "inline");
    rangeUpdate();
    return(i);
  }

  function apagaRange() {
    d3.select("div#selecionaClasse").style("display", "none");
  }

  var espera = setInterval(inicializaMapa, 500);

  function inicializaMapa(){
    if (cl.leuJson == "sim" && temIndicador == "sim") {
      clearInterval(espera);
      selInd=0;
      //cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].tipo, vetDados[selInd].range, vetDados[selInd].legenda2, initClasse(vetDados[selInd].classes));
      rio.dados(vetDados[selInd].dados).distribuicao(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).rangeData(vetDados[selInd].range).tit(vetDados[selInd].legenda2).faixas(initClasse(vetDados[selInd].classes)).ano(vetDados[selInd].ano).call();
      hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda2).escalaY(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).ano(vetDados[selInd].ano).call();
      rangeUpdate();
    }
  }
var vetDados = [], temIndicador = "não";
var dsv = d3.dsv(";", "text/plain");
var q = d3_queue.queue;
var lang;

lang = window.navigator.userLanguage || window.navigator.language == "pt-BR" ? 0 : 1;

if (lang) {
  d3.select("#tituloPagina").html("Rape cases in Rio de Janeiro since 2013 to April 2016");
  d3.select("#comentario").html("2016 numbers based on January to April 2016 average");
  d3.select("#vejaTambem").html('See also: <a href="/impeachment" id="linkAlternativo">Brazil Impeachment Voting 2016</a>');
  d3.select("#tabMapa").html("Map");
  d3.select("#tabHistograma").html("Histogram");
  d3.select("#selecaoIndicador").html("Select indicator...");
  d3.select("#ordena").html(" Sort");
  d3.select("#tituloClasses").html("Classes: ");
  d3.select("#textoClasses").html(" Classes");
}

cl.leJson();

dsv("./csv/mensagemISP.csv", function (dados) {
  if (!lang) {
    cl.textoISP("RISP", dados[0].RISP);
    cl.textoISP("AISP", dados[0].AISP);
    cl.textoISP("CISP", dados[0].CISP);
  } else {
    cl.textoISP("RISP", dados[0].RISP_en);
    cl.textoISP("AISP", dados[0].AISP_en);
    cl.textoISP("CISP", dados[0].CISP_en);    
  }
});
// Formato do dados
// AISP;DP;JAN;FEV;MAR;ABR;MAI;JUN;JUL;AGO;SET;OUT;NOV;DEZ;TOTAL
// 5;001;1;-;-;1;-;-;1;-;-;-;1;-;4
q()
  .defer(dsv, "./csv/PopulacaoEstadoRJ-1990-2016.csv", function(dados){
      return {
        ano: +dados.Ano,
        populacao: +dados.Populacao
      };
    })
  .defer(dsv, "./csv/indicePaises.csv", function(dados) {
      return {
        pais: [dados.Pais, dados.Country],
        ano: +dados.Ano,
        indice: +dados.Indice
      };
    })
  .defer(dsv, "./csv/Estupro2016.csv", function(dados){
      return {
        aisp: +dados.AISP,
        dp: +dados.DP,
        meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
        +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
        total: +dados.TOTAL
      }; })
  .defer(dsv, "./csv/Estupro2015.csv", function(dados){
      return {
        aisp: +dados.AISP,
        dp: +dados.DP,
        meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
        +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
        total: +dados.TOTAL
      }; })
  .defer(dsv, "./csv/Estupro2014.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .defer(dsv, "./csv/Estupro2013.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .defer(dsv, "./csv/ROcorrencias-2016.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .defer(dsv, "./csv/ROcorrencias-2015.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .defer(dsv, "./csv/ROcorrencias-2014.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .defer(dsv, "./csv/ROcorrencias-2013.csv", function(dados){
        return {
          aisp: +dados.AISP,
          dp: +dados.DP,
          meses: [+dados.JAN, +dados.FEV, +dados.MAR, +dados.ABR, +dados.MAI, +dados.JUN,
          +dados.JUL, +dados.AGO, +dados.SET, +dados.OUT, +dados.NOV, +dados.DEZ],
          total: +dados.TOTAL
        }; })
  .await(function(error, populacaoRJ, indicePaises,
                         es2016, es2015, es2014, es2013,
                         rr2016, rr2015, rr2014, rr2013) {

    function projecao(vetor, base) {
      var mediaMensal;
      for (i = 0; i<vetor.length; i++) {
        if (!isNaN(vetor[i].total)) {
          mediaMensal = vetor[i].total/base;
          vetor[i].total = mediaMensal*12;
        }
        for (j = base; j<12; j++)
          vetor[i].meses[j] = mediaMensal;
      }
    }

    if (error)
      console.log(error);


    var indices = [];
    //console.table(indicePaises);
    for (i = 0; i<indicePaises.length;i++)
      indices.push([[indicePaises[i].pais, indicePaises[i].country], indicePaises[i].indice]);

    var popRJ = {};
    for (i = 0; i<populacaoRJ.length; i++) {
      popRJ[populacaoRJ[i].ano] = populacaoRJ[i].populacao;
    }

    var ees = [], err = [];

    projecao(es2016, 4);
    projecao(rr2016, 4);

    ees.push(es2016);
    ees.push(es2015);
    ees.push(es2014);
    ees.push(es2013);
    err.push(rr2016);
    err.push(rr2015);
    err.push(rr2014);
    err.push(rr2013);


    var est = {}, // Contabilização por AISP
        estC = {}, // Contabilização por CISP (DP)
        totais = [], // Totais por AISP
        totaisMe = {}, // Totais mensais
        total = [],
        max = 0,
        maxC = 0,
        i;
    //dados = es2015;
    for (j = 0; j< ees.length; j++){ // Para cada ano
      estC[2016-j] = [];
      totais.push({});
      totaisMe[2016-j]=[0,0,0,0,0,0,0,0,0,0,0,0];
      for(i = 0; i < ees[j].length; i++) {
        if (!isNaN(ees[j][i].total)) {
          estC[2016-j].push([ees[j][i].dp, ees[j][i].total]);
          for(m=0;m<12;m++)
            if (!isNaN(ees[j][i].meses[m]))
              totaisMe[2016-j][m] += ees[j][i].meses[m];
          if (ees[j][i].total > maxC) 
            maxC = ees[j][i].total;
          if (totais[j][ees[j][i].aisp] == undefined)
            totais[j][ees[j][i].aisp] = ees[j][i].total;
          else
            totais[j][ees[j][i].aisp] += ees[j][i].total;
        }
      }
    }
    var totaisMeMes = [];
    for (j in totaisMe) {
      for (m=0; m<12; m++) {
        i = totaisMeMes.length;
        divisor = popRJ[2013 + Math.trunc(i/12)]/100000/12;
        totaisMeMes.push([i, totaisMe[j][m]/divisor]);
      }
    }

    for (j = 0; j< ees.length; j++) {
      total.push(0);
      est[2016-j] = [];
      for (var i in totais[j]) {
        est[2016-j].push([+i, totais[j][i]]);
        if (totais[j][i] > max)
          max = totais[j][i];
        total[j]+=totais[j][i];
      }
    }
    vetDados.push({selecionado: true, dados:estC, distribuicao: "linear", tipo:"cisp", total: {dados:totaisMeMes, msg:["Estupros por 100.000 habitantes", "Rapes per 100.000 inhabitants"]}, indices: indicePaises,
                   range: [0, maxC], legenda1: ["Estupros por CISP", "Rape cases by CISP"][lang],
                   legenda2: ["Estupros p/CISP", "Rape cases/CISP"][lang], classes: 6, ano: 2013});
    vetDados.push({selecionado: true, dados:est, distribuicao: "linear", tipo:"aisp", total: {dados:totaisMeMes, msg:["Estupros por 100.000 habitantes", "Rapes per 100.000 inhabitants"]}, indices: indicePaises,
                   range: [0, max], legenda1: ["Estupros por AISP", "Rape cases by AISP"][lang],
                   legenda2: ["Estupros p/AISP", "Rape cases/AISP"][lang], classes: 6, ano: 2013});
    vetDados.push({selecionado: false, legenda1: "──────────────────────────────" });

    var ro = {}, roC = {}, totaisMr = {};
    totais = [];
    max = 0; maxC = 0;

    for (j = 0; j< err.length; j++){ // Para cada ano
      roC[2016-j] = [];
      totaisMr[2016-j]=[0,0,0,0,0,0,0,0,0,0,0,0];
      totais.push({});
      for(i = 0; i < err[j].length; i++) {
        if (!isNaN(err[j][i].total)) {
          roC[2016-j].push([err[j][i].dp, err[j][i].total]);
          for(m=0;m<12;m++)
            if (!isNaN(err[j][i].meses[m]))
              totaisMr[2016-j][m] += err[j][i].meses[m];
          if (err[j][i].total > maxC)
            maxC = err[j][i].total;
          if (totais[j][err[j][i].aisp] == undefined)
            totais[j][err[j][i].aisp] = err[j][i].total;
          else
            totais[j][err[j][i].aisp] += err[j][i].total;
        }
      }
    }

    var totaisMrMes = [];
    for (j in totaisMr) {
      for (m=0; m<12; m++) {
        i = totaisMrMes.length;
        totaisMrMes.push([i, totaisMr[j][m]]);
      }
    }

    total = [];
    for (j = 0; j< err.length; j++) {
      total.push(0);
      ro[2016-j] = [];
      for (var i in totais[j]) {
        ro[2016-j].push([+i, totais[j][i]]);
        if (totais[j][i] > max)
          max = totais[j][i];
        total[j]+=totais[j][i];
      }
    }

    vetDados.push({selecionado: true, dados:roC, distribuicao: "linear", tipo:"cisp", total: {dados:totaisMrMes, msg:["Total de Ocorrências", "Total criminal records"]},
                   range: [0, maxC], legenda1: ["Registro de Ocorrências por CISP", "Total cases by CISP"][lang],
                   legenda2: ["Registro de Ocorrências p/CISP", "Total cases/CISP"][lang], classes: 6, ano:2013});
    vetDados.push({selecionado: true, dados:ro, distribuicao: "linear", tipo:"aisp", total: {dados:totaisMrMes, msg:["Total de Ocorrências", "Total criminal records"]},
                   range: [0, max], legenda1: ["Registro de Ocorrências por AISP", "Total cases by AISP"][lang],
                   legenda2: ["Registro de Ocorrências p/AISP", "Total cases/AISP"][lang], classes: 6, ano: 2013});
    preencheIndicador(vetDados);
  });


var TITULORIO;
TITULORIO = ["Casos de Estupro no Rio de Janeiro", "Rio de Janeiro rape cases"][lang];
var TODASAISPS, TODASRISPS, TODASCIRPS;
TODASAISPS = ["Áreas Integradas de Segurança Pública", "Integrated Areas of Public Safety"][lang];
TODASRISPS = ["Regiões Integradas de Segurança Pública", "Integrated Regions of Public Safety"][lang];
TODASCIRPS = ["Circunscrições Integradas de Segurança Pública", "Integrated Circumscriptions of Public Safety"][lang];

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
      rio
        .dados(vetDados[selInd].dados)
        .distribuicao(vetDados[selInd].distribuicao)
        .tipo(vetDados[selInd].tipo)
        .rangeData(vetDados[selInd].range)
        .tit(vetDados[selInd].legenda1)
        .faixas(+d3.select("#valor-classes").text())
        .sparkline(vetDados[selInd].total)
        .referencia(vetDados[selInd].indices)
        .call();
      hist
        .dados(vetDados[selInd].dados)
        .legenda(vetDados[selInd].legenda1)
        .escalaY(vetDados[selInd].distribuicao)
        .tipo(vetDados[selInd].tipo)
        .rangeHist(vetDados[selInd].range)
        .call();
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
      rio
        .dados(vetDados[selInd].dados)
        .distribuicao(vetDados[selInd].distribuicao)
        .tipo(vetDados[selInd].tipo)
        .rangeData(vetDados[selInd].range)
        .tit(vetDados[selInd].legenda1)
        .faixas(initClasse(vetDados[selInd].classes))
        .ano(vetDados[selInd].ano)
        .sparkline(vetDados[selInd].total)
        .referencia(vetDados[selInd].indices)
        .call();
      hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda1).escalaY(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).ano(vetDados[selInd].ano).rangeHist(vetDados[selInd].range).call();
      rangeUpdate();
    }
  }
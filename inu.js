function preencheIndicador(e){for(indicador=d3.select("#selecIndicador"),i=0;i<e.length;i++)e[i].selecionado?indicador.append("option").attr("value",String(i+1)).text(e[i].legenda1):indicador.append("option").attr("value",String(i+1)).text(e[i].legenda1).attr("disabled",!0);temIndicador="sim"}function selIndicador(){var e=document.getElementById("selecIndicador");(selInd=e.selectedIndex-1)>=0&&(rio.dados(vetDados[selInd].dados).distribuicao(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).rangeData(vetDados[selInd].range).tit(vetDados[selInd].legenda1).faixas(+d3.select("#valor-classes").text()).sparkline(vetDados[selInd].total).referencia(vetDados[selInd].indices).call(),hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda1).escalaY(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).rangeHist(vetDados[selInd].range).call()),document.getElementById("selecIndicador").options[0].selected=!0}function redraw(){rangeUpdate(),d3.select("#valor-classes").text(classes=+classesInput.property("value")),("aisp"==cl.status||"cisp"==cl.status)&&(rio.faixas(+d3.select("#valor-classes").text()).call(),hist())}function rangeUpdate(){d3.select("#valor-classes").text(classes=+classesInput.property("value"))}function initClasse(e){return classesInput.property("value",e),d3.select("div#selecionaClasse").style("display","inline"),rangeUpdate(),e}function apagaRange(){d3.select("div#selecionaClasse").style("display","none")}function inicializaMapa(){"sim"==cl.leuJson&&"sim"==temIndicador&&(clearInterval(espera),selInd=0,rio.dados(vetDados[selInd].dados).distribuicao(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).rangeData(vetDados[selInd].range).tit(vetDados[selInd].legenda1).faixas(initClasse(vetDados[selInd].classes)).ano(vetDados[selInd].ano).sparkline(vetDados[selInd].total).referencia(vetDados[selInd].indices).call(),hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda1).escalaY(vetDados[selInd].distribuicao).tipo(vetDados[selInd].tipo).ano(vetDados[selInd].ano).rangeHist(vetDados[selInd].range).call(),rangeUpdate())}var vetDados=[],temIndicador="não",dsv=d3.dsv(";","text/plain"),q=d3_queue.queue,lang;lang=window.navigator.userLanguage||"pt-BR"==window.navigator.language?0:1,lang&&(d3.select("#tituloPagina").html("Rape cases in Rio de Janeiro since 2013 to May 2016"),d3.select("#comentario").html("2016 numbers based on January to May 2016 average"),d3.select("#vejaTambem").html('See also: <a href="/impeachment" id="linkAlternativo">Brazil Impeachment Voting 2016</a>'),d3.select("#tabMapa").html("Map"),d3.select("#tabHistograma").html("Chart"),d3.select("#selecaoIndicador").html("Select indicator..."),d3.select("#ordena").html(" Sort"),d3.select("#tituloClasses").html("Classes: "),d3.select("#textoClasses").html(" Classes")),cl.leJson(),dsv("./csv/mensagemISP.csv",function(e){lang?(cl.textoISP("RISP",e[0].RISP_en),cl.textoISP("AISP",e[0].AISP_en),cl.textoISP("CISP",e[0].CISP_en)):(cl.textoISP("RISP",e[0].RISP),cl.textoISP("AISP",e[0].AISP),cl.textoISP("CISP",e[0].CISP))}),q().defer(dsv,"./csv/PopulacaoEstadoRJ-1990-2016.csv",function(e){return{ano:+e.Ano,populacao:+e.Populacao}}).defer(dsv,"./csv/indicePaises.csv",function(e){return{pais:[e.Pais,e.Country],ano:+e.Ano,indice:+e.Indice}}).defer(dsv,"./csv/Estupro2016.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/Estupro2015.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/Estupro2014.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/Estupro2013.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/ROcorrencias-2016.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/ROcorrencias-2015.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/ROcorrencias-2014.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).defer(dsv,"./csv/ROcorrencias-2013.csv",function(e){return{aisp:+e.AISP,dp:+e.DP,meses:[+e.JAN,+e.FEV,+e.MAR,+e.ABR,+e.MAI,+e.JUN,+e.JUL,+e.AGO,+e.SET,+e.OUT,+e.NOV,+e.DEZ],total:+e.TOTAL}}).await(function(e,a,s,t,o,n,d,i,l,r,c){function p(e,a){var s;for(A=0;A<e.length;A++)for(s=0,isNaN(e[A].total)||(s=e[A].total/a,e[A].total=12*s),j=a;j<12;j++)e[A].meses[j]=s}e&&console.log(e);var I=[];for(A=0;A<s.length;A++)I.push([[s[A].pais,s[A].country],s[A].indice]);var u={};for(A=0;A<a.length;A++)u[a[A].ano]=a[A].populacao;var v=[],g=[];p(t,5),p(i,5),v.push(t),v.push(o),v.push(n),v.push(d),g.push(i),g.push(l),g.push(r),g.push(c);var A,S={},P={},f=[],h={},D=[],O=0,T=0;for(j=0;j<v.length;j++)for(P[2016-j]=[],f.push({}),h[2016-j]=[0,0,0,0,0,0,0,0,0,0,0,0],A=0;A<v[j].length;A++)if(!isNaN(v[j][A].total)){for(P[2016-j].push([v[j][A].dp,v[j][A].total]),m=0;m<12;m++)isNaN(v[j][A].meses[m])||(h[2016-j][m]+=v[j][A].meses[m]);v[j][A].total>T&&(T=v[j][A].total),void 0==f[j][v[j][A].aisp]?f[j][v[j][A].aisp]=v[j][A].total:f[j][v[j][A].aisp]+=v[j][A].total}var R=[];for(j in h)for(m=0;m<12;m++)A=R.length,divisor=u[2013+Math.trunc(A/12)]/1e5/12,R.push([A,h[j][m]/divisor]);for(j=0;j<v.length;j++){D.push(0),S[2016-j]=[];for(var A in f[j])S[2016-j].push([+A,f[j][A]]),f[j][A]>O&&(O=f[j][A]),D[j]+=f[j][A]}vetDados.push({selecionado:!0,dados:P,distribuicao:"linear",tipo:"cisp",total:{dados:R,msg:["Estupros por 100.000 habitantes","Rapes per 100.000 inhabitants"]},indices:s,range:[0,T],legenda1:["Estupros por CISP","Rape cases by CISP"][lang],legenda2:["Estupros p/CISP","Rape cases/CISP"][lang],classes:6,ano:2013}),vetDados.push({selecionado:!0,dados:S,distribuicao:"linear",tipo:"aisp",total:{dados:R,msg:["Estupros por 100.000 habitantes","Rapes per 100.000 inhabitants"]},indices:s,range:[0,O],legenda1:["Estupros por AISP","Rape cases by AISP"][lang],legenda2:["Estupros p/AISP","Rape cases/AISP"][lang],classes:6,ano:2013}),vetDados.push({selecionado:!1,legenda1:"──────────────────────────────"});var E={},N={},J={};for(f=[],O=0,T=0,j=0;j<g.length;j++)for(N[2016-j]=[],J[2016-j]=[0,0,0,0,0,0,0,0,0,0,0,0],f.push({}),A=0;A<g[j].length;A++)if(!isNaN(g[j][A].total)){for(N[2016-j].push([g[j][A].dp,g[j][A].total]),m=0;m<12;m++)isNaN(g[j][A].meses[m])||(J[2016-j][m]+=g[j][A].meses[m]);g[j][A].total>T&&(T=g[j][A].total),void 0==f[j][g[j][A].aisp]?f[j][g[j][A].aisp]=g[j][A].total:f[j][g[j][A].aisp]+=g[j][A].total}var b=[];for(j in J)for(m=0;m<12;m++)A=b.length,b.push([A,J[j][m]]);for(D=[],j=0;j<g.length;j++){D.push(0),E[2016-j]=[];for(var A in f[j])E[2016-j].push([+A,f[j][A]]),f[j][A]>O&&(O=f[j][A]),D[j]+=f[j][A]}vetDados.push({selecionado:!0,dados:N,distribuicao:"linear",tipo:"cisp",total:{dados:b,msg:["Total de Ocorrências","Total criminal records"]},range:[0,T],legenda1:["Registro de Ocorrências por CISP","Total cases by CISP"][lang],legenda2:["Registro de Ocorrências p/CISP","Total cases/CISP"][lang],classes:6,ano:2013}),vetDados.push({selecionado:!0,dados:E,distribuicao:"linear",tipo:"aisp",total:{dados:b,msg:["Total de Ocorrências","Total criminal records"]},range:[0,O],legenda1:["Registro de Ocorrências por AISP","Total cases by AISP"][lang],legenda2:["Registro de Ocorrências p/AISP","Total cases/AISP"][lang],classes:6,ano:2013}),preencheIndicador(vetDados)});var TITULORIO;TITULORIO=["Casos de Estupro no Rio de Janeiro","Rio de Janeiro rape cases"][lang];var TODASAISPS,TODASRISPS,TODASCIRPS;TODASAISPS=["Áreas Integradas de Segurança Pública","Integrated Areas of Public Safety"][lang],TODASRISPS=["Regiões Integradas de Segurança Pública","Integrated Regions of Public Safety"][lang],TODASCIRPS=["Circunscrições Integradas de Segurança Pública","Integrated Circumscriptions of Public Safety"][lang];var hist=hs.histograma(),rio=cl.pintaMapa(),selInd,classesInput=d3.select("#classe").on("input",redraw).on("change",redraw),classes,espera=setInterval(inicializaMapa,500);
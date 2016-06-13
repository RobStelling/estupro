/*
 * Rotinas de histograma
 * Global: hs
 * Todo:
 * x Converter rotinas para getter/setter: 19/12
 * - Remover dependência de cores do mapa ?
 * - Trabalhar sobre uma seleção
 * - Ajustar locale dos valores do eixo y e legenda (ver em coloring.js)
 * x Melhorar tooltip para a legenda do histograma: 18/12
 * x Ajustar a transição entre gráficos: 05/01
 * - Incluir linhas de média (estado, regiões, seleção, entrada (média do país ou mundial, por exemplo)
 * - Pensar como incluir small multiples (tanto no histograma quanto no cloropleth)
 * x Incluir imagem alternativa antes da criação do primeiro histograma (em index.html): 05/01 (texto)
 */
!function() { 
  var hs = {
    version: "1.0.5"
  };

  hs.histograma = function () {
    var dados = [];
    var ano;
    var legenda = "Histograma";
    var escalaY = "linear";
    var tipo = "";
    var rangeHist = [];
    var mensagemxAxis = "Eixo X";
    var margin = {top: 20, right: 10, bottom: 160, left: 70},
      width = 950 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      hsdata = [];
    hs.SELECIONADO = "black";
    var clicou = false;
    var hs_XAXISOFFSET = -20;
    var hs_temHistograma = false;

    svgH = d3.select("body").select("div.hist")
      .append("svg")
        .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+
          " "+(height+margin.top+margin.bottom))
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "myHist")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    hstext = svgH
      .append("text")
        .attr({class: "titulo1", x: "0", dx: ".20em", y: String((height+margin.top+margin.bottom)/2)})
        .text("Aguarde...");

    hsx = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);
    
    hsxAxis = d3.svg.axis()
        .scale(hsx)
        .orient("bottom");

    function hs_labelToolTip() {
      var svg =  d3.select(".y.axis");
      svg.on("mouseover", function() {
        var tip = d3.select("div.myTip");
        tip.html(hs.legenda + " - " + ano);
        return cl.tooltip.style("visibility", "visible");})
      .on("mousemove", function() {
        return cl.tooltip.style("top", (d3.event.pageY-10)+"px")
        .style("left",(d3.event.pageX+15)+"px");})
      .on("mouseout",  function() {
        return cl.tooltip.style("visibility", "hidden");}); 
    };
    var hs_corH;
    function hs_hookToolTip(){
      var svg = svgH.selectAll(".bar")
        .on("mouseover", function(d){
          var tip = d3.select("div.myTip");

          if (tipo == "aisp")
            tip.html("RISP "+cl.aisp("risp", d[0])+"<br>"+cl.aisp("nome", d[0])+": "+d[1].toLocaleString());            
          else
            tip.html("RISP "+cl.aisp("risp", cl.nomeDP[d[0]].aisp)+"<br>"+cl.aisp("nome", cl.nomeDP[d[0]].aisp)+"<br>"+cl.dp(d[0])+": "+d[1].toLocaleString()+"<br>"+cl.nomeDP[d[0]].up);

          d3.select("svg #H"+d[0])
              .style("fill",function(dd){
                hs_corH = this.style.fill;
                return hs.SELECIONADO
              });
          d3.selectAll(".cisp")
            .filter(function(dd){
              switch (cl.status) {
                case "aisps":
                case "risps": return hist.tipo()=="aisp"?d[0]==dd.properties.AISP:d[0]==dd.properties.DP;
                case "cisps": return hist.tipo()=="aisp"?false:d[0]==dd.properties.DP;
                case "aisp": return d[0]==dd.properties.AISP;
                case "cisp": return d[0]==dd.properties.DP;
              }
            })
            .style("fill", cl.SELECIONADO);
          return cl.tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(){
          return cl.tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+15)+"px");
        })
        .on("mouseout", function(d){
          this.style.fill=hs_corH;
          d3.selectAll(".cisp").filter(function(dd){return this.style.fill == cl.SELECIONADO;})
            .style("fill", hs_corH);
          return cl.tooltip.style("visibility", "hidden");
        });
    };

    hs.stringLimpa = function hs_stringLimpa(s) {
      return s.toUpperCase().replace(/ /g,"").replace(/[ÃÂÁÀÄ]/g, "A").replace(/[ÊÉÈË]/g, "E").replace(/[ÎÍÌÏ]/g, "I").replace(/[ÕÔÓÒÖ]/g, "O").replace(/[ÛÚÙÜ]/g, "U");
    };

    function hs_ordena() {
    // Copia na escrita já que tweens são avaliados depois de um delay.
      var x0 = hsx.domain(hsdata.sort(this.checked ?
                                        function(a, b) { 
                                          return b[1] - a[1];
                                        } :
                                        function(a, b) {
                                          return d3.ascending(hs.nomeAISPouDP[tipo](a[0]), hs.nomeAISPouDP[tipo](b[0]));
                                          if (tipo == "aisp")
                                            return d3.ascending(hs.stringLimpa(cl.aisp("nome", a[0])), hs.stringLimpa(cl.aisp("nome", b[0])));
                                          else
                                            return d3.ascending(hs.stringLimpa(cl.dp(a[0])), hs.stringLimpa(cl.dp(b[0])));
                                        })
                                     .map(
                                      function(d) {
                                        return hs.nomeAISPouDP[tipo](d[0]);
                                        if (tipo == "aisp")
                                          return cl.aisp("nome", d[0]);
                                        else
                                          return cl.dp(d[0]);
                                      })).copy();

      svgH.selectAll(".bar")
        .sort(
          function(a, b) {
            return x0(hs.nomeAISPouDP[tipo](a[0])) - x0(hs.nomeAISPouDP[tipo](b[0]));
            if (tipo == "aisp")
              return x0(cl.aisp("nome", a[0])) - x0(cl.aisp("nome", b[0]));
            else
              return x0(cl.dp(a[0])) - x0(cl.dp(b[0]));
          });

      var transition = svgH.transition().duration(950),
          delay = function(d, i) { return i * 30; };

      transition.selectAll(".bar")
          .delay(delay)
          .attr("x",
            function(d) {
              return x0(hs.nomeAISPouDP[tipo](d[0]))
              if (tipo == "aisp")
                return x0(cl.aisp("nome", d[0]));
              else
                return x0(cl.dp(d[0]));
            });

      transition.select(".x.axis")
          .call(hsxAxis)
          .selectAll("g")
          .delay(delay)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", hs_XAXISOFFSET)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end");
    };

/*
 * Elimina dados de entrada que não tenham código correto de município 
 * do Rio de Janeiro e retorna um vetor ordenado pela variável passada
 */
    hs.nomeAISPouDP = {
      "aisp":function(aisp) {
          return cl.aisp("nome", aisp);
        },
      "cisp":function(dp) {
          //console.log(dp);
          if (cl.nomeDP[dp] != undefined)
            return cl.nomeDP[dp].up;
          return "undefined";
        }
      //"cisp":function(dp) {console.log(dp); return cl.dp(dp);}
    };

    function hs_valida(dados, tipo) {
      var i, j, k = [];
      for (i = 0, j = 0; i < dados.length; i++) {
        if (hs.nomeAISPouDP[tipo](dados[i][0]) != undefined)
          k[j++] = dados[i];
      }
      k1 = k.sort(function(a,b) {
        return d3.ascending(hs.nomeAISPouDP[tipo](a[0]), hs.nomeAISPouDP[tipo](b[0]));
      });
      return k1;
    };

    function histograma() {
      var y, yAxis;

      d3.select("input#hist").property("checked", false);

      dados[ano] = hs_valida(dados[ano], tipo);
      hsdata = dados[ano]; //.slice(0);
      if (escalaY == "linear")
        y = d3.scale.linear().range([height, 0]);
      else
        y = d3.scale.sqrt().range([height, 0]);

      yAxis = d3.svg.axis().scale(y).orient("left");

      hsx.domain(dados[ano].map(function(d, i) { return hs.nomeAISPouDP[tipo](d[0]); }));

      if ((dataMin = Math.min(0, d3.min(dados[ano], function(d,i){return d[1];}))) < 0)
        if (escalaY == "linear")
          dataMin = dataMin * 1.05;
        else
          dataMin = dataMin * 1.3;

      //y.domain([dataMin, d3.max(dados[ano], function(d, i) { return d[1]; })]);
      y.domain(rangeHist);
      hstext.remove();
      if (!hs_temHistograma) {
        svgH.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height+")")
        .call(hsxAxis)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", hs_XAXISOFFSET)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-90)")
          .style("font-size", (((hsx.rangeBand()-5)/(19))*(0.7)+0.5)+"em")
          .style("text-anchor", "end");

        svgH.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "gLabel")
          .attr("transform", "rotate(-90)")
          .attr("y", 2)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(legenda + " - " + ano);
      } else {
        d3.select(".y.axis").transition().duration(1000).call(yAxis);
        d3.select(".y.axis").select("text.gLabel").text(hs.legenda=legenda + " - " + ano);

        hsx.domain(dados[ano].map(function(d, i) {
          return hs.nomeAISPouDP[tipo](d[0]);
          }));

        d3.select(".x.axis").transition().duration(900).ease("linear")
          .call(hsxAxis)
          .style("opacity", 1.0)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", hs_XAXISOFFSET)
          .attr("dy", ".35em")
          //.style("font-size", (((hsx.rangeBand()-5)/(19))*(0.7)+0.5)+"em")
          
          //((n-start1)/(stop1-start1))*(stop2-start2)+start2
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end");

        setTimeout(function(){
          d3.select(".x.axis") //.transition().duration(900).ease("linear")
            .call(hsxAxis)
            .style("opacity", 1.0)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", hs_XAXISOFFSET)
            .attr("dy", ".35em")
            .style("font-size", (((hsx.rangeBand()-5)/(19))*(0.7)+0.5)+"em")
          
          //((n-start1)/(stop1-start1))*(stop2-start2)+start2
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end");
          }, 1100);



        cancelaLupa();
      }
      clicou = false;
/*
      svgH.selectAll(".bar")
        .data(dados, function(d){
          return hs.nomeAISPouDP[tipo](d[0]);
        })
        .enter().append("rect")
          .attr("class", "bar")
          .attr("width", hsx.rangeBand())
          .attr("y", height)
          .attr("height", "0")
          .attr("id", function(d) {
            return "H"+d[0];
          });
            
      svgH.selectAll(".bar")
          .transition()
          .duration(1500)
          .ease("cubic")
          .attr("y", function(d) { return y(d[1]); })
          .attr("x", function(d) {
            return hsx(hs.nomeAISPouDP[tipo](d[0]));
          })
          .attr("height", function(d) { return height - y(d[1]); })
          .style("fill", function(d){ return cl.cor(d[1])});
 /*/
      var meuHist = d3.select(".myHist").selectAll(".bar")
            .data(dados[ano], function(d){
              return hs.nomeAISPouDP[tipo](d[0]);
            });

      meuHist
        .transition()
        .duration(100)
        .attr("x", function(d){
          return hsx(hs.nomeAISPouDP[tipo](d[0]));
        });
      meuHist
        .transition()
        .ease("sin-in-out")
        .duration(1000)
        .attr("y", height)
        .attr("height", "0");
        //.style("fill", cl.grayedout);

      meuHist.enter().append("rect")
        .attr("class", "bar")
        .attr("width", hsx.rangeBand())
        .attr("y", height)
        .attr("height", "0")
        .attr("id", function(d) {
          return "H"+d[0];
        });
      meuHist
        .transition()
        .duration(1000)
        .attr("y", function(d){
          return(y(d[1]))})
        .attr("x", function(d){
          return hsx(hs.nomeAISPouDP[tipo](d[0]));})
        .attr("height", function(d){
          return height-y(d[1]);})
        .attr("width", hsx.rangeBand())
        .style("fill", function(d){
          return cl.cor(d[1]);})
        .style("fill-opacity", 1);

      meuHist.exit()
        .transition()
          .duration(100)
          .attr("height", "0")
          .style("fill-opacity", 1e-6)
          .remove();
//
//
//     
      d3.select("input#hist").on("change", hs_ordena);

      hs_hookToolTip();
      hs.legenda = legenda;
      hs_labelToolTip();
      if (!hs_temHistograma)
        lupa(d3.select(".myHist"), 20, 555);
      hs_temHistograma = true;      
    };

    histograma.dados = function(valor) {
      if(!arguments.length) return dados;
      dados = valor;
      return histograma;
    };

    histograma.legenda = function(valor) {
      if(!arguments.length) return legenda;
      legenda = valor;
      return histograma;
    };

    histograma.escalaY = function(valor) {
      if(!arguments.length) return escalaY;
      escalaY = valor;
      return histograma;
    };

    histograma.mensagemxAxis = function(valor) {
      if(!arguments.length) return mensagemxAxis;
      mensagemxAxis = valor;
      return histograma;
      // body...
    };

    histograma.tipo = function(valor) {
      if(!arguments.length) return tipo;
      tipo = valor;
      return histograma;
    };

    histograma.clicou = function(valor) {
      if(!arguments.length) return clicou;
      clicou = valor;
      return histograma;
    };

    histograma.ano = function(valor) {
      if(!arguments.length) return ano;
      ano = valor;
      return histograma;
    }

    histograma.rangeHist = function(valor) {
      if(!arguments.length) return rangeHist;
      rangeHist = valor;
      return histograma;
    }

    return histograma;
  }
  if (typeof define === "function" && define.amd) this.hs = hs, define(hs); else if (typeof module === "object" && module.exports) module.exports = hs; else this.hs = hs;
}();
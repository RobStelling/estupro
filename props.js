function botaoISP(svg, x, y, textoBotao, textoTip, titulo, classe, onClick ) {
  var corFill = "";
  var selecionado = "black";

  svg.append("rect")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("height", 30)
    .attr("width", 70)
    .attr({class: classe, transform: "translate("+x+","+y+")"});
  svg.append("g")
    .attr("class", "tituloISP")
    .attr("transform", "translate("+(x+11)+","+(y+22)+")")
    .append("text")
    .attr("class", "isp").text(textoBotao);
  svg.append("rect")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("height", 30)
    .attr("width", 70)
    .attr({class: "invisivel", transform:"translate("+x+","+y+")"})
    .on("mouseover", function(){
      var rect = d3.select("."+classe);
      var tip = d3.select("div.myTip");
      corFill = rect.style("fill");
      rect.style({fill: selecionado});
      tip.html(textoTip);
      return cl.tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(){
      return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
                        .style("left",(d3.event.pageX+25)+"px");})
    .on("mouseout", function(){
      var rect = d3.select("."+classe);
      rect.style({fill: corFill});
      return cl.tooltip.style("visibility", "hidden");
    })
    .on("click", function(){
      onClick.call(); //cl.todasRISPS();
      cl.titulo(titulo);
      return cl.tooltip.style("visibility", "hidden");              
    });
};

function lupa(svg, x, y) {

  var eixoX = d3.select(".x.axis");
  var mensagemSemSelecao,
      mensagemSelecionado;
  var mensagem;

  mensagemSemSelecao = ["Clique para ampliar texto do eixo X", "Click to activate X axis tooltip"][lang];
  mensagemSelecionado = ["Clique para cancelar ampliação","Click to cancel tooltip"][lang];


  mensagem = mensagemSemSelecao;
  svg.append("circle")
      .attr({cx: String(x), cy: String(y), r: "10", class: "lupa"})
      .style({fill: "none", stroke:"black"})
      .style("stroke-width", "3px");
  svg.append("line")
      .attr({x1: String(x-9), y1: String(y+9), x2: String(x-20), y2: String(y+20), fill:"black", stroke:"black", class: "lupa"})
      .style("stroke-width", "3px");
  svg.append("rect")
      .attr({x: String(x-20), y: String(y-12), height: String(32), width: String(32), class: "invisivel lupa"})
      .on("mouseover", function(){
        var tip = d3.select("div.myTip");
        if (hist.clicou())
          tip.html(mensagemSelecionado);
        else
          tip.html(mensagemSemSelecao);
        d3.select()
        return cl.tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(){
        return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
                        .style("left",(d3.event.pageX+25)+"px");})
      .on("mouseout", function(){
        return cl.tooltip.style("visibility", "hidden");
      })
      .on("click", function(){
        if (hist.clicou()) {
          cancelaLupa();
          return;
        }        
        selecionaLupa();
        hist.clicou(true);
        var corColuna;
        var coluna;
        d3.select(".x.axis").selectAll(".tick")
          .on("mouseover", function(){
            var tip=d3.select("div.myTip");
            var conteudo = this.textContent;
            tip.html(conteudo);
            if (cl.status == "aisp")
              coluna = d3.select("#H"+conteudo.replace(/.* 0*/,""));
            else {
              for (i in cl.nomeDP) {
                if (conteudo == cl.nomeDP[i].up)
                  break;
              }
              coluna = d3.select("#H"+i);
            }
            corColuna = coluna.style("fill"); 
            coluna.style("fill", "steelblue");
            return cl.tooltip.style("visibility", "visible");
          })
          .on("mousemove", function(){
            return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
                        .style("left",(d3.event.pageX+25)+"px");
          })
          .on("mouseout", function(){
            coluna.style("fill", corColuna);
            return cl.tooltip.style("visibility", "hidden");
          });
          return cl.tooltip.style("visibility", "hidden");              
      });
}

function selecionaLupa() {
  d3.select("circle.lupa")
    .style("fill", "steelblue");
  hist.clicou(true);
  // body...
}

function cancelaLupa() {
  d3.select("circle.lupa")
    .style("fill", "none");
  d3.select(".x.axis").selectAll(".tick").on("mouseover", null).on("mousmove", null).on("mouseout", null);
  hist.clicou(false);
}
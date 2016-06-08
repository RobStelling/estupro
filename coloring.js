	/***************************
	Rotinas de desenho de mapas e gráficos
	A fazer ("-" a fazer, "+" parcialmente feito, "x" finalizado):
	- Incluir resultado como histograma e tabela
	  - Como tabs ?
	- Converter para responsivo
	- Resolver legenda de mapa temático quando não há espaço para dígitos entre dois intervalos
	x Revisar e reescrever a rotina de legenda dos mapas temáticos - 02/12
	x Revisão e correção de DOM (index.html)- 19/11
	x Desenhar mapas regionais e apagar diretamente por D3 - 19/11
	x Resolver incompatibilidade de tooltip no Firefox - 20/11
	  x código original dependia do global event, que não é suportado
	  x pelo Firefox, substituido por d3.event
	- Incluir tratamento de escala ordinal - distribuição
	x Desenhar mapa mesmo quando não há dados de todos municípios - 08/12
	x Melhorar tooltip - 20/11
	  x Incluir caixa e fundo
	  x Mudar padrão de cores (ajustar cores em função da coloração do mapa)
	  x Incluir formatação no tooltip ("." por ",", "." de milhar, etc.) - 30/11
	- Incluir chave no bind de dados
	x Incluir transições - 19/11
	x Tratar info adicional (informação adicional de mapa temático ou município ao
	  clicar no botão) como html - 23/11
	x Utilizar SVG/GeoJSon da Cogeo - 30/11
	- Substituir botões por elementos de interface
	  x Substituido por dropdown list - 24/11
	- Preparar para celular
	+ Reorganizar conteúdo, funções e variáveis globais - Parcialmente 19/11
	  - Remover funções obsoletas
	- Ajustes no SVG do mapa
	  x Ler de arquivo - 30/11
	  x Melhorar coloração de fronteiras - 01/12
	  x Melhorar coloração de municípios
	    x Adotar cores COGEO - 23/11
	  x Corrigir tooltip aparecendo quando não há conteúdo - 19/11
	  x Ler regiões das classes do mapa - 24/11
	    x Revisar que informação deve estar codificada no mapa para que
	      este possa ser utilizado para visualização
	      x Nome município e bandeira - 25/11
	      x Valor da variável - 18/11
	    x Substituir nomes dos municípios normalizados por códigos ibge - 23/11
	- Mudar tratamento de globais
	  - Encapsular em objetos/permitir inicialização
	- Modificar rotinas para facilitar reutilização
	  - Criar setters/getters
	- Documentar
	***************************/
	
	// Retorna nome ou id de um município por
	// código municipal
	!function() { 
	  var cl = {
	    version: "1.0.12"
	  };
	
	cl.SELECIONADO = "rgb(48, 48, 48)";
	cl.escalaPrj = 1;
	cl.semInfo = "#505050";
	cl.grayedout = "#808080";
  var cl_textoRISP = "RISP";
  var cl_textoAISP = "AISP";
  var cl_textoCISP = "CISP";
	
	cl.nid = function (attr, code) {
	  var cdmun2id = {330010:function(attr){return attr=="aisp"?"AISP 33":attr=="nome"? "Angra dos Reis":attr=="regiao"?7:"AngradosReis";},
	                  330015:function(attr){return attr=="aisp"?"AISP 36":attr=="regiao"?1:"Aperibé";},
	                  330020:function(attr){return attr=="aisp"?"AISP 25":attr=="regiao"?4:"Araruama";},
	                  330022:function(attr){return attr=="aisp"?"AISP 38":attr=="regiao"?6:"Areal";},
	                  330023:function(attr){return attr=="aisp"?"AISP 25":attr=="nome"? "Armação dos Búzios":attr=="regiao"?4:"ArmaçãodosBúzios";},
	                  330025:function(attr){return attr=="aisp"?"AISP 25":attr=="nome"? "Arraial do Cabo":attr=="regiao"?4:"ArraialdoCabo";},
	                  330030:function(attr){return attr=="aisp"?"AISP 10":attr=="nome"? "Barra do Piraí":attr=="regiao"?5:"BarradoPiraí";},
	                  330040:function(attr){return attr=="aisp"?"AISP 28":attr=="nome"? "Barra Mansa":attr=="regiao"?5:"BarraMansa";},
	                  330045:function(attr){return attr=="aisp"?"AISP 40":attr=="nome"? "Belford Roxo":attr=="regiao"?0:"BelfordRoxo";},
	                  330050:function(attr){return attr=="aisp"?"AISP 11":attr=="nome"? "Bom Jardim":attr=="regiao"?3:"BomJardim";},
	                  330060:function(attr){return attr=="aisp"?"AISP 29":attr=="nome"? "Bom Jesus do Itabapoana":attr=="regiao"?1:"BomJesusdoItabapoana";},
	                  330070:function(attr){return attr=="aisp"?"AISP 25":attr=="nome"? "Cabo Frio":attr=="regiao"?4:"CaboFrio";},
	                  330080:function(attr){return attr=="aisp"?"AISP 35":attr=="nome"? "Cachoeiras de Macacu":attr=="regiao"?0:"CachoeirasdeMacacu";},
	                  330090:function(attr){return attr=="aisp"?"AISP 36":attr=="regiao"?1:"Cambuci";},
	                  330093:function(attr){return attr=="aisp"?"AISP 32":attr=="regiao"?2:"Carapebus";},
	                  330095:function(attr){return attr=="aisp"?"AISP 38":attr=="nome"? "Comendador Levy Gasparian":attr=="regiao"?6:"ComendadorLevyGasparian";},
	                  330100:function(attr){return attr=="aisp"?"AISP 08":attr=="nome"? "Campos dos Goytacazes":attr=="regiao"?2:"CamposdosGoytacazes";},
	                  330110:function(attr){return attr=="aisp"?"AISP 11":attr=="regiao"?3:"Cantagalo";},
	                  330115:function(attr){return attr=="aisp"?"AISP 29":attr=="nome"? "Cardoso Moreira":attr=="regiao"?2:"CardosoMoreira";},
	                  330120:function(attr){return attr=="aisp"?"AISP 30":attr=="regiao"?3:"Carmo";},
	                  330130:function(attr){return attr=="aisp"?"AISP 32":attr=="nome"? "Casimiro de Abreu":attr=="regiao"?4:"CasimirodeAbreu";},
	                  330140:function(attr){return attr=="aisp"?"AISP 32":attr=="nome"? "Conceição de Macabu":attr=="regiao"?2:"ConceicaodeMacabu";},
	                  330150:function(attr){return attr=="aisp"?"AISP 11":attr=="regiao"?3:"Cordeiro";},
	                  330160:function(attr){return attr=="aisp"?"AISP 11":attr=="nome"? "Duas Barras":attr=="regiao"?3:"DuasBarras";},
	                  330170:function(attr){return attr=="aisp"?"AISP 15":attr=="nome"? "Duque de Caxias":attr=="regiao"?0:"DuquedeCaxias";},
	                  330180:function(attr){return attr=="aisp"?"AISP 10":attr=="nome"? "Engenheiro Paulo de Frontin":attr=="regiao"?6:"PaulodeFrontin";},
	                  330185:function(attr){return attr=="aisp"?"AISP 34":attr=="regiao"?0:"Guapimirim";},
	                  330187:function(attr){return attr=="aisp"?"AISP 25":attr=="nome"? "Iguaba Grande":attr=="regiao"?4:"IguabaGrande";},
	                  330190:function(attr){return attr=="aisp"?"AISP 35":attr=="regiao"?0:"Itaboraí";},
	                  330200:function(attr){return attr=="aisp"?"AISP 24":attr=="regiao"?0:"Itaguaí";},
	                  330205:function(attr){return attr=="aisp"?"AISP 29":attr=="regiao"?1:"Italva";},
	                  330210:function(attr){return attr=="aisp"?"AISP 36":attr=="regiao"?1:"Itaocara";},
	                  330220:function(attr){return attr=="aisp"?"AISP 29":attr=="regiao"?1:"Itaperuna";},
	                  330420:function(attr){return attr=="aisp"?"AISP 37":attr=="regiao"?5:"Itatiaia";},
	                  330227:function(attr){return attr=="aisp"?"AISP 24":attr=="regiao"?0:"Japeri";},
	                  330230:function(attr){return attr=="aisp"?"AISP 29":attr=="nome"? "Laje do Muriaé":attr=="regiao"?1:"LajedoMuriae";},
	                  330240:function(attr){return attr=="aisp"?"AISP 32":attr=="regiao"?2:"Macaé";},
	                  330245:function(attr){return attr=="aisp"?"AISP 11":attr=="regiao"?3:"Macuco";},
	                  330250:function(attr){return attr=="aisp"?"AISP 34":attr=="regiao"?0:"Magé";},
	                  330260:function(attr){return attr=="aisp"?"AISP 33":attr=="regiao"?7:"Mangaratiba";},
	                  330270:function(attr){return attr=="aisp"?"AISP 12":attr=="regiao"?0:"Maricá";},
	                  330280:function(attr){return attr=="aisp"?"AISP 10":attr=="regiao"?6:"Mendes";},
	                  330285:function(attr){return attr=="aisp"?"AISP 20":attr=="regiao"?0:"Mesquita";},
	                  330290:function(attr){return attr=="aisp"?"AISP 10":attr=="nome"? "Miguel Pereira":attr=="regiao"?6:"MiguelPereira";},
	                  330300:function(attr){return attr=="aisp"?"AISP 36":attr=="regiao"?1:"Miracema";},
	                  330310:function(attr){return attr=="aisp"?"AISP 29":attr=="regiao"?1:"Natividade";},
	                  330320:function(attr){return attr=="aisp"?"AISP 20":attr=="regiao"?0:"Nilópolis";},
	                  330330:function(attr){return attr=="aisp"?"AISP 12":attr=="regiao"?0:"Niterói";},
	                  330340:function(attr){return attr=="aisp"?"AISP 11":attr=="nome"? "Nova Friburgo":attr=="regiao"?3:"NovaFriburgo";},
	                  330350:function(attr){return attr=="aisp"?"AISP 20":attr=="nome"? "Nova Iguaçu":attr=="regiao"?0:"NovaIguaçu";},
	                  330360:function(attr){return attr=="aisp"?"AISP 24":attr=="regiao"?0:"Paracambi";},
	                  330370:function(attr){return attr=="aisp"?"AISP 38":attr=="nome"? "Paraíba do Sul":attr=="regiao"?6:"ParaibadoSul";},
	                  330380:function(attr){return attr=="aisp"?"AISP 33":attr=="regiao"?7:"Paraty";},
	                  330385:function(attr){return attr=="aisp"?"AISP 10":attr=="nome"? "Paty do Alferes":attr=="regiao"?6:"PatydoAlferes";},
	                  330390:function(attr){return attr=="aisp"?"AISP 26":attr=="regiao"?3:"Petrópolis";},
	                  330395:function(attr){return attr=="aisp"?"AISP 28":attr=="regiao"?5:"Pinheiral";},
	                  330400:function(attr){return attr=="aisp"?"AISP 10":attr=="regiao"?5:"Piraí";},
	                  330410:function(attr){return attr=="aisp"?"AISP 29":attr=="regiao"?1:"Porciúncula";},
	                  330411:function(attr){return attr=="aisp"?"AISP 37":attr=="nome"? "Porto Real":attr=="regiao"?5:"PortoReal";},
	                  330412:function(attr){return attr=="aisp"?"AISP 37":attr=="regiao"?5:"Quatis";},
	                  330414:function(attr){return attr=="aisp"?"AISP 24":attr=="regiao"?0:"Queimados";},
	                  330415:function(attr){return attr=="aisp"?"AISP 32":attr=="regiao"?2:"Quissamã";},
	                  330420:function(attr){return attr=="aisp"?"AISP 37":attr=="regiao"?5:"Resende";},
	                  330430:function(attr){return attr=="aisp"?"AISP 35":attr=="nome"? "Rio Bonito":attr=="regiao"?0:"RioBonito";},
	                  330440:function(attr){return attr=="aisp"?"AISP 33":attr=="nome"? "Rio Claro":attr=="regiao"?5:"RioClaro";},
	                  330450:function(attr){return attr=="aisp"?"AISP 10":attr=="nome"? "Rio das Flores":attr=="regiao"?5:"RiodasFlores";},
	                  330452:function(attr){return attr=="aisp"?"AISP 32":attr=="nome"? "Rio das Ostras":attr=="regiao"?4:"RiodasOstras";},
	                  330455:function(attr){return attr=="aisp"?"AISP 02 AISP 39 AISP 27 AISP 31 AISP 14 AISP 18 AISP 23 AISP 06 AISP 03 AISP 09 AISP 41 AISP 19 AISP 05 AISP 04 AISP 22 AISP 16 AISP 17":attr=="nome"? "Rio de Janeiro":attr=="regiao"?0:"RiodeJaneiro";},
	                  330460:function(attr){return attr=="aisp"?"AISP 11":attr=="nome"? "Santa Maria Madalena":attr=="regiao"?3:"SantaMariaMadalena";},
	                  330470:function(attr){return attr=="aisp"?"AISP 36":attr=="nome"? "Santo Antônio de Pádua":attr=="regiao"?1:"SantoAntoniodePadua";},
	                  330475:function(attr){return attr=="aisp"?"AISP 08":attr=="nome"? "São Francisco de Itabapoana":attr=="regiao"?2:"SãoFranciscodeItabapoana";},
	                  330480:function(attr){return attr=="aisp"?"AISP 08":attr=="nome"? "São Fidélis":attr=="regiao"?2:"SãoFidélis";},
	                  330490:function(attr){return attr=="aisp"?"AISP 07":attr=="nome"? "São Gonçalo":attr=="regiao"?0:"SãoGonçalo";},
	                  330500:function(attr){return attr=="aisp"?"AISP 08":attr=="nome"? "São João da Barra":attr=="regiao"?2:"SãoJoãodaBarra";},
	                  330510:function(attr){return attr=="aisp"?"AISP 21":attr=="nome"? "São João de Meriti":attr=="regiao"?0:"SãoJoãodeMeriti";},
	                  330513:function(attr){return attr=="aisp"?"AISP 29":attr=="nome"? "São José de Ubá":attr=="regiao"?1:"SãoJosédeUbá";},
	                  330515:function(attr){return attr=="aisp"?"AISP 30":attr=="nome"? "São José do Vale do Rio Preto":attr=="regiao"?3:"SãoJosédoValedoRioPreto";},
	                  330520:function(attr){return attr=="aisp"?"AISP 25":attr=="nome"? "São Pedro da Aldeia":attr=="regiao"?4:"SãoPedrodaAldeia";},
	                  330530:function(attr){return attr=="aisp"?"AISP 36":attr=="nome"? "São Sebastião do Alto":attr=="regiao"?3:"SãoSebastiãodoAlto";},
	                  330540:function(attr){return attr=="aisp"?"AISP 38":attr=="regiao"?6:"Sapucaia";},
	                  330550:function(attr){return attr=="aisp"?"AISP 25":attr=="regiao"?4:"Saquarema";},
	                  330555:function(attr){return attr=="aisp"?"AISP 24":attr=="regiao"?0:"Seropédica";},
	                  330560:function(attr){return attr=="aisp"?"AISP 35":attr=="nome"? "Silva Jardim":attr=="regiao"?4:"SilvaJardim";},
	                  330570:function(attr){return attr=="aisp"?"AISP 30":attr=="regiao"?3:"Sumidouro";},
	                  330575:function(attr){return attr=="aisp"?"AISP 35":attr=="regiao"?0:"Tanguá";},
	                  330580:function(attr){return attr=="aisp"?"AISP 30":attr=="regiao"?3:"Teresópolis";},
	                  330590:function(attr){return attr=="aisp"?"AISP 11":attr=="nome"? "Trajano de Moraes":attr=="regiao"?3:"TrajanodeMoraes";},
	                  330600:function(attr){return attr=="aisp"?"AISP 38":attr=="nome"? "Três Rios":attr=="regiao"?6:"TrêsRios";},
	                  330610:function(attr){return attr=="aisp"?"AISP 10":attr=="regiao"?5:"Valença";},
	                  330615:function(attr){return attr=="aisp"?"AISP 29":attr=="regiao"?1:"Varre-Sai";},
	                  330620:function(attr){return attr=="aisp"?"AISP 10":attr=="regiao"?6:"Vassouras";},
	                  330630:function(attr){return attr=="aisp"?"AISP 28":attr=="nome"? "Volta Redonda":attr=="regiao"?5:"VoltaRedonda";} };
	  try {
	    if (isNaN(code)) {
	      if (attr="nome")
	        if (cdmun2id[330455]("aisp").match(code))
	          return "AISP RJ"
	      if (cl_hashAisps[code])
	        return code;
	      return undefined;
	    }
	    return cdmun2id[code](attr);
	  }
	  catch (err) {
	    return undefined;
	  }
	
	}
	
	cl.aisp = function (attr, code) {
	  var aispnum2id = {
	      39:function(attr){return attr=='dp'?["54 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 39':attr=='mun'?[330045]:["Areia Branca", "Jardim Redentor", "Parque São José", "Nova Aurora",
	                                                                            "Lote XV"];},
	      21:function(attr){return attr=='dp'?["64 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 21':attr=='mun'?[330510]:["São João de Meriti", "Coelho da Rocha", "São Mateus"];},
	      40:function(attr){return attr=='dp'?["35 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 40':attr=='mun'?[330455]:["Campo Grande", "Cosmos", "Inhoaíba", "Santíssimo",
	                                                                            "Senador Vasconcelos"];},
	      17:function(attr){return attr=='dp'?["37 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 17':attr=='mun'?[330455]:["Bancários", "Cacuia", "Cidade Universitária", "Cocotá",
	                                                                            "Freguesia", "Galeão", "Jardim Carioca", "Jardim Guanabara",
	                                                                            "Moneró", "Pitangueiras", "Portuguesa", "Praia da Bandeira",
	                                                                            "Ribeira", "Tauá", "Zumbi"];},
	      22:function(attr){return attr=='dp'?["21 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 22':attr=='mun'?[330455]:["Benfica", "Bonsucesso", "Higienópolis", "Manguinhos",
	                                                                            "Maré", "Ramos"];},
	       7:function(attr){return attr=='dp'?["72 (DP Legal)", "73(DP Legal)", "74(DP Legal)", "75"]:attr=='risp'?4:attr=='nome'?'AISP 07':attr=='mun'?[330490]:["São Gonçalo", "Neves", "Monjolo", "Ipiiba", "Sete Pontes"];},
	      15:function(attr){return attr=='dp'?["59", "60", "61 (DP Legal)", "62 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 15':attr=='mun'?[330170]:["Duque de Caxias (Centro)", "Campos Elyseos", "Xerém", "Imbariê"];},
	      34:function(attr){return attr=='dp'?["65 (DP Legal)", "66 (DP Legal)", "67 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 34':attr=='mun'?[330250, 330185]:["Magé", "Santo Aleixo", "Suruí", "Inhomirim",
	                                                                            "Guia de Copaíba", "Guapimirim"];},
	      20:function(attr){return attr=='dp'?["52 (DP Legal)", "56 (DP Legal)", "58 (DP Legal)", "53 (DP Legal)",
	                                           "57 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 20':attr=='mun'?[330350, 330285, 330320]:["Nova Iguaçú (Centro)", "Comendador Soares", "Cabuçú", "Km32",
	                                                                            "Posse", "Austin", "Miguel Couto", "Vila de Cava",
	                                                                            "Tinguá", "Mesquita", "Chatuba", "Banco de Areia",
	                                                                            "Nilópolis", "Olinda"];},
	      24:function(attr){return attr=='dp'?["48", "50 (DP Legal)", "51 (DP Legal)", "55 (DP Legal)",
	                                           "63 (DP Legal)"]:attr=='risp'?3:attr=='nome'?'AISP 24':attr=='mun'?[330555, 330200, 330360, 330414,
	                                                                                                              330227]:["Seropédica", "Itaguaí", "Ibituporanga", "Paracambi",
	                                                                            "Queimados (Centro)", "Norte", "Sul. Leste", "Oeste",
	                                                                            "Nordeste", "Japeri", "Engenheiro Pedreira", "Marajoara",
	                                                                            "Pedra Lisa", "Rio D`Ouro"];},
	      33:function(attr){return attr=='dp'?["165 (DP Legal)", "166", "167 (DP Legal)", "168 (DP Legal)"]:attr=='risp'?5:attr=='nome'?'AISP 33':attr=='mun'?[330260, 330010, 330380, 330440]:["Mangaratiba", "Conceição de Jacareí", "Vila Muriquí", "Itacuruçá",
	                                                                            "Angra dos Reis", "Jacuecanga", "Cunhambebe", "Mambucaba",
	                                                                            "Abraão", "Praia de Araçatiba", "Parati", "Parati-Mirim",
	                                                                            "Tarituba", "Rio Claro", "Getulândia", "Lídice",
	                                                                            "Passa Três", "São João Marcos"];},
	      37:function(attr){return attr=='dp'?["89 (DP Legal)", "99 (DP Legal)", "100 (DP Legal)"]:attr=='risp'?5:attr=='nome'?'AISP 37':attr=='mun'?[330420, 330420, 330411, 330412]:["Resende", "Engenheiro Passos", "Agulhas Negras", "Pedra Selada",
	                                                                            "Fumaça", "Itatiaia", "Porto Real", "Quatis",
	                                                                            "Falcão", "Ribeirão de São Joaquim"];},
	      10:function(attr){return attr=='dp'?["88 (DP Legal)", "91 (DP Legal)", "92 (DP Legal)", "94 (DP Legal)",
	                                           "95 (DP Legal)", "96 (DP Legal)", "97 (DP Legal)", "98 (DP Legal)"]:attr=='risp'?5:attr=='nome'?'AISP 10':attr=='mun'?[330030, 330610, 330450, 330400,
	                                                                                 330620, 330290, 330385, 330280,
	                                                                                 330180]:["Barra do Piraí", "Dorandia", "Ipiabas", "São José do Turvo",
	                                                                            "Vargem Alegre", "Valença", "Barão de Juparana", "Conservatória",
	                                                                            "Parapeúna", "Pentagna", "Santa Isabel do Rio Preto", "Rio das Flores",
	                                                                            "Manuel Duarte", "Abarracamento", "Taboas", "Piraí",
	                                                                            "Arrozal", "Monumento", "Santanésia", "Vassouras",
	                                                                            "Andrade Pinto", "São Sebastião dos Ferreiros", "Sebastião de Lacerda", "Miguel Pereira",
	                                                                            "Governador Portela", "Conrado", "Paty do Alferes", "Avelar",
	                                                                            "Mendes", "Engenheiro Paulo de Frontin", "Sacra Família do Tinguá"];},
	      28:function(attr){return attr=='dp'?["90 (DP Legal)", "93 (DP Legal)", "101 (DP Legal)"]:attr=='risp'?5:attr=='nome'?'AISP 28':attr=='mun'?[]:["Antonio Rocha", "Floriano", "Nossa Senhora do Amparo", "Rialto",
	                                                                            "Regiões Administrativas I a XIV", "Volta Redonda", "Pinheiral"];},
	      26:function(attr){return attr=='dp'?["105 (DP Legal)", "106 (DP Legal)"]:attr=='risp'?7:attr=='nome'?'AISP 26':attr=='mun'?[330390]:["Petrópolis", "Cascatinha", "Itaipava", "Pedro do Rio", "Posse"];},
	      12:function(attr){return attr=='dp'?["76 (DP Legal)", "77 (DP Legal)", "78 (DP Legal)", "79 (DP Legal)",
	                                           "81 (DP Legal)", "82 (DP Legal)"]:attr=='risp'?4:attr=='nome'?'AISP 12':attr=='mun'?[330330, 330270]:["Niterói (Centro)", "Ponta da Areia", "Ilha da Conceição", "São Lourenço",
	                                                                            "Fátima", "Morro do Estado", "Ingá", "São Domingos",
	                                                                            "Gragoatá", "Boa Viagem", "Santa Rosa", "Icaraí",
	                                                                            "Vital Brasil", "Pé Pequeno", "Viradouro", "Cubango",
	                                                                            "Fonseca", "Viçoso Jardim", "Caramujo", "Baldeador",
	                                                                            "Santa Bárbara", "Tenente Jardim", "Engenhoca", "Santana",
	                                                                            "Barreto", "Jurujuba", "Charitas", "São Francisco",
	                                                                            "Cachoeiras", "Maceió", "Largo da Batalha", "Ititioca",
	                                                                            "Badu", "Sapê", "Matapaca", "Vila Progresso",
	                                                                            "Muriqui", "Maria Paula", "Cantagalo", "Itaipú",
	                                                                            "Camboinhas", "Itacoatiara", "Piratininga", "Cafubá",
	                                                                            "Jacaré", "Rio do Ouro", "Engenho do Mato", "Várzea das Moças",
	                                                                            "Jardim Imbuí", "Maricá", "Inoã"];},
	      35:function(attr){return attr=='dp'?["71 (DP Legal)", "70 (DP Legal)", "119 (DP Legal)", "120 (DP Legal)",
	                                           "159 (DP Legal)"]:attr=='risp'?4:attr=='nome'?'AISP 35':attr=='mun'?[330190, 330575, 330430, 330560,
	                                                                                 330080]:["Itaboraí", "Cabuçú", "Itambí", "Porto das Caixas",
	                                                                            "Sambaetiba", "Tanguá", "Rio Bonito", "Boa Esperança",
	                                                                            "Silva Jardim", "Aldeia Velha", "Correntezas", "Gaviões",
	                                                                            "Cachoeiras de Macacu", "Japuíba", "Subaio"];},
	      25:function(attr){return attr=='dp'?["118 (DP Legal)", "124 (DP Legal)", "125 (DP Legal)", "126 (DP Legal)",
	                                           "127 (DP Legal)", "129 (DP Legal)"]:attr=='risp'?4:attr=='nome'?'AISP 25':attr=='mun'?[330020, 330550, 330520, 330070,
	                                                                                 330023, 330187, 330025]:["Araruama", "Morro Grande", "São Vicente de Paula", "Saquarema",
	                                                                            "Bacaxá", "Sampaio Correia", "São Pedro da Aldeia", "Cabo Frio",
	                                                                            "Tamoios", "Armação dos Búzios", "Iguaba Grande", "Arraial do Cabo"];},
	      32:function(attr){return attr=='dp'?["121 (DP Legal)", "122 (DP Legal)", "123 (DP Legal)", "128 (DP Legal)",
	                                           "130 (DP Legal)"]:attr=='risp'?6:attr=='nome'?'AISP 32':attr=='mun'?[330130, 330140, 330240, 330452,
	                                                                                 330415, 330093]:["Casimiro de Abreu", "Professor Souza", "Barra de São João", "Rio Dourado",
	                                                                            "Conceição de Macabú", "Macabuzinho", "Macaé (Centro)", "Cabiúnas",
	                                                                            "Barra de Macaé", "Aeroporto", "Imboassica", "Rio das Ostras",
	                                                                            "Quissamã", "Carapebus (Centro)", "UB-S", "Rodagem",
	                                                                            "Carapebus", "Praia de Carapebus"];},
	       8:function(attr){return attr=='dp'?["134 (DP Legal)", "146 (DP Legal)", "147 (DP Legal)", "141 (DP Legal)",
	                                           "145 (DP Legal)"]:attr=='risp'?6:attr=='nome'?'AISP 08':attr=='mun'?[330100, 330475, 330480, 330500]:["Campos dos Goytacazes", "Ibitioca", "Dores de Macabu", "Morangaba",
	                                                                            "Mussurepe", "Serrinha", "Santo Amaro de Campos", "São Sebastião de Campos",
	                                                                            "Tocos", "Santa Maria", "Morro do Coco", "Santo Eduardo",
	                                                                            "Travessão", "Vila Nova de Campos", "São Francisco de Itabapoana", "Maniva",
	                                                                            "Barra Seca", "São Fidelis", "Cambiasca", "Colonia",
	                                                                            "Ipuca", "Pureza", "Barcelos", "Atafona",
	                                                                            "São João da Barra", "Grussaí", "Cajueiro", "Pipeiras"];},
	      11:function(attr){return attr=='dp'?["151 (DP Legal)", "152 (DP Legal)", "153 (DP Legal)", "154 (DP Legal)",
	                                           "156 (DP Legal)", "157 (DP Legal)", "158 (DP Legal)"]:attr=='risp'?7:attr=='nome'?'AISP 11':attr=='mun'?[330340, 330160, 330110, 330150,
	                                                                                 330245, 330460, 330590, 330050]:["Nova Friburgo", "São Pedro da Serra", "Lumiar", "Amparo",
	                                                                            "Riograndina", "Conselheiro Paulino", "Campo do Coelho", "Duas Barras",
	                                                                            "Monnerat", "Cantagalo", "Santa Rita da Floresta", "Boa Sorte",
	                                                                            "Euclidelândia", "São Sebastião do Paraíba", "Cordeiro", "Macuco",
	                                                                            "Santa Maria Madalena", "Doutor Loreti", "Renascença", "Santo Antônio do Imbé",
	                                                                            "Sossego", "Triunfo", "Trajano de Morais", "Doutor Elias",
	                                                                            "Sodrelândia", "Vila da Grama", "Visconde de Imbé", "Bom Jardim",
	                                                                            "Banquete", "Barra Alegre", "São José do Ribeirão"];},
	      36:function(attr){return attr=='dp'?["135 (DP Legal)", "136 (DP Legal)", "137 (DP Legal)", "142 (DP Legal)",
	                                           "155 (DP Legal)"]:attr=='risp'?6:attr=='nome'?'AISP 36':attr=='mun'?[330210, 330470, 330015, 330300,
	                                                                                 330090, 330530]:["Itaocara", "Portela", "Batatal", "Laranjais",
	                                                                            "Jaguarembe", "Estrada Nova", "Santo Antônio de Pádua", "Campelo",
	                                                                            "Paraoquena", "Monte Alegre", "Ibitiguaçú", "Santa Cruz",
	                                                                            "Baltazar", "Marangatú", "São Pedro de Alcântara", "Aperibé",
	                                                                            "Miracema", "Venda das Flores", "Paraíso do Tobias", "Cambuci",
	                                                                            "Três Irmãos", "Funil", "Monte Verde", "São João do Paraíso",
	                                                                            "São Sebastião do Alto", "Valão do Barro", "Ipituna"];},
	      29:function(attr){return attr=='dp'?["138 (DP Legal)", "139 (DP Legal)", "140 (DP Legal)", "143 (DP Legal)",
	                                           "144 (DP Legal)", "148 (DP Legal)"]:attr=='risp'?6:attr=='nome'?'AISP 29':attr=='mun'?[330230, 330410, 330310, 330615,
	                                                                                 330220, 330513, 330060, 330115,
	                                                                                 330205]:["Laje do Muriaé", "Porciúncula", "Purilândia", "Santa Clara",
	                                                                            "Natividade", "Ourania", "Bom Jesus do Querendo", "Varre-Sai",
	                                                                            "Itaperuna", "Boaventura", "Nossa Senhora da Penha", "Itajara",
	                                                                            "Retiro do Muriaé", "Raposo", "Comendador Venâncio", "São José de Ubá",
	                                                                            "Bom Jesus de Itabapoana", "Carabuçú", "Calheiros", "Pirapetinga de Bom Jesus",
	                                                                            "Rosal", "Serrinha", "Cardoso Moreira", "São Joaquim",
	                                                                            "Italva"];},
	      30:function(attr){return attr=='dp'?["104 (DP Legal)", "110 (DP Legal)", "111 (DP Legal)", "112 (DP Legal)"]:attr=='risp'?7:attr=='nome'?'AISP 30':attr=='mun'?[330515, 330580, 330570, 330120]:["São José do Vale do Rio Preto", "Teresópolis", "Vale do Bonsucesso", "Vale do Paquequer",
	                                                                            "Sumidouro", "Carmo", "Córrego da Prata", "Porto Velho do Cunha"];},
	      31:function(attr){return attr=='dp'?["16 (DP Legal)", "42 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 31':attr=='mun'?[330455]:["Barra da Tijuca", "Itanhangá", "Joá", "Recreio dos Bandeirantes",
	                                                                            "Barra de Guaratiba", "Camorim", "Grumari", "Vargem Grande",
	                                                                            "Vargem Pequena"];},
	      18:function(attr){return attr=='dp'?["32 (DP Legal)", "41 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 18':attr=='mun'?[330455]:["Anil", "Cidade de Deus", "Curicica", "Gardênia Azul",
	                                                                            "Jacarepaguá", "Taquara", "Freguesia (Jacarepaguá)", "Pechincha",
	                                                                            "Tanque"];},
	      14:function(attr){return attr=='dp'?["33 (DP Legal)", "34 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 14':attr=='mun'?[330455]:["Campo dos Afonsos", "Deodoro", "Jardim Sulacap", "Magalhães Bastos",
	                                                                            "Realengo", "Vila Militar", "Bangu", "Gericinó",
	                                                                            "Padre Miguel", "Senador Camará"];},
	       9:function(attr){return attr=='dp'?["28 (DP Legal)", "29 (DP Legal)", "30 (DP Legal)", "40 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 09':attr=='mun'?[330455]:["Campinho", "Cascadura", "Praça Seca", "Quintino Bocaiúva",
	                                                                            "Vila Valqueire", "Cavalcanti", "Engenheiro Leal", "Madureira",
	                                                                            "Turiaçu", "Vaz Lobo", "Bento Ribeiro", "Marechal Hermes",
	                                                                            "Oswaldo Cruz", "Coelho Neto", "Colégio (Parte)", "Honório Gurgel",
	                                                                            "Rocha Miranda"];},
	       4:function(attr){return attr=='dp'?["6 (DP Legal)", "17 (DP Legal)", "18 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 04':attr=='mun'?[330455]:["Catumbi", "Cidade Nova", "Estácio", "Rio Comprido",
	                                                                            "Centro (parte)", "Caju", "Mangueira", "São Cristóvão",
	                                                                            "Vasco da Gama", "Maracanã", "Praça da Bandeira", "Tijuca (parte)"];},
	       6:function(attr){return attr=='dp'?["19 (DP Legal)", "20 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 06':attr=='mun'?[330455]:["Alto da Boa Vista", "Tijuca (Parte)", "Andaraí", "Grajaú",
	                                                                            "Vila Isabel"];},
	       3:function(attr){return attr=='dp'?["23 (DP Legal)", "24 (DP Legal)", "25 (DP Legal)", "26 (DP Legal)",
	                                           "44 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 03':attr=='mun'?[330455]:["Cachambi", "Méier", "Abolição", "Encantado",
	                                                                            "Piedade", "Pilares", "Engenho Novo", "Jacaré",
	                                                                            "Jacarezinho", "Riachuelo", "Rocha", "Sampaio",
	                                                                            "São Francisco Xavier", "Água Santa", "Engenho de Dentro", "Lins de Vasconcelos",
	                                                                            "Todos os Santos", "Del Castilho", "Engenho da Rainha", "Inhaúma",
	                                                                            "Maria da Graça", "Tomás Coelho"];},
	      16:function(attr){return attr=='dp'?["22 (DP Legal)", "38 (DP Legal)", "45 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 16':attr=='mun'?[330455]:["Brás de Pina", "Olaria", "Penha", "Penha Circular",
	                                                                            "Cordovil", "Jardim América", "Parada de Lucas", "Vigário Geral",
	                                                                            "Complexo do Alemão"];},
	      41:function(attr){return attr=='dp'?["27 (DP Legal)", "31 (DP Legal)", "39 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 41':attr=='mun'?[330455]:["Colégio (Parte)", "Irajá", "Vicente de Carvalho", "Vila Kosmos",
	                                                                            "Vila da Penha", "Vista Alegre", "Anchieta", "Guadalupe",
	                                                                            "Parque Anchieta", "Ricardo de Albuquerque", "Acari", "Barros Filho",
	                                                                            "Costa Barros", "Parque Colúmbia", "Pavuna"];},
	       5:function(attr){return attr=='dp'?["1", "4", "5 (DP Legal)", "7 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 05':attr=='mun'?[330455]:["Centro (Parte)", "Gamboa", "Santo Cristo", "Saúde",
	                                                                            "Lapa", "Paquetá", "Santa Teresa"];},
	      38:function(attr){return attr=='dp'?["107 (DP Legal)", "108 (DP Legal)", "109 (DP Legal)"]:attr=='risp'?7:attr=='nome'?'AISP 38':attr=='mun'?[330370, 330095, 330022, 330600,
	                                                                                 330540]:["Paraíba do Sul", "Werneck", "Salutaris", "Inconfidência",
	                                                                            "Comendador Levy Gasparian", "Afonso Arinos", "Areal", "Três Rios",
	                                                                            "Bemposta", "Sapucaia", "Anta", "Pião",
	                                                                            "Nossa Senhora Aparecida", "Jamapara"];},
	      27:function(attr){return attr=='dp'?["36 (DP Legal)", "43 (DP Legal)"]:attr=='risp'?2:attr=='nome'?'AISP 27':attr=='mun'?[330455]:["Paciência", "Santa Cruz", "Guaratiba", "Pedra de Guaratiba", "Sepetiba"];},
	      23:function(attr){return attr=='dp'?["11 (DP Legal)", "14 (DP Legal)", "15 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 23':attr=='mun'?[330455]:["Rocinha", "Ipanema", "Leblon", "Gávea", "Jardim Botânico", "Lagoa", "São Conrado", "Vidigal"];},
	      19:function(attr){return attr=='dp'?["12 (DP Legal)", "13 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 19':attr=='mun'?[330455]:["Copacabana", "Leme"];},
	       2:function(attr){return attr=='dp'?["9 (DP Legal)", "10 (DP Legal)"]:attr=='risp'?1:attr=='nome'?'AISP 02':attr=='mun'?[330455]:["Catete","Cosme Velho","Flamengo", "Glória",
	                                                                            "Laranjeiras", "Botafogo", "Humaitá", "Urca"];}
	  };
	
	  try {
	    return aispnum2id[code](attr);
	  }
	  catch (err) {
	    return undefined;
	  }
	
	};


  cl.dp = function(dp) {
    if (dp in cl.nomeDP)
      return ("DP "+ ("00"+dp).substr(-3));
    return undefined;
  };

  cl.textoISP = function(tipo, html) {
    switch (tipo) {
      case "RISP": cl_textoRISP = html; break;
      case "AISP": cl_textoAISP = html; break;
      case "CISP": cl_textoCISP = html; break;
    }
  };

	/*
	 * Depuração e geração de vetores internos
	 */
	var codMunOrd =[330010, 330015, 330020, 330022,
	                330023, 330025, 330030, 330040,
	                330045, 330050, 330060, 330070,
	                330080, 330090, 330093, 330095,
	                330100, 330110, 330115, 330120,
	                330130, 330140, 330150, 330160,
	                330170, 330180, 330185, 330187,
	                330190, 330200, 330205, 330210,
	                330220, 330225, 330227, 330230,
	                330240, 330245, 330250, 330260,
	                330270, 330280, 330285, 330290,
	                330300, 330310, 330320, 330330,
	                330340, 330350, 330360, 330370,
	                330380, 330385, 330390, 330395,
	                330400, 330410, 330411, 330412,
	                330414, 330415, 330420, 330430,
	                330440, 330450, 330452, 330455,
	                330460, 330470, 330475, 330480,
	                330490, 330500, 330510, 330513,
	                330515, 330520, 330530, 330540,
	                330550, 330555, 330560, 330570,
	                330575, 330580, 330590, 330600,
	                330610, 330615, 330620, 330630];              
	function geraVetor(dados, prefixo){
	  var i, varList = prefixo;
	  for (i = 0; i<dados.length; i++)
	    varList = varList + "["+codMunOrd[i]+","+dados[i]+"],";
	  console.log(varList);
	
	}
	
	cl.nomeRegiao = ["Região Metropolitana", "Região Noroeste Fluminense", "Região Norte Fluminense", "Região Serrana", "Região das Baixadas Litorâneas", "Região do Médio Paraiba", "Região Centro-sul", "Região da Costa Verde"];
	cl.classeRegiao = ["metropolitana", "noroestefluminense", "nortefluminense", "serrana", "baixadaslitoraneas", "medioparaiba", "centro-sul", "costaverde"];
	cl.corRegioes = ["#b6defc", "#fcbbd6","#bdfcf9","#fce5b6",
	                  "#f2d4fc", "#b9b8fc", "#f2d4fc", "#b6fcb9"];
	cl.aisps = ["AISP 02", "AISP 03", "AISP 04", "AISP 05", "AISP 06", "AISP 07", "AISP 08", "AISP 09", "AISP 10", "AISP 11", "AISP 12", "AISP 14", "AISP 15", "AISP 16", "AISP 17", "AISP 18",
	            "AISP 19", "AISP 20", "AISP 21", "AISP 22", "AISP 23", "AISP 24", "AISP 25", "AISP 26", "AISP 27", "AISP 28", "AISP 29", "AISP 30", "AISP 31", "AISP 32", "AISP 33", "AISP 34",
	            "AISP 35", "AISP 36", "AISP 37", "AISP 38", "AISP 39", "AISP 40", "AISP 41" ];
	cl.corAisps = ["#a6cee3", "#ffed6f", "#ccebc5", "#fdb462", "#8dd3c7", "#1f78b4", "#b2df8a", "#fc8d62", "#33a02c", "#fb9a99", "#e31a1c", "#ffd92f", "#fdbf6f", "#66c2a5", "#4daf4a", "#377eb8",
	               "#8da0cb", "#ff7f00", "#cab2d6", "#e41a1c", "#ffff33", "#e5c494", "#ffff99", "#b15928", "#a65628", "#8dd3c7", "#ffffb3", "#bebada", "#a6d854", "#fb8072", "#80b1d3", "#d9d9d9",
	               "#b3de69", "#fccde5", "#fdb462", "#bc80bd", "#6a3d9a", "#ccebc5", "#e78ac3"];
	cl_hashAisps = {};
	cl.tooltip = [];
	cl.status="região";
  cl.colorbrewer={
    RdYlGn:{
      3:["#fc8d59","#ffffbf","#91cf60"],
      4:["#d7191c","#fdae61","#a6d96a","#1a9641"],
      5:["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"],
      6:["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"],
      7:["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"],
      8:["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
      9:["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"],
      10:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],
      11:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]},
	OrRd:{3:["#fee8c8","#fdbb84","#e34a33"],
		4:["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],
		5:["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],
		6:["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],
		7:["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
		8:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],
		9:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]},
    YlOrRd:{3:["#ffeda0","#feb24c","#f03b20"],
	  4:["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],
	  5:["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],
	  6:["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],
	  7:["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
	  8:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],
	  9:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]},
    Paired:{12:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]},
    Dark2:{8:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]},
	RdYlBu:{
		3:["#fc8d59","#ffffbf","#91bfdb"],
		4:["#d7191c","#fdae61","#abd9e9","#2c7bb6"],
		5:["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"],
		6:["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"],
		7:["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"],
		8:["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"],
		9:["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"],
		10:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],
		11:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]},
    BrBG:{11:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]},
    Spectral:{11:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]},
    Pastel1:{9:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},
    Pastel2:{8:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]},
    Set1:{9:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]},
    Set2:{8:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]},
    Set3:{12:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]}};

	var projecao;
	
	cl_build_Aisps = function(){
	  var i;
	  for (i=0;i<cl.aisps.length;i++)
	    cl_hashAisps[cl.aisps[i]] = cl.corAisps[i];
	}

  cl.mapaCores = function (argument) {
    var i, j;
    var mapaCores = [];
    mapaCores = mapaCores.concat(cl.colorbrewer.Set3[12]);
    mapaCores = mapaCores.concat(cl.colorbrewer.Paired[12]);
    mapaCores = mapaCores.concat(cl.colorbrewer.Dark2[8]);
    mapaCores = mapaCores.concat(cl.colorbrewer.Set1[9]);
    mapaCores = mapaCores.concat(cl.colorbrewer.Spectral[11]);
    mapaCores = mapaCores.concat(cl.colorbrewer.Set2[8]);
    mapaCores = mapaCores.concat(cl.colorbrewer.BrBG[11]);


    //mapaCores = mapaCores.concat(cl.colorbrewer.Spectral[11]);

    j = 0; i = mapaCores.length-1, tam = mapaCores.length;
    while (mapaCores.length < 180) {
      mapaCores.push(cl_interpolaCor(mapaCores[j], mapaCores[i]));
      j++;
      i++;    
    }
    cl.cores = mapaCores;
  }

  function cl_interpolaCor(cor1, cor2) {
    var rgb1, rgb2;
    rgb1 = hexToRgb(cor1.substr(1));
    rgb2 = hexToRgb(cor2.substr(1));
    return rgbToHex(Math.floor((rgb1.r+rgb2.r)/2), Math.floor((rgb1.g+rgb2.g)/2), Math.floor((rgb1.b+rgb2.b)/2));
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
	
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

	cl.corAISP = function(aisp){
	  return cl_hashAisps[cl.aisp("nome", aisp)];
	}
	
	// Inicializa variáveis globais
	var path, svg;
	cl.margin = {};
	cl.hashDistritos = {};
	cl.dsv = d3.dsv(";", "text/plain");
    cl.leuJson = "não";
	cl.leJson = function(){
	  cl.margin = {top: 20, right: 10, bottom: 20, left: 10};
	  var w = 950 - cl.margin.left - cl.margin.right,
	      h = 600 - cl.margin.top - cl.margin.bottom;
	  var brasil = d3.locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["R$", ""],
	    dateTime: "%a %b %e %X %Y",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
	    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
	    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
	  });
	
	  if (3.14.toLocaleString().indexOf(",") == 1)
	    d3.format = brasil.numberFormat;
	
	  projecao =
	    d3.geo.conicEqualArea().center([0,-21.85]).rotate([42.50, 0])
	    .parallels([-21.05,-23.05]).scale(12000);
	
	  //projecao = d3.geo.mercator().scale(10500).translate([8250, -3900]);
	  //projecao = d3.geo.mercator()
    //.translate([(w/2), (h/2)])
    //.scale( w / 2 / Math.PI);

	  path = d3.geo.path().projection(projecao);
	  svg = d3.select("div.mapa")
	    .append("svg")
      .attr("viewBox", "0 0 "+(w+cl.margin.left+cl.margin.right)+
          " "+(h+cl.margin.top+cl.margin.bottom))
	    .attr("class", "mapSVG")
	    //.style({stroke: "#666666" })
                     // "stroke-dasharray": "2,2",
                     // "stroke-linejoin": "round"})
	    .append("g")
	    .attr("class", "mvG")
      .append("g")
        .attr("transform", "translate(0,0)");
        //.attr("transform", "translate(" + cl.margin.left + "," + cl.margin.top + ")");
	/*
    svgH = d3.select("body").select("div.hist")
      .append("svg")
        .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+
          " "+(height+margin.top+margin.bottom))
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/
	    /*
	    cl_svg = d3.select("div.mapa")
	      .append("svg")
	      .attr("class", "mapcanvas")
	      .attr("viewBox", "0 0 "+(w+cl_margin.left+cl_margin.right)+" "+(h+cl_margin.top+cl_margin.bottom))
	      .style({stroke: "#666666", "stroke-dasharray": "2,2", "stroke-linejoin": "round"})
	      .append("g")
	      .attr("class", "mvG")
	      //.attr("transform", "translate(0,0)");
	      .attr("transform", "translate(" + (cl_margin.left + cl_margin.right) + "," + (cl_margin.top + cl_margin.bottom) + ")");
	
	     */
	    //.attr("transform", "translate(" + (cl.margin.left + cl.margin.right) + "," + (cl.margin.top + cl.margin.bottom) + ")");
	
	  cl.leuJson = "não";
	  cl_build_Aisps();
      cl.mapaCores();
	  var mapa;
	
	  cl.ajustaCaso = function(nome) {
	    function toTitleCase(str) {
	      return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());});
	    }
	    var stopWords = ["Dos", "Do", "Das", "Da", "De"],
	        nomeT, nT,
	        i;
	    nomeT = toTitleCase(nome);
	    do {
	      nT = nomeT;
	      for (i = 0; i < stopWords.length; i++) {
	        nomeT = nomeT.replace(" "+stopWords[i]+" ", " "+stopWords[i].toLowerCase()+" ");
	      }
	    } while (nT != nomeT);
	    return nomeT;
	  }
	
	  cl.cdmun = function (CD_GEOCODD) {
	    return Math.floor(CD_GEOCODD/1000);
	  }
	  
	
	  d3.json("./json/dpRJ.json", function(error, mapa) {
	    if (error) return console.error(error);
	    mapaF = topojson.feature(mapa, mapa.objects.dpRJ)

	    criaTooltip();
	    
	    svg.selectAll(".regiao")
	      .data(mapaF.features)
	      .enter()
	//      .append("g").attr("class", function(d) { return "M"+d.properties.CD_GEOCODD; })
	      .append("path")
	      .attr("class", function(d) { return "cisp " + 
	                                          "AISP"+d.properties.AISP +
	                                          " RISP" + cl.aisp("risp", +d.properties.AISP);})
	      .attr("id", function(d) { return "DP"+("00"+d.properties.DP).substr(-3);})
	      .style("stroke-width", "0.4px")
	      .attr("d", path)
	      .text(function(d){ return cl.aisp("nome", d.properties.DP)});
	
	    cl.leuJson = "sim";
      cl.titulo(TITULORIO);
	    hookTooltip();
	    //cl.todasRISPS();
	    // Lê informações de sedes municipais
	    d3.csv("./csv/coordenadas.csv", function(c) {
	      return {
	        nomeMun: c.NMMUNIC,
	        cdmun: +c.CODIBGE,
	        lat: +c.Latitude,
	        lon: +c.Longitude
	      }; },
	      function(error, c) {
	        if (error)
	          return console.error(error);
	      // Plota pontos das sedes municipais no mapa
	        svg.selectAll("circle")
	          .data(c)
	          .enter()
	          .append("circle")
	          .attr("cx", function(d) {
	          return projecao([d.lon, d.lat])[0];
	        }).attr("cy", function(d) {
	          return projecao([d.lon, d.lat])[1];
	        }).attr("r", "1.5px")
	        .attr("id", function(d) { return "C"+d.cdmun })
	        .attr("class", function(d) { return cl.classeRegiao[hashRegioes[d.cdmun]]; });
	        // Preenche o hash de coordenadas no formato longitude/latitude
	        hashCoordenadas = {};
	        for (i = 0; i < c.length; i++) {
	          hashCoordenadas[c[i].cdmun] = [c[i].lon, c[i].lat];
	        }
	        cl.dsv("./csv/NomeDPs.csv",  function(dados) {
	          return {
	            AISP: +dados.AISP,
	            DP: +dados.DP,
	            UP: dados.UP
	          }; }, function(dados) {
	          cl.nomeDP = {};
	          var i;
	          for (i = 0; i < dados.length; i++)
	            cl.nomeDP[dados[i].DP] = { up: dados[i].UP, aisp: dados[i].AISP };
	        });
          var mvG = d3.select(".mvG");
          botaoISP(mvG, 255, 565, "RISP", cl_textoRISP, TODASRISPS, "spRect1", cl.todasRISPS);
          botaoISP(mvG, 335, 565, "AISP", cl_textoAISP, TODASAISPS, "spRect2", cl.todasAISPS);
          botaoISP(mvG, 415, 565, "CISP", cl_textoCISP, TODASCIRPS, "spRect3", cl.todasDPS);
          //botaoISP(495, 565, "DADO", hist.legenda(), hist.legenda(), "spRect4", hist);           
	      }); 
	    });
	  function zoom() {
	    var c;
	    cl.escalaPrj = d3.event.scale;
	    //svg.attr("transform", "translate(" + [d3.event.translate[0]+cl.margin.left+cl.margin.right, d3.event.translate[1]+cl.margin.top+cl.margin.bottom] + ")scale(" + d3.event.scale + ")");
	    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	    svg.selectAll(".cisp").style("stroke-width", (0.4 / d3.event.scale) + "px");
	    c = "circle";
	    svg.selectAll(c).attr("r", 1.5 / d3.event.scale + "px");
	    
	  }
	  d3.select(".mapSVG").call(d3.behavior.zoom().scaleExtent([1,16]).size( [w + cl.margin.right + cl.margin.left, h + cl.margin.top + cl.margin.bottom]).on("zoom", zoom));
	}
	
	cl.titulo = function(leg){
	  // Apaga titulo anterior, se houver
	  svg.select("g.titulo1")
	/*    .transition()
	    .duration(750)
	    .delay(100)
	    .ease("cubic-in-out")
	    .attr("transform","translate(50,0)")
	    .attr("opacity", "0.7") */
	    .remove();
	  // Inclui novo titulo
	  svg.append("g")
	    .attr({class: "titulo1", transform: "translate(10,145)"})
	    .append("text").attr({class: "caption", y: 80}).text(leg);
	};
	
	cl.cor = [];
	cl.hashDados = {};
	var hashCoordenadas = {};
	var hashRegioes = {};
	var regiaoAtual = -1;
	
	cl.pintaMapa = function() {
	  var dados = [],
	  	  distribuicao = "linear",
	  	  tipo = "",
	  	  rangeData = [],
	  	  tit = "",
	  	  faixas = 0,
	  	  ano;

	  var i;
	  var min, max;
	  cl.hashDados = {};

	  function pintaMapa() {
	  	  var domEixo = [], rangEixo = [];

	  	  d3.select("g.legenda").remove();
	      cl.status = tipo;

		  for (j in dados) {
		  	cl.hashDados[j] = {};
		  	for (i = 0; i < dados[ano].length; i++) {
		    	cl.hashDados[j][dados[ano][i][0]] = dados[ano][i][1];
		  }
	/*	    if (min > dados[i][1])
		      min = dados[i][1];
		    else if (max < dados[i][1])
		      max = dados[i][1];
	 */
		  }
		  cl.atual = +j;
		  min = rangeData[0];
		  max = rangeData[1];
		  cl.titulo(tit);
		  var domainMap = [min, max];
		  switch(distribuicao) {
		    case 'sqrt':
		      // cl.cor é a cor selecionada em rangeMap de um valor no domínio domainMap
		      // cl.cor = d3.scale.sqrt().domain(domainMap).range(rangeMap);
		      min = min-min/5;
		      max = max+min/5;
		      var rg = max-min;
		      var fx = rg/(Math.pow(2,faixas)-1);
		      var k = 0;
		      for (i = 0; i <= faixas; i++) {
		        domEixo = domEixo.concat([min+k*fx]);
		        //rangEixo = rangEixo.concat([cl.cor(domEixo[i])]);
		        k = k + Math.pow(2, i);
		      }
		      var y = d3.scale.sqrt().domain([min,max]).range([0,450]);
		      break;
		    default:
		      //cl.cor = d3.scale.linear().domain(domainMap).range(rangeMap);
		      min = min-min/5;
		      max = max+min/5;
		      var k = max-min;
		      var fx = k/faixas;
		      for (i = 0; i<=faixas; i++) {
		        domEixo = domEixo.concat([(i*1e-6)+min+i*fx]);
		        //rangEixo = rangEixo.concat([cl.cor(domEixo[i])]);
		      }
		      var y = d3.scale.linear().domain([min,max]).range([0,450]);
	        break;
		  }
		  //cl.cor = d3.scale.threshold().domain(domEixo).range(rangEixo);
	    myRange = cl.colorbrewer.OrRd[faixas+1];
	    cl.cor = d3.scale.threshold().domain(domEixo).range(myRange);
		  var yAxis = d3.svg.axis().scale(y).tickValues(cl.cor.domain()).orient("left");
		  var g = d3.select(".mvG").append("g")
		    .attr("class", "legenda")
		    .attr("transform", "translate(900, 50)")  
		    .call(yAxis);
		  
		  g.selectAll("rect") // Monta legenda
		    .data(cl.cor.range().map(function(d, i) {
		    return {
		      y0: i ? y(cl.cor.domain()[i - 1]) : y.range()[0],
		      y1: i < cl.cor.domain().length ? y(cl.cor.domain()[i]) : y.range()[1],
		      z: d
		    };
		  }))
		    .enter().append("rect")
		    .attr("width", 10)
	      //.attr("x", 300)
		    .attr("y", function(d) { return d.y0; })
		    .attr("height", function(d) { return d.y1 - d.y0; })
	      .attr("class", "retMapa")
		    .style("fill", function(d) { return d.z; });
		  
	    cl_criaTipLegenda();

	    d3.select("path.domain").style("opacity", "1e-6");

		  d3.selectAll("path.cisp") // Pinta municípios
	    /*
		    .transition()
		    .duration(1000)
		    .delay(100)
		    .ease("cubic-in-out")
	     */
		    .style("fill", function(d) {
		      if (tipo == "cisp")
		        return cl.cor(cl.hashDados[cl.atual][d.properties.DP]);
		      return cl.cor(cl.hashDados[cl.atual][d.properties.AISP]);})
		    .text(function(d) {
		    if (typeof (cl.hashDados[cl.atual][d.properties.AISP]) === 'undefined')
		      return(cl.aisp("nome", d.properties.AISP));
		    else 
		      return(cl.aisp("nome", d.properties.AISP)
		           + ": " + cl.hashDados[cl.atual][d.properties.AISP].toLocaleString())});
		
		
		  //  cl.hashDados = {};
		}
// 	cl.pintaMapa = function(dados, distribuicao, tipo, rangeData, tit, faixas)
		pintaMapa.dados = function(valor) {
      		if(!arguments.length) return dados;
      			dados = valor;
      		return pintaMapa;
    	};

    	pintaMapa.distribuicao = function(valor) {
      		if(!arguments.length) return distribuicao;
      			distribuicao = valor;
      		return pintaMapa;
    	};

    	pintaMapa.tipo = function(valor) {
      		if(!arguments.length) return tipo;
      			tipo = valor;
      		return pintaMapa;
    	};

    	pintaMapa.rangeData = function(valor) {
      		if(!arguments.length) return rangeData;
      			rangeData = valor;
      		return pintaMapa;
    	};

    	pintaMapa.tit = function(valor) {
      		if(!arguments.length) return tit;
      			tit = valor;
      		return pintaMapa;
    	};

    	pintaMapa.faixas = function(valor) {
      		if(!arguments.length) return faixas;
      			faixas = valor;
      		return pintaMapa;
    	};

    	pintaMapa.ano = function(valor) {
      		if(!arguments.length) return ano;
      			ano = valor;
      		return pintaMapa;
    	};

    	return pintaMapa;
	};

  function inverso (vetor) {
    var vet=[];
    for (var i=vetor.length-1; i>=0; i--)
      vet.push([vetor[i]]);
    return vet;
  }

  function cl_criaTipLegenda(){
    //var g = d3.select(".legenda").selectAll("rect");
    var g = d3.select(".mvG").select(".legenda").selectAll("rect");
    var tip = d3.select("div.myTip");
    g.on("mouseover", function(d, i) {
        var k = "[";
        var corLegenda = this.style.fill;
        d3.select(".mvG").selectAll(".tick")
          .filter(function(dt, it) {
            if (it == (i-1))
              k+=this.textContent+", ";
            else if (it == i)
              k+=this.textContent+"]";
            return false;
          });
        tip.html(k);
        d3.selectAll(".cisp")
          .filter(function(dd){
            return this.style.fill == corLegenda;
          })
          .style("fill", cl.SELECIONADO);
        this.style.fill = cl.SELECIONADO;
        return tip.style("visibility", "visible");
      })
    .on("mousemove", function(){
      return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
        .style("left",(d3.event.pageX+25)+"px");})
    .on("mouseout", function(d){
        this.style.fill = d.z;
        d3.selectAll(".cisp")
          .filter(function(dd){
              return this.style.fill == cl.SELECIONADO;
            })
          .style("fill", d.z);
        return tip.style("visibility", "hidden");
      });
  }
	
	function recolheCapitais(regiao)
	{
	  // Recolhe as capitais de todas as regiões menos a atual
	  d3.selectAll("circle").filter(function (d,i) { return hashRegioes[d.cdmun]!=regiao;})
	//  d3.selectAll("circle."+cl.classeRegiao[regiao-1])
	    .transition()
	    .duration(500)
	    .ease("cubic-in-out")
	    .attr("r", (1.5 / cl.escalaPrj) + "px")
	    .attr("cx", function(dd) { return projecao(hashCoordenadas[dd.cdmun])[0];})
	    .attr("cy", function(dd) { return projecao(hashCoordenadas[dd.cdmun])[1];})
	  d3.select("svg").select("g.mvG").select("g.infoMun").remove();
	  
	}
	function enviaCapitais(regiao, titulo)
	{
	  // Distribui os pontos menos o da região atual
	  d3.selectAll("circle").filter(function (d,i) { return hashRegioes[d.cdmun]!=regiao;})
	//  d3.selectAll("circle."+cl.classeRegiao[regiao-1])
	    .transition()
	    .duration(500)
	    .ease("cubic-in-out")
	    .attr({r:"7", cx: "20", cy: "20"});
	//Escreve o título
	  d3.select("svg").select("g.mvG").append("g")
	    .attr({class: "infoMun", transform: "translate(35,5)"})
	    .append("text")
	    .attr({class: "titulo1", y:"24"})
	    .transition()
	    .delay(500)
	    .text(titulo?titulo:cl.nomeRegiao[regiao]);
	}
	/*
	// Pinta uma Região
	cl.selecionaRegiao = function(regiao)
	{
	  cl.status = "região";
	  d3.select("g.legenda").remove();
	  cl.regiaoSelecao = regiao;
	  cl.hashDados = {};
	  svg.selectAll("path")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d) {
	      if (cl.nid("regiao", d.properties.cdmun) == regiao-1)
	        return cl.hashDados[d.properties.cdmun] = cl.corRegioes[regiao-1];
	      else
	        return cl.hashDados[d.properties.cdmun] = "steelblue";
	      });
	
	  d3.selectAll(".bar")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d){
	      if (cl.nid("regiao", +d[0]) == regiao-1)
	        if (cl.status == "mapa")
	          return cl.cor(d[1]);
	        else
	          return cl.corRegioes[regiao-1];
	      else
	        return cl.semInfo;
	    });
	
	  if (regiaoAtual != regiao) { // Se mudou de região
	    if (regiaoAtual != -1) { // Recolhe os pontos da região anterior
	      //recolheCapitais(regiaoAtual);
	    }
	    //enviaCapitais(regiao-1);
	    regiaoAtual = regiao-1;
	  }    
	}
	//Pinta todas Regiões
	cl.todasRegioes = function(){
	
	  d3.select("g.legenda").remove();
	  cl.hashDados = {};
	  if (regiaoAtual != -1) {
	    //recolheCapitais(regiaoAtual);
	    regiaoAtual = -1;
	  }
	  svg.selectAll("path")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d) {
	    return cl.hashDados[d.properties.cdmun] = cl.corRegioes[cl.nid("regiao", d.properties.cdmun)];
	  });
	    /*
	  d3.selectAll(".bar")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d){
	      for (var i = 0; i<cl.aisps.length; i++)
	        if (d[0] == cl.aisps[i])
	          return cl.corAisps[i];
	    });
	*//*
	  cl.status = "região";
	};
	*/
	cl.todasAISPS = function(){
	  cl.status = "aisps";
	  d3.select("g.legenda").remove();
	  cl.hashDados[cl.atual] = {};
    apagaRange();
	  
    d3.selectAll("path.cisp")
        .transition()
        .duration(1000)
        .delay(100)
        .ease("cubic-in-out")
        .style("fill", function(d) {
          return cl.corAISP(d.properties.AISP);
        });

	  d3.selectAll(".bar")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d){
        if (hist.tipo() == "aisp")
          return cl.corAISP(d[0]);
        return cl.corAISP(cl.nomeDP[d[0]].aisp);
	    });
	};
	
	cl.corRISP = function(risp){
	  return cl.colorbrewer.RdYlBu[8][risp-1];
	};
	
	cl.todasRISPS = function(){
	  cl.status = "risps";
	  d3.select("g.legenda").remove();
    cl.hashDados[cl.atual] = {};
	  apagaRange();

	  d3.selectAll("path.cisp")
	      .transition()
	      .duration(1000)
	      .delay(100)
	      .ease("cubic-in-out")
	      .style("fill", function(d) {
	        return cl.corRISP(cl.aisp("risp", d.properties.AISP));
	      });
	
	  d3.selectAll(".bar")
	    .transition()
	    .duration(1000)
	    .delay(100)
	    .ease("cubic-in-out")
	    .style("fill", function(d){
        if (hist.tipo() == "aisp")
	        return cl.corRISP(cl.aisp("risp", d[0]));
        return cl.corRISP(cl.aisp("risp", cl.nomeDP[d[0]].aisp));
	    });
	};

  cl.todasDPS = function(){
    cl.status = "cisps";
    d3.select("g.legenda").remove();
    cl.hashDados[cl.atual] = {};
    apagaRange();

    d3.selectAll("path.cisp")
        .transition()
        .duration(1000)
        .delay(100)
        .ease("cubic-in-out")
        .style("fill", function(d) {
          return cl.cores[d.properties.DP];
        });
    if (hist.tipo() == "cisp")
      d3.selectAll(".bar")
        .transition()
        .duration(1000)
        .delay(100)
        .ease("cubic-in-out")
        .style("fill", function(d){
          return cl.cores[d[0]];
        });
  };
	// Obsoleta
	function apagaClasseRegiao()
	{ 
	  svg.selectAll("path").classed("metropolitana costaverde medioparaiba centro-sul serrana baixadaslitoraneas nortefluminense noroestefluminense", false);
	}
	// Obsoleta
	function ativaClasseRegiao(regIndex)
	{
	  svg.selectAll("path").classed(cl.classeRegiao[regIndex-1],
	                                function(d) { return d.properties.cdrgigov==regIndex; });
	}
	// Obsoleta
	function ativaClasseTodasRegioes()
	{
	  svg.selectAll("path")
	    .attr("class", function(d) {return "municipio "+cl.classeRegiao[d.properties.cdrgigov-1]});
	}
	
	// Cria o maptip, formato html (pode ser interessante incluir a bandeira do município ou outros
	// elementos gráficos de pequeno impacto visual no tooltip)
	function criaTooltip()
	{
	  cl.tooltip = d3.select("body")
	    .append("div")
	
	  //   .style("vertical-align", "middle")
	    .classed("myTip", true)
	    .html("Rio de Janeiro");
	}
	// Cria os hooks para o maptip
	function hookTooltip()
	{
	  var svg = d3.selectAll("path.cisp")
	
	  .on("mouseover", function(d){
	    var tip = d3.select("div.myTip");
	    var k, barra, corBarra;
	
	    k = "RISP "+cl.aisp("risp", d.properties.AISP)+"<br>"+cl.aisp("nome", d.properties.AISP);
	     if (cl.status == "aisp" && cl.hashDados[cl.atual][d.properties.AISP] != undefined) 
	        k += ": "+cl.hashDados[cl.atual][d.properties.AISP].toLocaleString();
      //k+="<br>"+cl.dp(d.properties.DP);
      if (cl.status == "cisp" && cl.hashDados[cl.atual][d.properties.DP] != undefined)
        k += "<br>"+cl.dp(d.properties.DP)+": "+cl.hashDados[cl.atual][d.properties.DP].toLocaleString()+"<br>"+cl.nomeDP[d.properties.DP].up;
      else
      	k+="<br>"+cl.dp(d.properties.DP)+": "+cl.nomeDP[d.properties.DP].up;

	    tip.html(k);
      
      d3.select(".legenda").selectAll("rect").style("fill", function(f) {
          if (cl.cor(cl.hashDados[cl.atual][cl.status=="aisp"?d.properties.AISP:d.properties.DP]) == f.z)
            return cl.SELECIONADO;
          else
            return false;
        });
      
      d3.selectAll(".cisp")
        .filter(function(dd){
          switch (cl.status) {
            case "aisps":
            case "aisp": return d.properties.AISP==dd.properties.AISP;
            case "risps": return cl.aisp("risp", d.properties.AISP)==cl.aisp("risp", dd.properties.AISP);
            case "cisps":
            case "cisp": return d.properties.DP==dd.properties.DP;
          }
        })
        .style("fill", cl.SELECIONADO);
      d3.selectAll(".bar")
        .filter(function(dd){
          switch (cl.status) {
            case "aisps": return hist.tipo()=="aisp"?d.properties.AISP==dd[0]:d.properties.AISP==cl.nomeDP[dd[0]].aisp;
            case "risps": return hist.tipo()=="aisp"?cl.aisp("risp", d.properties.AISP)==cl.aisp("risp", dd[0]):cl.aisp("risp", d.properties.AISP)==cl.aisp("risp", cl.nomeDP[dd[0]].aisp);
            case "cisps": return hist.tipo()=="aisp"?false:d.properties.DP==dd[0];
            case "aisp": return d.properties.AISP==dd[0];
            case "cisp": return d.properties.DP==dd[0];
          }
        })
        .style("fill", hs.SELECIONADO);

	    return cl.tooltip.style("visibility", "visible");})
	
	  .on("mousemove", function(){
	    return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
	      .style("left",(d3.event.pageX+25)+"px");})
	
	  .on("mouseout", function(d){

      d3.select(".legenda").selectAll("rect").style("fill", function(f) {
        if (cl.cor(cl.hashDados[cl.atual][cl.status=="aisp"?d.properties.AISP:d.properties.DP]) == f.z)
          return f.z;
        else
          return false;
      });
      d3.selectAll(".cisp")
        .filter(function(dd){ return this.style.fill == cl.SELECIONADO})
        .style("fill", function(dd){
          switch(cl.status) {
            case "aisps": return cl.corAISP(d.properties.AISP);
            case "risps": return cl.corRISP(cl.aisp("risp", d.properties.AISP));
            case "cisps": return cl.cores[d.properties.DP];
            case "aisp": return cl.cor(cl.hashDados[cl.atual][d.properties.AISP]);
            case "cisp": return cl.cor(cl.hashDados[cl.atual][d.properties.DP]);
          }
      });
      d3.selectAll(".bar")
        .filter(function(dd){
            return this.style.fill == hs.SELECIONADO})
        .style("fill", function(dd){
          switch(cl.status) {
            case "aisps": return cl.corAISP(d.properties.AISP);
            case "risps": return cl.corRISP(cl.aisp("risp", d.properties.AISP));
            case "cisps": return cl.cores[d.properties.DP];
            case "aisp":
            case "cisp": return cl.cor(dd[1]);
          }
        });
	    return cl.tooltip.style("visibility", "hidden");});
    /*
    Só deve funcionar se a seleção for apenas do path, como criado o mapa.
    Verificar mais tarde para incluir a funcionalidade de mostrar uma região de um maptile (Leaflet, por exemplo), baseado em um clique em uma
    região.
    .on("click", function(dd,i) {
      console.log(cl_projecao.invert(d3.mouse(this)));
    });
    */
	}
	
	if (typeof define === "function" && define.amd) this.cl = cl, define(cl); else if (typeof module === "object" && module.exports) module.exports = cl; else this.cl = cl;
}();
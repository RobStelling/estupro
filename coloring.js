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

  var mes = [["Jan", "Jan"], ["Fev", "Feb"], ["Mar", "Mar"], ["Abr", "Apr"], ["Mai", "May"], ["Jun", "Jun"],
  			 ["Jul", "Jul"], ["Ago", "Aug"], ["Set", "Sep"], ["Out", "Oct"], ["Nov", "Nov"], ["Dez", "Dec"]];
	
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
    Oranges:{3:["#fee6ce","#fdae6b","#e6550d"],
		4:["#feedde","#fdbe85","#fd8d3c","#d94701"],
		5:["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],
		6:["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],
		7:["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
		8:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],
		9:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]
	},
    Reds:{3:["#fee0d2","#fc9272","#de2d26"],
		4:["#fee5d9","#fcae91","#fb6a4a","#cb181d"],
		5:["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],
		6:["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],
		7:["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
		8:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
		9:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]
	},
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
    Paired:{3:["#a6cee3","#1f78b4","#b2df8a"],
		4:["#a6cee3","#1f78b4","#b2df8a","#33a02c"],
		5:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"],
    	12:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]},
    Dark2:{8:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]},
    RdBu:{3:["#ef8a62","#f7f7f7","#67a9cf"],
		4:["#ca0020","#f4a582","#92c5de","#0571b0"],
		5:["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"],
		6:["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"],
		7:["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"],
		8:["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
		9:["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"],
		10:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],
		11:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
	},
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
	    d3.geo.conicEqualArea().center([-0.38,-21.71]).rotate([42.50, 0])
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
	        /*
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
	        */
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
	    .attr({class: "titulo1", transform: "translate(70,220)"})
	    .append("text").attr({class: "caption", y: 80}).text(leg);
	};
	
	cl.cor = [];
	cl.hashDados = {};
	var hashCoordenadas = {};
	var hashRegioes = {};
	
	cl.pintaMapa = function() {
	  var INICIOX = 4, TAMANHOX = 120,
	  	  dados = [],
	  	  distribuicao = "linear",
	  	  tipo = "",
	  	  rangeData = [],
	  	  tit = "",
	  	  faixas = 0,
	  	  ano,
	  	  sparkline = {},
	  	  referencia = undefined,
	  	  totais = {};

	  var i;
	  var min, max;

	  var dadosLinha = [];
	  for (i = 0; i < 36; i++)
	  	dadosLinha.push([i,Math.random()*72]);


	  //d3.select("svg").append("path").attrd(d)
	  //d3.select("svg").append("path").datum(dadosLinha).attr("class", "linha").attr("d", linha);
	  

	  function pintaMapa() {
	  	  var domEixo = [], dominioSparkline = [];
	  	  var x = d3.scale.linear().domain([0,48]).range([INICIOX, 4*TAMANHOX+INICIOX]),
	  	  y = d3.scale.linear().domain([0,600]).range([265, 110]),
	  	  c,
	  	  linha = d3.svg.line().x(function(d,i){return x(d[0]);}).y(function(d,i){return y(d[1])});


	  	  d3.select("g.legenda").remove();
	  	  d3.selectAll(".ano").remove();
	  	  d3.select("div#selecionaClasse").style("display", "block");
	  	  d3.selectAll(".linha").remove();
	  	  d3.selectAll(".rectInvisivel").remove();
	  	  dominioSparkline[1] = d3.max(sparkline.dados, function(d){return d[1];});
	  	  dominioSparkline[0] = d3.min(sparkline.dados, function(d){return d[1];});
	  	  if (referencia) {
	  	  	dominioSparkline[0] = 0;
	  	  	referencia.sort(function(a, b) {
	  	  		return b.indice - a.indice;
	  	  	});
	  	  	//console.log(referencia);
	  	  	for (i=0;i<referencia.length;i++)
	  	  		if(referencia[i].indice > dominioSparkline[1])
					dominioSparkline[1] = referencia[i].indice;
	  	  }
	  	  y.domain(dominioSparkline);
	  	  c = d3.scale.linear().domain([0,dominioSparkline[1]]).range([80,255]);
		  d3.select(".mapSVG").append("path").datum(sparkline.dados).attr({"class":"linha grf", "d":linha}).style({"fill":"none", "stroke":"#666666"});
		  //console.log(sparkline.dados);
		  d3.select(".mapSVG").append("g").attr("class", "linha")
		  	.selectAll("circle")
		  	.data(sparkline.dados)
		  	.enter()
		  	.append("circle")
		  	.attr({"cx":function(d){return x(d[0])}, "cy":function(d){return y(d[1]);}, "r":function(d){return d[0]%12 == 0 ? 2:0;}, "class":"linha"})
		  	.style({"fill": "steelblue"});
		  
		  	/*
		  d3.select("svg").append("g").attr("class", "retangulo")
		  	.selectAll("rect")
		  	.data(sparkline.dados)
		  	.enter()
		  	.append("rect")
		  /*
	  	  for (i=0;i<4;i++)
	  	  	d3.select("svg")
	  	  		.datum(sparkline.dados[i*12][1])
	  	  		.append("circle")
	  	  		.attr({"cx":x(sparkline.dados[i*12][0]), "cy":y(sparkline.dados[i*12][1]), "r":2, "class":"linha"})
	  	  		.style({"fill": "steelblue", "stroke":"none"})
	  	  		.on("mouseover", function(d) {
    				cl.tooltip.html(sparkline.msg[lang]+": "+d.toFixed(2));
				    return cl.tooltip.style("visibility", "visible");
			      })
		    	.on("mousemove", function(d){
			      if (d != ano)
			      	return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
			        	.style("left",(d3.event.pageX+25)+"px");
			        return;
			    })
		    	.on("mouseout", function(d){
			    	if (d != ano)
			        	return cl.tooltip.style("visibility", "hidden");
			        return;
			      });
		    	*/
	  	  if (referencia) {
	  	  	for (i=0;i<referencia.length;i++)
	  	  		referencia[i].cor =  "#" +
	  	  							Math.trunc(c(referencia[i].indice)).toString(16) + 						// R c(indice) em base 16
	  	  							"50" +																	// G 80 (50 em base 16)
	  	  							("0" + Math.trunc(255-c(referencia[i].indice)).toString(16)).slice(-2);	// B 255-c(indice) em base 16
	  	  	d3.select(".mapSVG").append("g").attr("class", "linha grf line")
	  	  		.selectAll("line")
	  	  		.data(referencia)
	  	  		.enter()
	  	  		.append("line")
	  	  		.attr({ "x1":x(0),
	  	  				"x2":x(47),
	  	  				"y1":function(d){return y(d.indice);},
	  	  				"y2":function(d){return y(d.indice);}})
	  	  		.style({"fill":"none",
	  	  				"stroke-width":1,
	  	  				"opacity":0.3,
	  	  				"stroke":"#AAAAAA"});
	  	  	d3.select(".mapSVG").append("g").attr("class", "linha grf text")
	  	  		.selectAll("text")
	  	  		.data(referencia)
	  	  		.enter()
	  	  		.append("text")
	  	  		.attr({ "x":x(47.5),
	  	  				"y":function(d){return y(d.indice)+3;},
	  	  				"class": "linha grf"})
	  	  		.style({"font-size":"9px",
	  	  				"stroke":"none",
	  	  				"fill": function(d){return d.cor;}})
	  	  		.text(function(d){return d.pais[lang]})
		  	  	.on("mouseover", function(d) {
		  	  		d3.selectAll("g.line")
		  	  			.selectAll("line")
		  	  			.filter(function(linha){
		  	  				return linha.pais == d.pais;})
		  	  			.style({"stroke":function(linha){return linha.cor;},
		  	  				    "opacity":1});
    				cl.tooltip.html(["Taxa de estupros por 100.000 habitantes, "+d.pais[lang]+": "+d.indice.toLocaleString(),
    								 "Rape rate by 100,000 inhabitants, "+d.pais[lang]+": "+d.indice.toLocaleString(),][lang]);
				    return cl.tooltip.style("visibility", "visible");})
		    	.on("mousemove", function(d){
			      	return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
			        	.style("left",(d3.event.pageX+25)+"px");})
		    	.on("mouseout", function(d){
		    		d3.selectAll("g.line").selectAll("line").filter(function(linha) {
		  	  				return linha.pais == d.pais;})
		  	  			.style({"stroke":"#AAAAAA",
		  	  				    "opacity":0.3});
			        	return cl.tooltip.style("visibility", "hidden");});
	  	  }


	  	  i = 0;
	  	  for(j in dados) {
	  	  	d3.select("svg")
	  	  		.append("text")
	  	  		.attr("class", "ano c"+j)
	  	  		.attr({"x":INICIOX+i*TAMANHOX, "y":100})
	  	  		.text(j)
	  	  		.datum(j);
	  	  	d3.select(".c"+j)
	  	  		.on("click", function(d){
	  	  			if (d != ano) {
		  	  			rio.ano(d).call();
		  	  			hist.ano(d).call();
		  	  			d3.selectAll(".ano").style("fill", "gray");
		  	  			d3.select(".c"+d).style("fill", "steelblue");
		  	  			return cl.tooltip.style("visibility", "hidden");
	  	  			}
	  	  			return;
	  	  		})
    			.on("mouseover", function(d) {
    				if (d != ano) {
				        cl.tooltip.html(["Clique para ver os dados de "+d, "Click to see "+d+" data"][lang]);
				        return cl.tooltip.style("visibility", "visible");
			    	}
			    	return;
			      })
			    .on("mousemove", function(d){
			      if (d != ano)
			      	return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
			        	.style("left",(d3.event.pageX+25)+"px");
			        return;
			    })
			    .on("mouseout", function(d){
			    	if (d != ano)
			        	return cl.tooltip.style("visibility", "hidden");
			        return;
			      });
	  	  	i++;
	  	  }


	  	  dominioY = y.domain();
	  	  //console.log(ano, x.range(), x.domain(), y.range(), y.domain(), y(dominioY[1])-y(dominioY[0]));
	  	  /**/
	  	  if (d3.selectAll("rect.anos")[0].length == 0)
	  	  	d3.select("svg").append("rect")
		  	  	.attr({"class": "anos",
		  	  		   "x": x((ano-2013)*12),
		  	  		   "y": y(dominioY[1]),
		  	  		   "height":y(dominioY[0])-y(dominioY[1]),
		  	  		   "width":x(11)-x(0)})
		  	  	.style({"fill":"steelblue",
		  	  			"opacity":0.3});
	  	  else
	  	  	d3.select("rect.anos").transition().duration(1000)
	  	  		.attr("x", x((ano-2013)*12));

	  	  d3.select("svg").append("g").attr("class", "rectInvisivel")
		  	.selectAll("rect")
		  	.data(sparkline.dados)
		  	.enter()
		  	.append("rect")
		  	.attr({"class": "rectInvisivel",
		  	  	   "x": function(d){return x(d[0])-(x(1)-x(0))/2;},
		  	  	   "y": function(d){return y(dominioSparkline[1]);},
		  	  	   "height":y(dominioSparkline[0])-y(dominioSparkline[1]),
		  		   "width":x(1)-x(0)})
		  	.style({"fill":"white",
		  	  		"opacity":1e-6,
		  	  		"stroke":"none"})
  	  		.on("mouseover", function(d) {
  	  			digitos = Math.floor(d[1]) == d[1] ? 0 : 2;
				cl.tooltip.html(sparkline.msg[lang]+" "+mes[d[0]%12][lang]+"/"+(2013+Math.floor(d[0]/12))+": "+d[1].toFixed(digitos));
				datum = d3.select(this).data()[0];
				d3.selectAll("circle.linha").filter(function(dd){return datum == dd;})
					.transition().duration(200)
					.attr({"r":4}).style({"fill":"steelblue"});
			    return cl.tooltip.style("visibility", "visible");
		      })
	    	.on("mousemove", function(d){
		     	return cl.tooltip.style("top", (d3.event.pageY-20)+"px")
		        	.style("left",(d3.event.pageX+25)+"px");
		    })
	    	.on("mouseout", function(d){
	    		datum = d3.select(this).data()[0];
	    		d3.selectAll("circle.linha").filter(function(dd){return datum == dd;})
	    			.transition().duration(200)
	    			.attr({"r":function(dd){return dd[0]%12 == 0 ? 2 : 0}});
		        return cl.tooltip.style("visibility", "hidden");
		      });
		  /**/
	      cl.status = tipo;

		  d3.select(".c"+ano).style("fill", "steelblue");
		  min = rangeData[0];
		  max = rangeData[1];
		  cl.titulo(tit + " (" + totais[ano].toLocaleString() + ")" );
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
		        return cl.cor(cl.hashDados[ano][d.properties.DP]);
		      return cl.cor(cl.hashDados[ano][d.properties.AISP]);})
		    .text(function(d) {
		    if (typeof (cl.hashDados[ano][d.properties.AISP]) === 'undefined')
		      return(cl.aisp("nome", d.properties.AISP));
		    else 
		      return(cl.aisp("nome", d.properties.AISP)
		           + ": " + cl.hashDados[ano][d.properties.AISP].toLocaleString())});
		
		
		  //  cl.hashDados = {};
		}
// 	cl.pintaMapa = function(dados, distribuicao, tipo, rangeData, tit, faixas)
		pintaMapa.dados = function(valor) {
			var j;
      		if(!arguments.length) return dados;
      		dados = valor;
      		totais = {};
      		cl.hashDados = {};
		  	for (j in dados) {
		  		cl.hashDados[j] = {};
		  		totais[j] = 0;
		  		for (i = 0; i < dados[j].length; i++) {
		    		cl.hashDados[j][dados[j][i][0]] = dados[j][i][1];
		    		totais[j] += dados[j][i][1];
			  	}
		  	}
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
      		cl.atual = ano;
      		return pintaMapa;
    	};

    	pintaMapa.sparkline = function(valor) {
    		if (!arguments.length) return sparkline;
    		sparkline = valor;
    		return pintaMapa;
    	}

    	pintaMapa.referencia = function(valor) {
    		if (!arguments.length) return referencia;
    		referencia = valor;
    		//console.table(referencia);
    		return pintaMapa;
    	}

    	return pintaMapa;
	};


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
	
	cl.todasAISPS = function(){
	  cl.status = "aisps";
	  d3.select("g.legenda").remove();
	  //cl.hashDados[cl.atual] = {};
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
     //cl.hashDados[cl.atual] = {};
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
    //cl.hashDados[cl.atual] = {};
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
	    var k;
	
	    k = "RISP "+cl.aisp("risp", d.properties.AISP)+"<br>"+cl.aisp("nome", d.properties.AISP);
	     if (cl.status == "aisp" && cl.hashDados[cl.atual][d.properties.AISP] != undefined) 
	        k += ": "+cl.hashDados[cl.atual][d.properties.AISP].toLocaleString();
      //k+="<br>"+cl.dp(d.properties.DP);
      if (cl.status == "cisp" && cl.hashDados[cl.atual][d.properties.DP] != undefined)
        k += "<br>"+cl.dp(d.properties.DP)+": "+cl.hashDados[cl.atual][d.properties.DP].toLocaleString() + [" casos", " cases"][lang]+"<br>"+cl.nomeDP[d.properties.DP].up;
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
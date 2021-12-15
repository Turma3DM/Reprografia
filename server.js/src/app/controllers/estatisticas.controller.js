//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

//Constants
const status = require("../constants/status.constant");

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, centro_custos, curso, avaliacao_pedido, servico_pedido, servicoCapaAcabamento, servicoCopiaTamanho, feedback } = initModels(sequelize);

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

module.exports = {

    // Verificacoes: (startedDate, endDate) => {
    // Passar pra cá as chamadas no banco para 
    // serem utilizadas nas duas funções (estatisticasMensais e estatisticasQuatroMeses)
    // },

    // Estatisticas sobre as tabelas pedido e det_pedido por Mês. 
    // Aqui o usuário vai passar o Ano e o Mês que quer consultar.
    estatisticasMensais: async (req, res) => {
        const { ano, mes } = req.params;

        const endDate = new Date(`${ano}-${mes}-31 23:59:59`);
        const startedDate = new Date(`${ano}-${mes}-01 00:00:00`);

        try {
            // Pedido

            // Quantidade de pedidos solicitados no mes passado por parametro
            const pedidos = await pedido.sum('realizado_qtdade', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            // Soma custo total 
            const custo_total = await pedido.sum('custo_total', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            // Cursos - CT-DS, CT-MP, CST-MP e Pós-Graduação
            const num_curso = await curso.findAll();

            // Objeto que será preenchido com descricao e quantidade
            let cursoArray = [];

            // Percorrendo os quatro tipos de curso e trazendo os valores quando id_curso = 1, 2, 3 e 4
            for (let i = 1; i <= num_curso.length; i++) {

                const cursoDesc = await curso.findOne({
                    where: { id_curso: i }
                }, {
                    attributes: ["descricao"]
                });

                const cursoCount = await pedido.sum('realizado_qtdade', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        },
                    },
                    include: {
                        model: det_pedido,
                        as: 'det_pedidos',
                        where: {
                            id_curso: i
                        }
                    }
                });

                cursoArray[i] = {
                    descricao: cursoDesc.descricao,
                    qtdade_solicitada: cursoCount,
                };
            };
            // Lenght Centro_custos
            const num_centro_custos = await centro_custos.findAll();
            // Objeto que será preenchido
            let centro_custosArray = [];

            for (let i = 1; i <= num_centro_custos.length; i++) {

                const centro_custosDesc = await centro_custos.findOne({
                    where: { id_centro_custos: i }
                }, {
                    attributes: ["descricao"]
                });

                const centro_custosCount = await pedido.sum('realizado_qtdade', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        },
                    },
                    include: {
                        model: det_pedido,
                        as: 'det_pedidos',
                        where: {
                            id_centro_custos: i
                        }
                    }
                });

                centro_custosArray[i] = {
                    descricao: centro_custosDesc.descricao,
                    qtdade_solicitada: centro_custosCount,
                };
            };

            // Lenght de avaliações... vai do 0 ao 2... 0 = não avaliado, 1 = atendeu, 2 = não atendeu!
            const num_avaliacao_pedido = await avaliacao_pedido.findAll();
            // Objeto que será preenchido
            let avaliacao_pedidoObj = {};

            //Começa em 0 pois existe avaliação com id 0 (ainda não avaliado...)
            for (let i = 1; i < num_avaliacao_pedido.length; i++) {

                const avaliacao_pedidoDesc = await avaliacao_pedido.findOne({
                    where: { id_avaliacao_pedido: i }
                }, {
                    attributes: ["descricao"]
                });

                let avaliacao_pedidoCount = await feedback.count({
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        },
                        avaliacaoId: i
                    },
                });

                avaliacao_pedidoObj[i] = {
                    status: avaliacao_pedidoDesc.descricao,
                    qtdade_solicitada: avaliacao_pedidoCount,
                };
            };



            // Det Pedido 

            // Total de copias mensais
            const total_copias = await det_pedido.sum('num_copias', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            // Total de número de páginas solicitadas por mês
            const num_paginas = await det_pedido.sum('num_paginas', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            const folhas_impressas = (total_copias * num_paginas);

            // Servico_pedido

            // Lenght Servico CT
            const num_servicoCT = await servicoCopiaTamanho.findAll();
            // Objeto 
            let servicoCTArray = [];

            for (let i = 1; i <= num_servicoCT.length; i++) {

                const servicoCTDesc = await servicoCopiaTamanho.findOne({
                    where: { id_servico: i }
                }, {
                    attributes: ["descricao"]
                });

                const servicoCTCount = await pedido.sum('realizado_qtdade', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        },
                    },
                    include: {
                        model: servico_pedido,
                        as: 'servico_pedidos',
                        where: {
                            servicoCT: i
                        }
                    }
                });

                servicoCTArray[i] = {
                    descricao: servicoCTDesc.descricao,
                    qtdade_solicitada: servicoCTCount,
            };
            };

            // Lenght Servico CT
            const num_servicoCA = await servicoCapaAcabamento.findAll();
            // Objeto 
            let servicoCAArray = [];

            for (let i = 1; i <= num_servicoCA.length; i++) {

                const servicoCADesc = await servicoCapaAcabamento.findOne({
                    where: { id_servico: i }
                }, {
                    attributes: ["descricao"]
                });

                const servicoCACount = await pedido.sum('realizado_qtdade', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        },
                    },
                    include: {
                        model: servico_pedido,
                        as: 'servico_pedidos',
                        where: {
                            servicoCA: i
                        }
                    }
                });

                servicoCAArray[i] = {
                    descricao: servicoCADesc.descricao,
                    qtdade_solicitada: servicoCACount,
                };
            };

            return res.status(200).json({
                mes: meses[mes - 1],
                ano: ano,
                pedidos: pedidos,
                avaliacao_pedido: [avaliacao_pedidoObj],
                servicoCTArray,
                servicoCAArray,
                num_paginas: num_paginas,
                num_copias: total_copias,
                folhas_impressas: folhas_impressas,
                centro_custosArray,
                cursoArray,
                custo_total: custo_total
            });
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    //Estatisticas dos ultimos 3 meses + mês Atual.
    estatisticasQuatroMeses: async (req, res) => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = (dataAtual.getMonth() + 1);

        try {
            // Objeto que será preenchido
            let mesObj = {};

            // Fazendo o for percorrer 3 meses antes do nosso
            let i = mes - 3;

            for (i; i < mes + 1; i++) {

                // Passando valores dos meses para variável i caso o mês seja janeiro e 
                // nós quisermos retornar os valores dos meses 12, 11 e 10
                if (i === -2) {
                    i = 10;
                };
                if (i === -1) {
                    i = 11;
                };
                if (i === 0) {
                    i = 12;
                };

                let endDate = new Date(`${ano}-${i}-31 23:59:59`);
                let startedDate = new Date(`${ano}-${i}-01 00:00:00`);

                // Pedido

                // Quantidade de pedidos solicitados no mes passado por parametro
                const pedidos = await pedido.sum('realizado_qtdade', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },
                });

                // Soma custo total 
                const custo_total = await pedido.sum('custo_total', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },
                });

                // Cursos - CT-DS, CT-MP, CST-MP e Pós-Graduação
                const num_curso = await curso.findAll();

                // Objeto que será preenchido com descricao e quantidade
                let cursoObj = {};

                // Percorrendo os quatro tipos de curso e trazendo os valores quando id_curso = 1, 2, 3 e 4
                for (let i = 1; i <= num_curso.length; i++) {

                    const cursoDesc = await curso.findOne({
                        where: { id_curso: i }
                    }, {
                        attributes: ["descricao"]
                    });

                    const cursoCount = await pedido.sum('realizado_qtdade', {
                        where: {
                            createdAt: {
                                [Op.between]: [startedDate, endDate]
                            },
                        },
                        include: {
                            model: det_pedido,
                            as: 'det_pedidos',
                            where: {
                                id_curso: i
                            }
                        }
                    });

                    cursoObj[i] = {
                        descricao: cursoDesc.descricao,
                        qtdade_solicitada: cursoCount,
                    };
                };
                // Lenght Centro_custos
                const num_centro_custos = await centro_custos.findAll();
                // Objeto que será preenchido
                let centro_custosObj = {};

                for (let i = 1; i <= num_centro_custos.length; i++) {

                    const centro_custosDesc = await centro_custos.findOne({
                        where: { id_centro_custos: i }
                    }, {
                        attributes: ["descricao"]
                    });

                    const centro_custosCount = await pedido.sum('realizado_qtdade', {
                        where: {
                            createdAt: {
                                [Op.between]: [startedDate, endDate]
                            },
                        },
                        include: {
                            model: det_pedido,
                            as: 'det_pedidos',
                            where: {
                                id_centro_custos: i
                            }
                        }
                    });

                    centro_custosObj[i] = {
                        descricao: centro_custosDesc.descricao,
                        qtdade_solicitada: centro_custosCount,
                    };
                };

                // Lenght de avaliações... vai do 0 ao 2... 0 = não avaliado, 1 = atendeu, 2 = não atendeu!
                const num_avaliacao_pedido = await avaliacao_pedido.findAll();
                // Objeto que será preenchido
                let avaliacao_pedidoObj = {};

                //Começa em 0 pois existe avaliação com id 0 (ainda não avaliado...)
                for (let i = 0; i < num_avaliacao_pedido.length; i++) {

                    const avaliacao_pedidoDesc = await avaliacao_pedido.findOne({
                        where: { id_avaliacao_pedido: i }
                    }, {
                        attributes: ["descricao"]
                    });

                    let avaliacao_pedidoCount = await pedido.sum('avaliado_qtdade', {
                        where: {
                            createdAt: {
                                [Op.between]: [startedDate, endDate]
                            },
                            id_avaliacao_pedido: i
                        },
                    });

                    if (i === 0 || avaliacao_pedidoDesc.realizado_qtdade > (avaliacao_pedidoDesc.avaliado_qtdade + 1)) {
                        avaliacao_pedidoCount = await pedido.count({
                            where: {
                                createdAt: {
                                    [Op.between]: [startedDate, endDate]
                                },
                                id_avaliacao_pedido: i
                            },
                        }) * avaliacao_pedidoDesc.realizado_qtdade
                    };

                    avaliacao_pedidoObj[i] = {
                        status: avaliacao_pedidoDesc.descricao,
                        qtdade_solicitada: avaliacao_pedidoCount,
                    };
                };


                // Det Pedido 

                // Total de copias mensais
                const total_copias = await det_pedido.sum('num_copias', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },
                });

                // Total de número de páginas solicitadas por mês
                const num_paginas = await det_pedido.sum('num_paginas', {
                    where: {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },
                });

                const folhas_impressas = (total_copias * num_paginas);

                // Servico_pedido

                // Lenght Servico CT
                const num_servicoCT = await servicoCopiaTamanho.findAll();
                // Objeto 
                let servicoCTObj = {};

                for (let i = 1; i <= num_servicoCT.length; i++) {

                    const servicoCTDesc = await servicoCopiaTamanho.findOne({
                        where: { id_servico: i }
                    }, {
                        attributes: ["descricao"]
                    });

                    const servicoCTCount = await pedido.sum('realizado_qtdade', {
                        where: {
                            createdAt: {
                                [Op.between]: [startedDate, endDate]
                            },
                        },
                        include: {
                            model: servico_pedido,
                            as: 'servico_pedidos',
                            where: {
                                servicoCT: i
                            }
                        }
                    });

                    servicoCTObj[i] = {
                        status: servicoCTDesc.descricao,
                        qtdade_solicitada: servicoCTCount,
                    };
                };

                // Lenght Servico CT
                const num_servicoCA = await servicoCapaAcabamento.findAll();
                // Objeto 
                let servicoCAObj = {};

                for (let i = 1; i <= num_servicoCA.length; i++) {

                    const servicoCADesc = await servicoCapaAcabamento.findOne({
                        where: { id_servico: i }
                    }, {
                        attributes: ["descricao"]
                    });

                    const servicoCACount = await pedido.sum('realizado_qtdade', {
                        where: {
                            createdAt: {
                                [Op.between]: [startedDate, endDate]
                            },
                        },
                        include: {
                            model: servico_pedido,
                            as: 'servico_pedidos',
                            where: {
                                servicoCA: i
                            }
                        }
                    });

                    servicoCAObj[i] = {
                        status: servicoCADesc.descricao,
                        qtdade_solicitada: servicoCACount,
                    };
                };

                // Continuando o Looping para trazer os meses antes de janeiro (1) -> dezembro (12)...
                if (i === 10 && mes < 4) {
                    i = -2
                };
                if (i === 11 && mes < 4) {
                    i = -1
                };
                if (i === 12 && mes < 4) {
                    i = 0
                };

                mesObj[i] = {
                    ano: ano,
                    mes: meses[i - 1],
                    pedidos: pedidos,
                    avaliacao_pedido: [avaliacao_pedidoObj],
                    servico_copiaTamanho: [servicoCTObj],
                    servico_capaAcabamento: [servicoCAObj],
                    num_paginas: num_paginas,
                    num_copias: total_copias,
                    folhas_impressas: folhas_impressas,
                    centro_custos: [centro_custosObj],
                    curso: [cursoObj],
                    custo_total: custo_total
                };
            };
            return res.status(200).json([mesObj]);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },
};
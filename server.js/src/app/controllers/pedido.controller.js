//Services
const pedidoService = require("../services/pedido.service");
const detPedidoService = require("../services/detPedido.service");
const servicoService = require("../services/servico.service");

//Enviando descrição de constraints para o front-end/email
const verifyConstraints = require("../services/verifyConstraints");

//Envio de e-mail
const mailer = require("../../mailer/mailer.js");
const { mailerConfig } = require('../../config/');
const template = require("../templates/emails");

//Validators
const validators = require("../validators/pedido.validator");

//Constants
const constants = require("../constants/pedido.constant");
const status = require("../constants/status.constant");


module.exports = {

    ////ADMIN

    //GET 

    //Buscar todos os pedidos da tabela pedido
    buscarTodos: async (req, res) => {
        const { rated } = req.params;

        const ratedValid = await validators.isParameterValid(rated);

        if (!ratedValid) {
            return res.json({ status: status.error, message: constants.invalidParameter });
        };

        try {
            let pedidos = await pedidoService.findAllRated(ratedValid);

            if (pedidos.length < 1) {
                return res.json({ status: status.error, message: constants.notFoundArray });
            }

            //Verificando Constraints
            for (let i = 0; i < pedidos.length; i++) {
                const constraints = await verifyConstraints({
                    modo_envio: pedidos[i].dataValues.id_modo_envio,
                    avaliacao: pedidos[i].dataValues.id_avaliacao_pedido
                });

                pedidos[i].dataValues.id_avaliacao_pedido = constraints[1].descricao;
                pedidos[i].dataValues.id_modo_envio = constraints[4].descricao;

            }
            return res.status(200).json(pedidos);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    buscarPorNome: async (req, res) => {
        try {
            let pedidos = await pedidoService.findByName(req.params.pedido);

            if (pedidos.length < 1) {
                return res.json({ status: status.error, message: constants.notFoundArray });
            };

            //Verificando Constraints
            for (let i = 0; i < pedidos.length; i++) {
                const constraints = await verifyConstraints({
                    modo_envio: pedidos[i].dataValues.id_modo_envio,
                    avaliacao: pedidos[i].dataValues.id_avaliacao_pedido
                });

                pedidos[i].dataValues.id_avaliacao_pedido = constraints[1].descricao;
                pedidos[i].dataValues.id_modo_envio = constraints[4].descricao;

            }
            return res.status(200).json(pedidos);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res) => {
        try {
            let pedidos = await pedidoService.findByPk(req.params.id);

            if (pedidos === null) {
                return res.json({ status: status.error, message: constants.notFound });
            };

            const constraints = await verifyConstraints({
                modo_envio: pedidos.dataValues.id_modo_envio,
                avaliacao: pedidos.dataValues.id_avaliacao_pedido
            });

            pedidos.dataValues.id_avaliacao_pedido = constraints[1].descricao;
            pedidos.dataValues.id_modo_envio = constraints[4].descricao;

            return res.status(200).json(pedidos);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    //Todos os pedidos feito por tal pessoa (nif)
    buscarPorNif: async (req, res) => {
        const { rated } = req.params;

        const ratedValid = await validators.isParameterValid(rated);

        if (!ratedValid) {
            return res.json({ status: status.error, message: constants.invalidParameter });
        };

        try {
            let pedidos = await pedidoService.findAllRatedbyNif(req.params.nif, ratedValid);

            if (pedidos.length < 1) {
                return res.json({ status: status.error, message: constants.notFoundArray });
            }
            else {
                for (let i = 0; i < pedidos.length; i++) {
                    const constraints = await verifyConstraints({
                        modo_envio: pedidos[i].dataValues.id_modo_envio,
                        avaliacao: pedidos[i].dataValues.id_avaliacao_pedido
                    });

                    pedidos[i].dataValues.id_avaliacao_pedido = constraints[1].descricao;
                    pedidos[i].dataValues.id_modo_envio = constraints[4].descricao;

                }
                return res.status(200).json(pedidos);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },


    ////Usuário Comum 

    //GET

    //Todos os pedidos feito pelo usuário LOGADO!
    meusPedidos: async (req, res) => {
        const { rated } = req.params;

        const ratedValid = await validators.isParameterValid(rated);

        if (!ratedValid) {
            return res.json({ status: status.error, message: constants.invalidParameter });
        };

        try {
            let pedidos = await pedidoService.findAllRatedbyNif(req.user.nif, ratedValid);

            if (pedidos.length < 1) {
                return res.json({ status: status.error, message: constants.notFoundArray });
            }
            else {
                //Verificando Constraints 
                for (let i = 0; i < pedidos.length; i++) {
                    const constraints = await verifyConstraints({
                        modo_envio: pedidos[i].dataValues.id_modo_envio,
                        avaliacao: pedidos[i].dataValues.id_avaliacao_pedido
                    });

                    pedidos[i].dataValues.id_avaliacao_pedido = constraints[1].descricao;
                    pedidos[i].dataValues.id_modo_envio = constraints[4].descricao;

                }
                return res.status(200).json(pedidos);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    //POST


    //Adicionar pedido com detalhe solicitado por nif (usuario)
    adicionar: async (req, res) => {
        //Input que será enviado para tabela Pedido
        const { centro_custos, titulo_pedido, modo_envio, curso } = req.body;

        // Input que será enviado para tabela Det_Pedido
        const { num_copias, num_paginas, servicoCT, servicoCA, } = req.body;

        let { observacoes } = req.body;
        let nomeArquivo = "";
        let caminhoArquivo = "";

        if (!num_copias || !num_paginas || !titulo_pedido || !modo_envio
            || !curso || !centro_custos) {
            return res.json({
                status: status.error,
                message: "Solicitação faltando dados!"
            });
        }
        else if (num_copias < 1 || num_paginas < 1) {
            return res.json({
                status: status.error,
                message: "Total de folhas não pode ser 0!"
            });
        }

        const custo_total = [(num_copias * num_paginas) * req.sub_total];
        if (req.file) {
            nomeArquivo = req.file.filename;
            caminhoArquivo = req.file.path;
        }
        try {
            //Inserindo um pedido e seus detalhes/serviços:
            await pedidoService.pedidoCreate({
                param: {
                    titulo_pedido: titulo_pedido,
                    nif: req.user.nif,
                    id_modo_envio: modo_envio,
                    id_avaliacao_pedido: 0,
                    avaliacao_obs: null,
                    custo_total: custo_total,
                    det_pedidos: {
                        id_centro_custos: centro_custos,
                        id_curso: curso,
                        num_copias: num_copias,
                        num_paginas: num_paginas,
                        observacoes: observacoes,
                        anexo_name: nomeArquivo,
                        anexo_path: caminhoArquivo,
                        sub_total_copias: req.sub_total
                    },
                }

            }).then(pedido => {
                pedidoService.tableMidCreate({
                    param: {
                        pedidoId: pedido.id_pedido,
                        servicoCT: servicoCT,
                        servicoCA: servicoCA
                    }
                }).then(async servico => {
                    if (servico.servicoCT == 5 || servico.servicoCT == 6) {
                        await servicoService.serviceDecrement({
                            type: "ct",
                            number: [5, 6],
                            param: (num_copias * num_paginas)
                        });
                    }
                    else {
                        await servicoService.serviceDecrement({
                            type: "ct",
                            number: [servicoCT, servicoCT],
                            param: (num_copias * num_paginas)
                        });
                    }
                    await servicoService.serviceDecrement({
                        type: "ca",
                        number: [servicoCA, servicoCA],
                        param: (num_copias * num_paginas)
                    });

                    const constraints = await verifyConstraints({
                        centro_custos: centro_custos,
                        curso: curso,
                        modo_envio: modo_envio,
                        avaliacao: 0,
                        servicoCA: servicoCA,
                        servicoCT: servicoCT
                    });

                    if (observacoes) {
                        observacoes = `<strong>Observações:</strong> ${observacoes}`
                    }
                    else {
                        observacoes = "";
                    }

                    const output = template.pedidoEmail({
                        id: pedido.id_pedido,
                        titulo_pedido: titulo_pedido,
                        realizado_qtdade: pedido.realizado_qtdade,
                        nif: req.user.nif,
                        centro_custos: constraints[2].descricao,
                        curso: constraints[3].descricao,
                        servicoCA: constraints[5].descricao,
                        servicoCT: constraints[6].descricao,
                        modo_envio: constraints[4].descricao,
                        num_paginas: num_paginas,
                        num_copias: num_copias,
                        observacoes: observacoes
                    });
                    const email = mailerConfig.reproEmail;
                    const title = `Solicitação Nº${pedido.realizado_qtdade} da Reprografia Nº${pedido.id_pedido}`;
                    let attachments = [];


                    if (req.file) {
                        attachments = [
                            {
                                filename: req.file.filename,
                                path: req.file.path
                            }
                        ]
                        // // Exclui o Anexo que foi feito upload pelo multer para ser enviado pelo mailer 
                        // // depois de 25seg
                        // setTimeout(async () => {
                        //     await unlink(req.file.path, (err) => {
                        //         if (err) throw err;
                        //         console.log(`successfully deleted ${req.file.path}`);
                        //     });

                        // }, 25000);
                    }

                    else { attachments = null }

                    await mailer.sendEmails(email, title, output, {
                        attachments: attachments
                    });
                    return res.status(200).json({
                        status: status.ok,
                        message: "Pedido solicitado com sucesso!"
                    });
                });
            });
        }
        catch (err) {
            console.log(err)
        };
    },

    adicionarNovamente: async (req, res) => {
        try {
            let jaSolicitado = await detPedidoService.findByPk(req.params.id);

            if (jaSolicitado.id_avaliacao_pedido === 0) {
                res.json({ status: status.error, message: `Primeiro realize a avaliação Nº${jaSolicitado.realizado_qtdade} seu pedido!` })
            }
            else {
                let { titulo_pedido, id_modo_envio,
                    custo_total, realizado_qtdade } = jaSolicitado;

                const { id_centro_custos, id_curso, num_copias, num_paginas,
                    anexo_name, anexo_path, sub_total_copias } = jaSolicitado.det_pedidos[0];

                const { servicoCT, servicoCA } = jaSolicitado.servico_pedidos[0];

                let { observacoes } = jaSolicitado.det_pedidos[0];

                let realizado_qtdadeAtt = realizado_qtdade;

                const novoCusto_total = (num_copias / realizado_qtdade) * (num_paginas / realizado_qtdade) * parseFloat(req.sub_total);

                await pedidoService.updateRequest({
                    request: jaSolicitado,
                    param: {
                        realizado_qtdade: realizado_qtdade + 1,
                        custo_total: novoCusto_total + custo_total,
                        id_avaliacao_pedido: 0,
                    }
                }).then(async (pedido) => {
                    await detPedidoService.updateRequest({
                        request: pedido.id_pedido,
                        param: {
                            sub_total_copias: req.sub_total + sub_total_copias,
                            num_copias: num_copias + (num_copias / realizado_qtdadeAtt),
                            num_paginas: num_paginas + (num_paginas / realizado_qtdadeAtt)
                        }
                    })
                    if (servicoCT === 5 || servicoCT === 6) {
                        await servicoService.serviceDecrement({
                            type: "ct", number: [5, 6],
                            param: ((num_copias/realizado_qtdade) * (num_paginas/realizado_qtdade))
                        });
                    }
                    else {
                        await servicoService.serviceDecrement({
                            type: "ct",
                            number: [servicoCT, servicoCT],
                            param: ((num_copias/realizado_qtdade) * (num_paginas/realizado_qtdade))
                        });
                    }
                    await servicoService.serviceDecrement({
                        type: "ca",
                        number: [servicoCA, servicoCA],
                        param: ((num_copias/realizado_qtdade) * (num_paginas/realizado_qtdade))
                    });

                    const constraints = await verifyConstraints({
                        centro_custos: id_centro_custos,
                        curso: id_curso, modo_envio: id_modo_envio,
                        avaliacao: 0, servicoCA: servicoCA, servicoCT: servicoCT
                    });

                    if (observacoes) {
                        observacoes = `<strong>Observações:</strong> ${observacoes}`
                    }
                    else {
                        observacoes = "";
                    }

                    const output = template.pedidoEmail({
                        id: pedido.id_pedido,
                        titulo_pedido: titulo_pedido,
                        realizado_qtdade: pedido.realizado_qtdade,
                        nif: req.user.nif,
                        centro_custos: constraints[2].descricao,
                        curso: constraints[3].descricao,
                        servicoCA: constraints[5].descricao,
                        servicoCT: constraints[6].descricao,
                        modo_envio: constraints[4].descricao,
                        num_paginas: num_paginas,
                        num_copias: num_copias,
                        observacoes: observacoes
                    });

                    const email = mailerConfig.reproEmail;
                    const title = `Solicitação Nº${pedido.realizado_qtdade} da Reprografia Nº${pedido.id_pedido}`;
                    let attachments = [];

                    if (anexo_path) {
                        attachments = [
                            {
                                filename: anexo_name,
                                path: `http://localhost:3002/${anexo_path}`
                            }
                        ]
                    }
                    else { attachments = null }

                    await mailer.sendEmails(email, title, output, { attachments: attachments });
                    return res.status(200).json({
                        status: status.ok,
                        message: `Pedido ${jaSolicitado.id_pedido} solicitado novamente com sucesso!`
                    });
                });
            }
        } catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        }
    },

};
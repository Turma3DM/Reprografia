//Services
const pedidoService = require("../services/pedido.service");
const feedbackService = require("../services/feedback.service");

//Enviando descrição de constraints para o front-end/email
const verifyConstraints = require("../services/verifyConstraints");

//Envio de e-mail
const mailer = require("../../mailer/mailer.js");
const { mailerConfig } = require('../../config/');
const template = require("../templates/emails");

//Constants
const constants = require("../constants/pedido.constant");
const status = require("../constants/status.constant");

module.exports = {

    //GET

    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const feedback = await feedbackService.findByPk(id);
            if (feedback === null) {
                return res.json({ status: status.error, message: "Avaliação não encontrada" })
            }
            else {
                return res.status(200).json(feedback);
            }
        } catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        }
    },


    todosFeedbackPorIdPedido: async (req, res) => {
        const { id } = req.params;
        try {
            let feedbacks = await feedbackService.getFeedbackNif(id, req.user.nif);

            if (req.user.roles.includes('2_ROLE_ADMIN')) {
                feedbacks = await feedbackService.getFeedback(id);

            }

            if (feedbacks.length < 1) {
                return res.json({
                    status: status.error,
                    message: "Avaliações não encontradas!"
                })
            }
            else {
                return res.status(200).json(feedbacks);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };

    },

    //PUT

    alterarAvaliacao: async (req, res) => {
        const { id_avaliacao_pedido, avaliacao_obs } = req.body;

        if (!id_avaliacao_pedido) {
            return res.json({
                status: status.error,
                message: "Informe se o pedido lhe atendeu ou não, por favor!"
            });
        }

        try {
            const pedido = await pedidoService.findByPk(req.params.id);

            if (pedido === null) {
                return res.json({ status: status.error, message: constants.notFound });
            } else if (pedido.id_avaliacao_pedido !== 0) {
                return res.json({ status: status.error, message: constants.alreadyRated });
            } else if (req.user.nif === pedido.nif) {
                await pedidoService.updateRequest({
                    request: pedido,
                    param: {
                        id_avaliacao_pedido,
                        avaliado_qtdade: pedido.avaliado_qtdade + 1
                    }
                });
                await feedbackService.createFeedback({
                    param: {
                        userId: req.user.nif,
                        pedidoId: pedido.id_pedido,
                        avaliacaoId: id_avaliacao_pedido,
                        avaliacao_obs,
                    }
                });
                const constraints = await verifyConstraints({
                    avaliacao: id_avaliacao_pedido
                });
                const output = template.avaliacaoEmail({
                    id: pedido.id_pedido,
                    titulo_pedido:
                        pedido.titulo_pedido,
                    realizado_qtdade: pedido.realizado_qtdade,
                    nif: pedido.nif,
                    avaliacao_obs: avaliacao_obs,
                    avaliacao_pedido:
                        constraints[1].descricao
                });
                const email = mailerConfig.reproEmail;
                const title = `Avaliação Nº${pedido.realizado_qtdade} da Reprografia Nº${pedido.id_pedido}`;

                await mailer.sendEmails(email, title, output, { attachments: null });
                return res.status(200).json({
                    status: status.ok,
                    message: `Avaliação Nº${pedido.realizado_qtdade} do pedido ${req.params.id} atualizada com sucesso!`
                });
            }
            else {
                return res.json({
                    status: status.error,
                    message: "Você só pode alterar a avaliação de um pedido feito pelo seu usuário"
                });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

}


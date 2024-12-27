const { Router } = require('express');

// //REQUIRE GET
const getClientas = require("../controllers/GET/GetAllClients")
const getFotos = require("../controllers/GET/GetAllFotos")
const getTurnos = require("../controllers/GET/GetAllTurnos")
const getVisitas = require("../controllers/GET/GetAllVisitas")

// //REQUIRE GETID
const getClientaId = require("../controllers/GETID/GetClientId")
// const getProcedureId = require("../controllers/Get/Get_id/GetProcedureId")
// const getUserId = require("../controllers/Get/Get_id/GetUserId")
// const getOrderId = require("../controllers/Get/Get_id/GetOrderId")
// const getProductId = require("../controllers/Get/Get_id/GetProductId")
// const getCart = require("../controllers/Get/Get_id/GetCartId")

// //REQUIRE PATCH
const patchClienta = require("../controllers/PATCH/PatchClientId")
// const patchCliente = require("../controllers/Patch/PatchCliente.js")
// const patchFuncionalidades = require("../controllers/Patch/PatchFuncionalidades.js")
// const putProcedure = require("../controllers/Put/PutProcedure")
// const putProducts = require("../controllers/Put/PutProducts")
// const putUsers = require("../controllers/Put/PutUsers")

// //REQUIRE POST
const postClienta = require("../controllers/POST/PostClienta")
// const postUser = require("../controllers/Post/PostUsuario.js")
// const postCustomizaciones = require("../controllers/Post/PostCustomizaciones.js")
// const postFuncionalidades = require("../controllers/Post/PostFuncionalidades.js")
// const postLanding = require("../controllers/Post/PostLanding.js")
// const login = require("../controllers/Post/PostLogin.js")
// const mensajes = require("../controllers/Post/PostMensajes.js")
// const postUsers = require("../controllers/Post/PostUsers")

// //REQUIRE DELETE
const deleteClienta = require("../controllers/DELETE/DeleteClientId")
// const deleteCliente = require("../controllers/Delete/DeleteCliente.js")
// const deleteUsuario = require("../controllers/Delete/DeleteUsuarios.js")
// const deleteFuncionalidad = require("../controllers/Delete/DeleteFuncionalidades.js")
// const deleteProducts = require("../controllers/Delete/DeleteProducts")
// const deleteUsers = require("../controllers/Delete/DeleteUsers")

const router = Router();

// //GET
router.use("/clientas", getClientas)
router.use("/fotos", getFotos)
router.use("/turnos", getTurnos)
router.use("/visitas", getVisitas)
// router.use("/carts", getAllCarts)

// //POST
router.use("/clienta", postClienta)
// router.use("/usuario", postUser)
// router.use("/customizaciones", postCustomizaciones)
// router.use("/funcionalidades", postFuncionalidades)
// router.use("/landing", postLanding)
// router.use("/login", login)
// router.use("/mensaje", mensajes)
 
// //PATCH
router.use("/clienta", patchClienta)
// router.use("/cliente", patchCliente)
// router.use("/funcionalidades", patchFuncionalidades)
// router.use("/orders", putOrders)
// router.use("/procedure", putProcedure)
// router.use("/cart", putCart)

// //DELETE
router.use("/clienta", deleteClienta)
// router.use("/cliente", deleteCliente)
// router.use("/usuario", deleteUsuario)
// router.use("/funcionalidad", deleteFuncionalidad)
// router.use("/procedure", deleteProcedure)
// router.use("/cart", deleteCart)

// //GETBYID
router.use("/clienta", getClientaId)
// router.use("/order",getOrderId)
// router.use("/product",getProductId)
// router.use("/procedure", getProcedureId)
// router.use("/cart", getCart)

module.exports = router;
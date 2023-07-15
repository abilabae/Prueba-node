const request = require("supertest");
const server = require("../index");

describe("operaciones CRUD cafes", ()=>{
    it("obteniendo un 200", async()=>{
        const response= await request(server).get("/cafes").send();
        const status =response.statusCode;
        expect(status).toBe(200)
    })

    it("obteniendo array", async()=>{
        const response=await request(server).get("/cafes").send()
        expect(response.body).toBeInstanceOf(Array);
    })

    it("eliminando cafe que no existe y devuelve 404", async()=>{
        const jwt="token"
        const response= await request(server).delete("/cafes/6").set("Authorization", jwt)
        const status= response.statusCode
        expect(status).toBe(404)
    })

    it("agregar un cafe y devuelve 201", async()=>{
        const nuevoCafe={"id": 5, "nombre":"Nuevo cafe"};
        const {statusCode}= await request(server).post("/cafes").send(nuevoCafe)
        expect(statusCode).toBe(201)
    })

    it("put/cafes devuelve 400 al ingresar id que no existe", async()=>{
        const cafeActualizar={id: 1, nombre:"Leche con chocolate"}
        const{statusCode}= await request(server).put("/cafes/2").send(cafeActualizar)
        expect(statusCode).toBe(400)
    })


})


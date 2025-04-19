# 🧮 Calculadora API – Microservicio Backend

Microservicio REST de calculadora avanzada con autenticación JWT y persistencia de operaciones. Desarrollado con Node.js, Express y MySQL.

---

## 🚀 Tecnologías

- Node.js 16+
- Express
- Sequelize + MySQL
- JWT + Bcrypt
- Docker + Docker Compose
- Swagger (OpenAPI 3.0)
- Jest + Supertest

---

## 🐳 Cómo ejecutar con Docker

```bash
docker-compose up --build
```

La API quedará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Endpoints

### Autenticación
- `POST /api/auth/register`
- `POST /api/auth/login`

### Operaciones
- `POST /api/calculate`

### Historial
- `GET /api/history`
- `GET /api/history/:id`
- `DELETE /api/history/:id`

---

## 🧾 Documentación Swagger

Disponible en:  
👉 `http://localhost:3000/api/docs`


---

## 📬 Colección Postman

Archivo: `Api-Calculadora.postman_collection.json` incluido con pruebas de:

- Registro / Login
- Operaciones
- Historial

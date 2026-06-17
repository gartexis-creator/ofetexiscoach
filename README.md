# Soberanía Relacional — Sitio web

Mentoring de Alta Claridad. Sitio construido con **Next.js + React** (frontend),
**Supabase** (backend) y desplegable en **Vercel**.

Es la versión funcional del prototipo original (que se conserva en
[`prototipo/soberania-relacional-web.html`](prototipo/soberania-relacional-web.html)),
convertida en una aplicación real con rutas propias, formularios conectados a una
base de datos y optimizada para escritorio y móvil.

---

## 🧩 Tecnologías

| Capa        | Tecnología            |
| ----------- | --------------------- |
| Frontend    | Next.js 14 (App Router) + React 18 |
| Estilos     | CSS propio (idéntico al prototipo) + fuentes Google vía `next/font` |
| Backend     | Supabase (PostgreSQL) |
| Repositorio | GitHub                |
| Despliegue  | Vercel                |

---

## 📁 Estructura

```
app/
  layout.js              → estructura global (nav, footer, fuentes)
  page.js                → Inicio
  servicios/page.js      → Programas & Servicios
  sobre-mi/page.js       → Sobre mí
  testimonios/page.js    → Testimonios
  contacto/page.js       → Contacto (formulario)
  blog/page.js           → Blog + newsletter
  globals.css            → todos los estilos
  components/            → Navbar, Footer, formularios, etc.
  api/
    contact/route.js     → guarda solicitudes en Supabase
    newsletter/route.js  → guarda suscriptores en Supabase
lib/supabaseServer.js    → cliente de Supabase (solo servidor)
supabase/schema.sql      → tablas a crear en Supabase
prototipo/               → HTML original de referencia
```

---

## 🚀 Cómo verlo en tu computadora (localhost)

> Necesitas **Node.js 18 o superior** instalado. Si usas Mac con Homebrew:
> `brew install node`

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Arranca el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre **http://localhost:3000** en tu navegador.

La web funciona aunque todavía no hayas configurado Supabase: el formulario y la
newsletter mostrarán el mensaje de éxito, pero los datos **no se guardarán**
hasta que conectes la base de datos (siguiente sección).

---

## 🗄️ Conectar Supabase (para guardar formularios)

1. Crea una cuenta gratis en <https://supabase.com> y un proyecto nuevo.
2. En el panel de Supabase entra a **SQL Editor → New query**, pega el contenido
   de [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run**. Esto crea las
   tablas `contactos` y `suscriptores`.
3. Ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public` key
   - `service_role` key (secreta)
4. En la raíz del proyecto crea un archivo llamado **`.env.local`** (puedes
   copiar `.env.local.example`) y rellénalo:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://TUPROYECTO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
   NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
   NEXT_PUBLIC_CONTACT_EMAIL=hola@soberaniarelacional.com
   ```

5. Reinicia `npm run dev`. Ahora los formularios guardan en Supabase.
   Puedes ver los registros en **Table Editor**.

> El archivo `.env.local` nunca se sube a GitHub (está en `.gitignore`).

---

## ☁️ Subir a GitHub y desplegar en Vercel

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Sitio Soberanía Relacional con Next.js + Supabase"
git branch -M main
git remote add origin https://github.com/gartexis-creator/ofetexiscoach.git
git push -u origin main
```

### 2. Desplegar en Vercel

1. Entra a <https://vercel.com> e inicia sesión con GitHub.
2. **Add New → Project** e importa el repo `ofetexiscoach`.
3. Vercel detecta Next.js automáticamente (no cambies nada).
4. En **Environment Variables**, añade las mismas variables del `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, y opcionalmente las de WhatsApp/email).
5. Pulsa **Deploy**. En un minuto tendrás tu web online. 🎉

Cada vez que hagas `git push`, Vercel vuelve a desplegar automáticamente.

---

## ✏️ Personalizar

- **Tu nombre y foto:** edita `app/sobre-mi/page.js` (busca «Tu Nombre») y la
  etiqueta «Tu nombre aquí».
- **WhatsApp / email:** cámbialos en `.env.local` (variables `NEXT_PUBLIC_*`).
- **Textos, programas, testimonios, blog:** están en sus archivos
  `app/.../page.js` correspondientes, fáciles de editar.
- **Colores:** todos los tonos están como variables al inicio de
  `app/globals.css` (`:root`).

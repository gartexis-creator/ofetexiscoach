# Guía del Panel de Administración — Soberanía Relacional

Esta guía te lleva, paso a paso, a dejar el panel funcionando. Son **4 pasos**
(unos 10 minutos). Solo hay que hacerlo una vez.

El panel vive en la dirección **`/admin`** (por ejemplo `tudominio.com/admin`).
Desde ahí puedes:

- 📩 Ver los **mensajes** que envían tus clientas por el formulario.
- ❤️ Ver los **suscriptores** del newsletter.
- ✍️ Escribir, editar y borrar **artículos del blog** (con imagen de portada).
- ⭐ Añadir y editar **testimonios**.
- ✦ Editar la información de tus **programas**.

Solo tú puedes entrar: **nadie puede registrarse por su cuenta**.

---

## Paso 1 — Crear las tablas en Supabase

1. Entra a tu proyecto: <https://supabase.com/dashboard/project/bizgyycqbwyczqcavmrp>
2. En el menú de la izquierda, abre **SQL Editor** → **New query**.
3. Abre el archivo **`supabase/schema.sql`** de este proyecto, copia **todo** su
   contenido y pégalo en el editor.
4. Pulsa **Run** (abajo a la derecha).

Esto crea todas las tablas, la seguridad y carga el contenido inicial (para que
la web se vea igual que ahora). Es seguro ejecutarlo más de una vez.

---

## Paso 2 — Copiar tus claves al archivo `.env.local`

1. En Supabase, ve a **Project Settings** (engranaje, abajo a la izquierda) →
   **API**.
2. Verás una sección **Project API keys**. Copia estas dos claves:
   - **`anon` `public`**
   - **`service_role` `secret`** (haz clic en "Reveal" para verla)
3. Abre el archivo **`.env.local`** de este proyecto (ya tiene la URL puesta) y
   pega cada clave donde corresponde:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://bizgyycqbwyczqcavmrp.supabase.co   ← ya está
   NEXT_PUBLIC_SUPABASE_ANON_KEY=pega-aquí-la-clave-anon
   SUPABASE_SERVICE_ROLE_KEY=pega-aquí-la-clave-service_role
   ```

> 🔒 La clave `service_role` es secreta. El archivo `.env.local` **no se sube a
> GitHub** (está protegido), así que no hay problema en guardarla ahí.

---

## Paso 3 — Crear tu usuario y bloquear el registro

Así te aseguras de que **solo tú** puedes entrar.

1. En Supabase: **Authentication** → **Users** → botón **Add user** →
   **Create new user**.
2. Pon tu **correo** y una **contraseña**. Marca "Auto Confirm User" si aparece.
   Pulsa **Create user**. (Ese correo y contraseña serán los del panel.)
3. Ahora bloquea los registros: **Authentication** → **Sign In / Providers** →
   **Email** → desactiva **"Allow new users to sign up"** y guarda.

A partir de aquí, si quisieras dar acceso a alguien más, lo harías tú desde este
mismo menú (Add user). Nadie puede registrarse solo.

---

## Paso 4 — Probarlo

1. En la terminal, dentro de la carpeta del proyecto, ejecuta:

   ```
   npm run dev
   ```

2. Abre <http://localhost:3000/admin> en el navegador.
3. Inicia sesión con el correo y la contraseña del Paso 3.
4. ¡Listo! Prueba a escribir un artículo en **Blog → Escribir artículo** y míralo
   aparecer en <http://localhost:3000/blog>.

---

## Publicar los cambios en internet (Vercel)

Cuando despliegues en Vercel, copia las **mismas 3 variables** del `.env.local`
en: tu proyecto de Vercel → **Settings → Environment Variables**. Después haz un
nuevo despliegue (Redeploy).

---

## Preguntas rápidas

**¿Con qué entro al panel?** Con el correo y la contraseña que creaste en el
Paso 3. (El "usuario" es tu correo.)

**Olvidé la contraseña.** En Supabase → Authentication → Users, busca tu usuario,
menú de los tres puntos → "Send password recovery" o "Reset password".

**Un artículo en "Borrador" no se ve en la web.** Correcto: solo se publican los
que tienen marcada la casilla **Publicado**. Igual con testimonios y programas.

**Las imágenes.** Al escribir un artículo puedes subir una portada (hasta 5 MB).
Se guardan en el almacenamiento de Supabase (bucket `imagenes`, que crea el
`schema.sql`). Si no subes imagen, se usa el emoji y el color que elijas.

**La web se ve con contenido aunque no haya base de datos.** Es a propósito: si
algo falla, la web muestra contenido de ejemplo en lugar de romperse.

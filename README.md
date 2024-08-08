# React-Ts-Firebase-Auth-Chat

Una aplicación de chat en tiempo real construida con React, TypeScript y Firebase para la autenticación y el almacenamiento de datos.

## Características

- Autenticación de usuarios (Email/Password.)
- Chat en tiempo real
- Soporte de emojis
- Diseño responsivo con Tailwind CSS
- Almacenamiento de archivos multimedia con Firebase Storage

## Tecnologías Utilizadas

### Frontend

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Tailwind CSS**: Framework de CSS utilitario para el diseño de la interfaz.
- **React Hooks**: Para gestionar el estado y el ciclo de vida de los componentes.
- **React Context**: Para el manejo del estado global de la aplicación.
- **React Router**: Para la navegación entre diferentes vistas o páginas.
- **Emoji Picker**: Para la selección de emojis en el chat.

### Backend y Servicios

- **Firebase Authentication**: Para la autenticación de usuarios mediante email/password, Google, Facebook, etc.
- **Firebase Firestore**: Base de datos NoSQL en tiempo real para almacenar mensajes y datos de usuarios.
- **Firebase Storage**: Para almacenar archivos como imágenes y otros archivos multimedia.
- **Reactfire**: Hooks para usar Firebase en aplicaciones React.


## Typescript

# non-null assertion operator

En TypeScript, el operador ! se llama "non-null assertion operator". Se utiliza para indicar al compilador que una expresión no es null ni undefined, incluso si el tipo de la expresión podría serlo. Esto es útil cuando el programador está seguro de que el valor no será null o undefined en tiempo de ejecución, pero el compilador no puede inferirlo.

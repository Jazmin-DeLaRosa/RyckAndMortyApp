# Rick and Morty Explorer App

Esta aplicación permite a los usuarios buscar y visualizar personajes de la serie **Rick and Morty** mediante una API pública. Los usuarios pueden ver detalles de cada personaje y añadir personajes a su lista de favoritos.

## Características

- **Navegación**: Incluye dos pantallas principales: listado de personajes y detalle del personaje, además de una pantalla adicional para la lista de favoritos.
- **Listado de Personajes**: Permite filtrar personajes por nombre y muestra un indicador de carga.
- **Detalle de Personaje**: Visualiza detalles de un personaje seleccionado y permite agregarlo a favoritos.
- **Lista de Favoritos**: Permite ver y eliminar personajes favoritos.
- **Estilos Diferenciados**: Usa `Platform.select` para aplicar estilos diferenciados para iOS y Android.
- **Manejo de Errores**: Muestra mensajes si la API falla o si no hay resultados.
- **Integración con API**: La aplicación consume la API pública de Rick and Morty.
  
## Instalación

### Requisitos previos
- **Node.js** y **npm** instalados en tu sistema.
- **React Native CLI** instalado:
  ```bash
  npm install -g react-native-cli
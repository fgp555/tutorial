# Asegúrate de estar en la rama principal
git checkout main

# Asegúrate de tener los últimos cambios
git pull origin main

# Realiza tus cambios y confírmalos
git add .
git commit -m "Mensaje de commit"

# Etiqueta la versión
git tag -a v1.0.0 -m "Versión 1.0.0"

# Sube los cambios y la etiqueta a GitHub
git push origin main --tags

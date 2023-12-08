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
git push origin v1.0.0
git push origin main --tags
git push --tags

# lista de etiquetas (tags) 
git tag
git show v1.0.0

# Elimina la etiqueta anterior (opcional):
git tag -d v1.0.0

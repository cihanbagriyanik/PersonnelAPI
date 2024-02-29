# PERSONNEL API

### ERD:

![ERD](./erdPersonnelAPI.png)

### Folder/File Structure:

```
    src/
        configs/
            dbConnection.js
        controllers/
            auth.controller.js
            department.controller.js
            personnel.controller.js
            token.controller.js
        helpers/
            passwordEncrypt.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            permissions.js
        models/
            department.model.js
            personnel.model.js
            token.model.js
        routes/
            auth.router.js
            department.router.js
            personnel.router.js
            token.router.js
    .env
    .gitignore
    index.js
    package.json
    readme.md
    swaggerAutogen.js
```
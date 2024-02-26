# DDD (Domain-driver Design)

## Domínio

- Domain Experts 
    - Conversa

- Linguagem ubíqua

- Usuário
    - Cliente
    - Fornecedor
    - Atendente
    - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso


#### INICIANDO A APLICAÇÃO ###

1 - npm init -y
2 - npm i typescript @types/node -D
3 - npx tsc --init
4 - tsconfig.json: 
"target": "es2020"
5 - pasta scr
6 - pasta domain
7 - pasta entities
8 - pasta use-cases
9 - criar entidades e use cases
10 - npm i vitest -D
11 - criar spec.ts
12 - npx vitest run
13 - package.json: 
"scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
}
14 - npm run test ou npm run test:watch
15 - npm i dayjs
16 - tsconfig.json
"baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    "paths": {
      "@/*": ["./src/*"]
    },
17 - npm i vite-tsconfig-paths -D
18 - npm i eslint @rocketseat/eslint-config -D
19 - package.json: 
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix"
  }
20 - npm i eslint-plugin-vitest-globals -D
21 - npm i @faker-js/faker -D
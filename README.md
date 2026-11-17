# Fine

Duas versões do app de controle financeiro **fin$nce**, desenvolvidas em paralelo.

| Pasta | Versão | Onde ficam os dados | Login |
|---|---|---|---|
| `pessoal/` | Uso pessoal do Carlos | Firebase (projeto `casoj-financas`), sincroniza entre aparelhos | Google |
| `comercial/` | Modelo de negócio (teste) | No aparelho de quem usa (navegador), sem servidor | Não tem |

## Publicação
Cada pasta é publicada por um projeto próprio no Cloudflare Pages, ligado a este repositório:
- projeto pessoal → diretório raiz `pessoal`
- projeto comercial → diretório raiz `comercial`

Ao enviar uma alteração para uma pasta, só o site daquela versão é atualizado.

## Regras
- Nunca enviar arquivos com dados pessoais (backups `.json`/`.xlsx`) para este repositório.
- Mudanças testadas na versão comercial só passam para a pessoal (ou o contrário) de forma deliberada.

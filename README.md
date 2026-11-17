# Fine

Duas versões do app de controle financeiro **Fine**, desenvolvidas em paralelo.

| Pasta | Versão | Endereço | Onde ficam os dados | Login |
|---|---|---|---|---|
| `pessoal/` | Uso pessoal do Carlos | https://fine-pessoal.pages.dev | Firebase (projeto `casoj-financas`), sincroniza entre aparelhos | Google |
| `comercial/` | Modelo de negócio (teste) | https://fine-8qy.pages.dev | No aparelho de quem usa (navegador), sem servidor | Não tem |

O `index.html` na raiz é a versão antiga, mantida só enquanto o endereço do GitHub Pages ainda é usado. Será removido quando o repositório ficar privado.

## Publicação
Cada pasta é publicada por um projeto próprio no Cloudflare Pages, ligado a este repositório (Root directory `pessoal` ou `comercial`). Cada envio para a branch `main` atualiza o site da pasta alterada em 1–2 minutos.

## Versões
- O que mudou em cada versão está no [CHANGELOG.md](CHANGELOG.md).
- Cada versão publicada tem uma tag (`pessoal-vX.Y` ou `comercial-vX.Y`). Para ver ou baixar uma versão antiga: aba **Tags** do repositório.
- Para voltar um arquivo a uma versão anterior: abra o arquivo › **History** › escolha a versão.

## Regras
- Nunca enviar dados pessoais (backups `.json`/`.xlsx`) para este repositório. O `.gitignore` bloqueia esses arquivos quando o envio é feito pelo git.
- Mudanças testadas na versão comercial só passam para a pessoal (ou o contrário) de forma deliberada.

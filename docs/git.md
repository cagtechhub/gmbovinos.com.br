# GM Bovinos — Git

- **Não** criar commit, push ou PR sem autorização explícita. Push em `main` dispara deploy de produção.
- Conventional Commits em pt-BR: `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`, `docs: ...`. O histórico antigo tem `wip:` — **não usar `wip` em `main`**.
- Branch (quando usada): `<tipo>/descricao-curta`.
- Antes de propor commit: `git status`, diff revisado, `yarn lint` + `yarn format:check`.
- Nunca versionar `.env*` (exceto `.env.example`), `gha_deploy*` nem `.ai`.

Skill: `.ai/skills/pr-prep/SKILL.md`. Padrão: `.ai/standards/general/git.md`.

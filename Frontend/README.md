> # Gonsa

## Setup

```bash
yarn install
yarn dev
```

---

## Guidelines

### Before create Pull Request

Run:

```
yarn lint
yarn format:fix
yarn build
```

### ENV

```bash
cp .env.example .env.local
```

- Add public variable to `.env.local` with prefix `NEXT_PUBLIC_`
- Add private variable to `next.config.mjs` (check comment for reference)
- https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

### Images

- All images are put in /public
- For icon, export SVG and put in /public/icons and import to public/icons/index.ts
- For others, export SVG and PNG, select which one has a smaller size (there are some cases that SVG is larger than PNG)
- For PNG, resize in https://tinypng.com/ once before adding to the project

### Styles

- PIXEL PERFECT
- Integrate with DaisyUI https://daisyui.com/
- Use Tailwind directly in the component, and use pre-defined class (avoid customizing value). For example: `h-[32px]` instead of `h-8`
- If there is a custom value which Tailwind does not define, use px would be fine. For example: `h-[60px]`
- In some cases, can consider to use CSS module
- Avoid creating global custom CSS classes

Note: we will discuss when adding any adjustment to `tailwind.config.ts`

### Scripts

- Optimize use internal/external script
- https://nextjs.org/docs/app/building-your-application/optimizing/scripts

### Directory structure

- Split code at the same level of a page (interfaces, components, module css)
- Shared components put in app/ui

---

## Troubleshooting

1. Git cola bypass the husky lint-staged check. Alternatively, run prettier / eslint manually or use another tool

# Trello Clone

An open source Trello Clone built with everything new in the [Next.js 14](https://github.com/vercel/next.js) ecosystem.

<img src="./docs/images/screenshot-1.png" alt="Screenshot">

<hr />

## Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)
- Framework: [React](https://react.dev/), [Next.js](https://nextjs.org/)
- Styles: [TailwindCSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- ORM: [Prisma](https://www.prisma.io/)
- Authentication: [NextAuth](https://next-auth.js.org/)
- Testing: [Cypress](https://www.cypress.io/)
- Validation: [zod](https://zod.dev/)
- Forms: [react-hook-form](https://react-hook-form.com/)
- WYSIWYG: [Tiptap](https://tiptap.dev/)
- Primitives: [RadixUI](https://www.radix-ui.com/)
- Icons: [Lucide](https://lucide.dev/icons/)
- DND: [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- Formatting: [Prettier](https://prettier.io/)
- Background Images: [Unsplash](https://unsplash.com/)
- Illustrations: [storyset](https://storyset.com/)

## Running Locally

```sh
# Clone the project:
git clone https://github.com/0l1v3rr/trello-clone.git
cd trello-clone

# Copy the .env.example file and rename it to .env
# Also, make the appropriate changes
cp .env.example .env

# Run the database with docker:
docker compose up -d

# Install the dependencies:
npm i
npm run prepare

# Reset the DB
npx prisma migrate reset

# Run the application
npm run dev

# Also, you can preview the app to see how it would work in production
npm run preview
```

After the successful installation, the app should start [here](http://localhost:3000). You can log in with the following credentials: username: **test**, password: **test**

## Contributing

**Contributions are more than welcome!** Please open an issue if you have any questions or suggestions. See the [contributing guide](./CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](./LICENSE).

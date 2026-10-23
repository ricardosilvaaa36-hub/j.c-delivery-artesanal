<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep product prices, variants, extras and image references centralized in `src/data/menu.ts` so cards, product selection and new cart items use the same catalog.
- Store downloaded product photos as Lovable asset pointers rather than hotlinking the source website so catalog images remain independent of the external host.

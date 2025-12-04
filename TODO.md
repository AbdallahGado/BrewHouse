# TODO: Fix Workspace Problems

- [x] Edit src/components/BlogSidebar.tsx: Replace `flex-shrink-0` with `shrink-0`
- [x] Edit src/app/rewards/page.tsx: Replace `bg-gradient-to-br` with `bg-linear-to-br` (points card)
- [x] Edit src/app/rewards/page.tsx: Replace `bg-gradient-to-r` with `bg-linear-to-r` (CTA section)
- [x] Edit src/components/Hero.tsx: Replace `bg-gradient-to-r` with `bg-linear-to-r` (title text)
- [x] Edit src/app/blog/[id]/page.tsx: Replace `bg-gradient-to-r` with `bg-linear-to-r` (blockquote styles)
- [x] Edit src/components/ui/command.tsx: Update className in CommandDialog and CommandGroup to use `**:[[cmdk-...]]` syntax instead of `[&_[cmdk-...]]` (already updated)
- [x] Update .gitignore: Add .next/, out/, and other build artifacts to prevent upload warnings
- [x] Fix lockfile: Run npm install to patch missing swc dependencies

# Medium size Social Platform

## TODO

- [x] Change auth modal to Auth page
- [x] Refactor api calls
- [ ] Add Emoji Mart, gif-picker-react

- [ ] Home page

  - [x] Show posts from all users - can be viewed by guest
  - [x] Show posts from following users
  - [ ] Post

- [ ] Search

  - [ ] Search users
  - [ ] Search posts
  - [ ] Search tags

- [ ] User page

  - [ ] Show user's posts / shared posts
  - [ ] Show user's replies / posts
  - [ ] Show user's media posts
  - [ ] Show user's liked posts

- [ ] Fix UI

  - [ ] Sign up page
  - [ ] Login page

- [ ] Modal

  - [ ] Action modal
  - [ ] User modal

- [ ] Kiểm tra useCurrentUser (nếu re-render nhiều có thể chuyển sang dùng zustand)

## Problems

- Authentication stuck in pages when session id timeout
  => might change react router from main.jsx to App.jsx

- React Query
  - Doesn't cause re-render when data changes
  - Still cache user data even after logout

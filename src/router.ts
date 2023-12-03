import { createRouter, createWebHashHistory } from 'vue-router';

// import.meta.glob('/src/pages/*.vue').forEach((path) => {
//   const name = path.match(/\.\/src\/pages(.*)\.vue$/)?.[1].toLowerCase();
//   if (name) {
//     routes.push({
//       path: name === '/index' ? '/' : name,
//       name: name.replace(/\//g, '-').replace(/-/g, '_'),
//       component: () => import(`${path}`),
//     });
//   }
// });

const routes = []

// // console.log(import.meta.glob('/src/pages/*.vue'));
const pages = import.meta.glob('/src/pages/*.vue',{
  eager: true,
  import: "default"
})

for (const path in pages) {
  const name = path.replace("/src/pages/","")
  routes.push({
    path: (name === 'index' ? '/' : "/" + name).replace(".vue",""),
    name: name.replace(".vue",""),
    component: pages[path]
  });
}

routes.push({
  path: "/",
  name: "index",
  component: () => import("./pages/shot_record.vue"), 
})

console.log(routes);


const router = createRouter({
  routes,
  // : [
  //   {
  //     path: '/',
  //     name: 'shot_record',
  //     component: import("./pages/shot_record.vue")
  //   }
  // ],
  history: createWebHashHistory(),
});

// 如果 404 导航到 shot_record


export default router;